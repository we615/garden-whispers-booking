import crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { OrderModel } from "../src/models/Order.js";
import { PricingPlanModel } from "../src/models/PricingPlan.js";
import { verifyPaymentSignature, verifyWebhookSignature } from "../src/services/razorpay.js";
import { authHeader, createUser } from "./helpers.js";

const app = createApp();
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

function signPayment(razorpayOrderId: string, razorpayPaymentId: string) {
  return crypto.createHmac("sha256", KEY_SECRET).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
}

function signWebhook(rawBody: string) {
  return crypto.createHmac("sha256", WEBHOOK_SECRET).update(rawBody).digest("hex");
}

describe("razorpay signature verification (pure functions, no network calls)", () => {
  it("accepts a correctly computed payment signature", () => {
    const signature = signPayment("order_abc", "pay_xyz");
    expect(
      verifyPaymentSignature({ razorpayOrderId: "order_abc", razorpayPaymentId: "pay_xyz", razorpaySignature: signature })
    ).toBe(true);
  });

  it("rejects a tampered payment signature", () => {
    expect(
      verifyPaymentSignature({ razorpayOrderId: "order_abc", razorpayPaymentId: "pay_xyz", razorpaySignature: "not-the-real-signature" })
    ).toBe(false);
  });

  it("rejects a payment signature computed for different order/payment ids", () => {
    const signature = signPayment("order_abc", "pay_xyz");
    expect(
      verifyPaymentSignature({ razorpayOrderId: "order_different", razorpayPaymentId: "pay_xyz", razorpaySignature: signature })
    ).toBe(false);
  });

  it("accepts a correctly computed webhook signature", () => {
    const body = JSON.stringify({ event: "payment.captured" });
    expect(verifyWebhookSignature(Buffer.from(body), signWebhook(body))).toBe(true);
  });

  it("rejects a missing webhook signature header", () => {
    expect(verifyWebhookSignature(Buffer.from("{}"), undefined)).toBe(false);
  });
});

describe("order routes", () => {
  it("requires customer/admin auth to create a Razorpay order", async () => {
    const res = await request(app).post("/api/v1/orders/razorpay").send({ pricingPlanId: "000000000000000000000000" });
    expect(res.status).toBe(401);
  });

  it("rejects order creation for a nonexistent pricing plan (fails before any Razorpay API call)", async () => {
    const { token } = await createUser({ role: "customer" });
    const res = await request(app)
      .post("/api/v1/orders/razorpay")
      .set(authHeader(token))
      .send({ pricingPlanId: "000000000000000000000000" });
    expect(res.status).toBe(400);
  });

  it("requires admin auth to list orders", async () => {
    const res = await request(app).get("/api/v1/orders");
    expect(res.status).toBe(401);
  });

  it("verifies a payment end-to-end against a manually-seeded order, without calling Razorpay's API", async () => {
    const { token, user } = await createUser({ role: "customer" });
    const plan = await PricingPlanModel.create({
      plantCount: 10,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 120000,
    });
    const order = await OrderModel.create({
      customerId: user._id,
      pricingPlanId: plan._id,
      amount: plan.totalPrice,
      razorpayOrderId: "order_test123",
      receiptNumber: "EB-TEST-1",
      status: "created",
    });

    const signature = signPayment("order_test123", "pay_test456");
    const res = await request(app)
      .post("/api/v1/orders/razorpay/verify")
      .set(authHeader(token))
      .send({ razorpay_order_id: "order_test123", razorpay_payment_id: "pay_test456", razorpay_signature: signature });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("paid");

    const refreshed = await OrderModel.findById(order._id);
    expect(refreshed?.status).toBe("paid");
    expect(refreshed?.razorpayPaymentId).toBe("pay_test456");
  });

  it("marks the order failed when the signature doesn't match", async () => {
    const { token, user } = await createUser({ role: "customer" });
    const plan = await PricingPlanModel.create({
      plantCount: 20,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 240000,
    });
    await OrderModel.create({
      customerId: user._id,
      pricingPlanId: plan._id,
      amount: plan.totalPrice,
      razorpayOrderId: "order_bad_sig",
      receiptNumber: "EB-TEST-2",
      status: "created",
    });

    const res = await request(app)
      .post("/api/v1/orders/razorpay/verify")
      .set(authHeader(token))
      .send({ razorpay_order_id: "order_bad_sig", razorpay_payment_id: "pay_whatever", razorpay_signature: "garbage" });

    expect(res.status).toBe(400);
    const refreshed = await OrderModel.findOne({ razorpayOrderId: "order_bad_sig" });
    expect(refreshed?.status).toBe("failed");
  });

  it("rejects verifying an order that belongs to a different customer", async () => {
    const { user: ownerUser } = await createUser({ role: "customer" });
    const { token: otherToken } = await createUser({ role: "customer" });
    const plan = await PricingPlanModel.create({
      plantCount: 30,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 360000,
    });
    await OrderModel.create({
      customerId: ownerUser._id,
      pricingPlanId: plan._id,
      amount: plan.totalPrice,
      razorpayOrderId: "order_not_yours",
      receiptNumber: "EB-TEST-3",
      status: "created",
    });

    const signature = signPayment("order_not_yours", "pay_x");
    const res = await request(app)
      .post("/api/v1/orders/razorpay/verify")
      .set(authHeader(otherToken))
      .send({ razorpay_order_id: "order_not_yours", razorpay_payment_id: "pay_x", razorpay_signature: signature });

    expect(res.status).toBe(403);
  });
});

describe("razorpay webhook", () => {
  it("rejects a webhook request with an invalid signature", async () => {
    const body = JSON.stringify({ event: "payment.captured", payload: {} });
    const res = await request(app)
      .post("/api/v1/webhooks/razorpay")
      .set("Content-Type", "application/json")
      .set("x-razorpay-signature", "not-valid")
      .send(body);
    expect(res.status).toBe(400);
  });

  it("reconciles an order to paid via a correctly signed payment.captured webhook", async () => {
    const { user } = await createUser({ role: "customer" });
    const plan = await PricingPlanModel.create({
      plantCount: 40,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 480000,
    });
    await OrderModel.create({
      customerId: user._id,
      pricingPlanId: plan._id,
      amount: plan.totalPrice,
      razorpayOrderId: "order_webhook_test",
      receiptNumber: "EB-TEST-4",
      status: "created",
    });

    const body = JSON.stringify({
      event: "payment.captured",
      payload: { payment: { entity: { id: "pay_webhook_1", order_id: "order_webhook_test" } } },
    });

    const res = await request(app)
      .post("/api/v1/webhooks/razorpay")
      .set("Content-Type", "application/json")
      .set("x-razorpay-signature", signWebhook(body))
      .send(body);

    expect(res.status).toBe(200);
    const refreshed = await OrderModel.findOne({ razorpayOrderId: "order_webhook_test" });
    expect(refreshed?.status).toBe("paid");
    expect(refreshed?.razorpayPaymentId).toBe("pay_webhook_1");
  });
});
