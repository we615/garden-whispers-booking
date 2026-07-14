import crypto from "node:crypto";
import type { Request, Response } from "express";
import { z } from "zod";
import { OrderModel, ORDER_STATUSES } from "../models/Order.js";
import { PricingPlanModel } from "../models/PricingPlan.js";
import { BookingModel } from "../models/Booking.js";
import { ApiError } from "../utils/ApiError.js";
import { getRazorpayClient, verifyPaymentSignature, verifyWebhookSignature } from "../services/razorpay.js";
import { env } from "../config/env.js";
import { sendEmail, getAdminNotificationEmail } from "../services/email.js";
import { paymentConfirmationCustomerEmail, paymentNotificationAdminEmail } from "../emails/templates.js";

/** Fire-and-forget payment emails — looks up the customer + plan fresh so this works whether
 * it's called from the customer-initiated verify flow or the server-to-server webhook. */
async function notifyPaymentSuccess(orderId: string) {
  const order = await OrderModel.findById(orderId).populate("pricingPlanId").populate("customerId");
  if (!order) return;
  const plan = order.pricingPlanId as unknown as { plantCount: number; durationLabel: string } | null;
  const customer = order.customerId as unknown as { name: string; email: string } | null;
  if (!plan || !customer) return;

  const emailData = {
    customerName: customer.name,
    customerEmail: customer.email,
    planLabel: `${plan.durationLabel} — up to ${plan.plantCount} plants`,
    amountRupees: Math.round(order.amount / 100),
    receiptNumber: order.receiptNumber,
  };

  const customerEmail = paymentConfirmationCustomerEmail(emailData);
  void sendEmail({ to: customer.email, subject: customerEmail.subject, html: customerEmail.html });

  const adminEmail = getAdminNotificationEmail();
  if (adminEmail) {
    const adminMsg = paymentNotificationAdminEmail(emailData);
    void sendEmail({ to: adminEmail, subject: adminMsg.subject, html: adminMsg.html });
  }
}

const createOrderSchema = z.object({
  pricingPlanId: z.string().min(1),
  bookingId: z.string().optional(),
});

export async function createRazorpayOrder(req: Request, res: Response) {
  const body = createOrderSchema.parse(req.body);

  const plan = await PricingPlanModel.findById(body.pricingPlanId);
  // isActive comes from the orderedContentPlugin, added to the schema at runtime via schema.add()
  // rather than the schema literal — Mongoose's type inference can't see it, so read via .get().
  if (!plan || !plan.get("isActive")) throw ApiError.badRequest("This pricing plan is no longer available");

  // Never trust a client-supplied amount — always re-read the current plan price server-side.
  const receiptNumber = `EB-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
  const razorpayOrder = await getRazorpayClient().orders.create({
    amount: plan.totalPrice,
    currency: "INR",
    receipt: receiptNumber,
    notes: { pricingPlanId: plan._id.toString(), customerId: req.user!.id },
  });

  const order = await OrderModel.create({
    customerId: req.user!.id,
    bookingId: body.bookingId ?? null,
    pricingPlanId: plan._id,
    amount: plan.totalPrice,
    currency: "INR",
    razorpayOrderId: razorpayOrder.id,
    status: "created",
    receiptNumber,
  });

  res.status(201).json({
    orderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: plan.totalPrice,
    currency: "INR",
    keyId: env.RAZORPAY_KEY_ID,
  });
}

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function verifyRazorpayPayment(req: Request, res: Response) {
  const body = verifyPaymentSchema.parse(req.body);

  const order = await OrderModel.findOne({ razorpayOrderId: body.razorpay_order_id });
  if (!order) throw ApiError.notFound("Order not found");
  if (order.customerId.toString() !== req.user!.id) throw ApiError.forbidden();

  const isValid = verifyPaymentSignature({
    razorpayOrderId: body.razorpay_order_id,
    razorpayPaymentId: body.razorpay_payment_id,
    razorpaySignature: body.razorpay_signature,
  });

  if (!isValid) {
    order.status = "failed";
    await order.save();
    throw ApiError.badRequest("Payment signature verification failed");
  }

  order.status = "paid";
  order.razorpayPaymentId = body.razorpay_payment_id;
  order.razorpaySignature = body.razorpay_signature;
  await order.save();

  if (order.bookingId) {
    await BookingModel.findByIdAndUpdate(order.bookingId, { status: "confirmed", linkedOrderId: order._id });
  }

  res.json(order);
  void notifyPaymentSuccess(order._id.toString());
}

export async function razorpayWebhook(req: Request, res: Response) {
  const signature = req.headers["x-razorpay-signature"] as string | undefined;
  const rawBody = req.body as Buffer;

  if (!verifyWebhookSignature(rawBody, signature)) {
    throw ApiError.badRequest("Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody.toString("utf8"));
  const event = payload.event as string;
  const paymentEntity = payload.payload?.payment?.entity;

  if ((event === "payment.captured" || event === "payment.failed") && paymentEntity?.order_id) {
    const order = await OrderModel.findOne({ razorpayOrderId: paymentEntity.order_id });
    // The `status !== "paid"` guard also prevents duplicate emails if the client-side verify
    // call already handled this order before the webhook arrived.
    if (order && order.status !== "paid") {
      order.status = event === "payment.captured" ? "paid" : "failed";
      order.razorpayPaymentId = paymentEntity.id;
      await order.save();
      if (event === "payment.captured") void notifyPaymentSuccess(order._id.toString());
    }
  }

  res.json({ received: true });
}

export async function listMyOrders(req: Request, res: Response) {
  const orders = await OrderModel.find({ customerId: req.user!.id })
    .populate("pricingPlanId")
    .sort({ createdAt: -1 });
  res.json(orders);
}

export async function listOrders(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (req.query.status && ORDER_STATUSES.includes(req.query.status as (typeof ORDER_STATUSES)[number])) {
    filter.status = req.query.status;
  }
  const orders = await OrderModel.find(filter)
    .populate("customerId", "name email phone")
    .populate("pricingPlanId")
    .sort({ createdAt: -1 });
  res.json(orders);
}

export async function getOrder(req: Request, res: Response) {
  const order = await OrderModel.findById(req.params.id).populate("customerId", "name email phone").populate("pricingPlanId");
  if (!order) throw ApiError.notFound();
  res.json(order);
}
