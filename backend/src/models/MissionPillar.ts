import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const missionPillarSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
  },
  { timestamps: true }
);
missionPillarSchema.plugin(orderedContentPlugin);

export const MissionPillarModel = model("MissionPillar", missionPillarSchema);
