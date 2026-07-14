import { Schema, model } from "mongoose";

const mediaSchema = new Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    url: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    usageHint: { type: String, default: "" },
  },
  { timestamps: true }
);

export const MediaModel = model("Media", mediaSchema);
