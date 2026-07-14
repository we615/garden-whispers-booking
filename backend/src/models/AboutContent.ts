import { Schema, model } from "mongoose";
import { singletonPlugin } from "./plugins/singleton.js";

const aboutValueSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
  },
  { _id: false }
);

const aboutContentSchema = new Schema(
  {
    heroHeading: { type: String, default: "We're EcoBloom Plant Care" },
    heroSubtext: { type: String, default: "" },
    storyParagraphs: { type: [String], default: [] },
    values: { type: [aboutValueSchema], default: [] },
    visionQuote: { type: String, default: "" },
    visionTagline: { type: String, default: "" },
    missionIntro: { type: String, default: "" },
  },
  { timestamps: true }
);
aboutContentSchema.plugin(singletonPlugin);

export const AboutContentModel = model("AboutContent", aboutContentSchema);
