import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    iconName: { type: String, required: true },
    category: { type: String, enum: ["core", "addon"], required: true, index: true },
    featured: { type: Boolean, default: false },
    imageFit: { type: String, enum: ["cover", "contain"], default: "cover" },
  },
  { timestamps: true }
);
serviceSchema.plugin(orderedContentPlugin);

export const ServiceModel = model("Service", serviceSchema);
