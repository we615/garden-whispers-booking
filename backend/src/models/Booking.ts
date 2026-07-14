import { Schema, model } from "mongoose";

export const BOOKING_STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"] as const;

const bookingSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    serviceRequested: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    plantCount: { type: Number },
    preferredTimeSlot: { type: String, required: true },
    status: { type: String, enum: BOOKING_STATUSES, default: "new", index: true },
    source: { type: String, enum: ["website", "admin"], default: "website" },
    whatsappSent: { type: Boolean, default: true },
    notes: { type: String, default: "" },
    linkedOrderId: { type: Schema.Types.ObjectId, ref: "Order", default: null },
  },
  { timestamps: true }
);
bookingSchema.index({ createdAt: -1 });

export const BookingModel = model("Booking", bookingSchema);
