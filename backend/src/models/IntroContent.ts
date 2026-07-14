import { Schema, model } from "mongoose";
import { singletonPlugin } from "./plugins/singleton.js";

const introContentSchema = new Schema(
  {
    heading: { type: String, default: "Pune's Trusted Plant Care Experts" },
    body: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);
introContentSchema.plugin(singletonPlugin);

export const IntroContentModel = model("IntroContent", introContentSchema);
