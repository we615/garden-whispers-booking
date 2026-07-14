import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const whyUsReasonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
  },
  { timestamps: true }
);
whyUsReasonSchema.plugin(orderedContentPlugin);

export const WhyUsReasonModel = model("WhyUsReason", whyUsReasonSchema);
