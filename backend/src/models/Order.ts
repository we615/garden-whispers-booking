import { Schema, model } from "mongoose";

export const ORDER_STATUSES = ["created", "paid", "failed", "refunded"] as const;

const orderSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", default: null },
    pricingPlanId: { type: Schema.Types.ObjectId, ref: "PricingPlan", required: true },
    amount: { type: Number, required: true }, // paise, snapshot at creation time
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    status: { type: String, enum: ORDER_STATUSES, default: "created", index: true },
    receiptNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", orderSchema);
