import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const videoGalleryItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    category: { type: String, enum: ["home", "corporate"], required: true, index: true },
  },
  { timestamps: true }
);
videoGalleryItemSchema.plugin(orderedContentPlugin);

export const VideoGalleryItemModel = model("VideoGalleryItem", videoGalleryItemSchema);
