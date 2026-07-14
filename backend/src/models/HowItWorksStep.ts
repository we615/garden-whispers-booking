import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const howItWorksStepSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
  },
  { timestamps: true }
);
howItWorksStepSchema.plugin(orderedContentPlugin);

export const HowItWorksStepModel = model("HowItWorksStep", howItWorksStepSchema);
