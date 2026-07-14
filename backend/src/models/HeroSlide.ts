import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const heroSlideSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, default: "EcoBloom garden" },
  },
  { timestamps: true }
);
heroSlideSchema.plugin(orderedContentPlugin);

export const HeroSlideModel = model("HeroSlide", heroSlideSchema);
