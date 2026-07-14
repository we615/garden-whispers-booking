import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

export const AVATAR_COLORS = ["primary", "brand-red", "brand-blue"] as const;

const testimonialSchema = new Schema(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    relativeTime: { type: String },
    location: { type: String },
    avatarColor: { type: String, enum: AVATAR_COLORS, default: "primary" },
  },
  { timestamps: true }
);
testimonialSchema.plugin(orderedContentPlugin);

export const TestimonialModel = model("Testimonial", testimonialSchema);
