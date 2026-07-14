import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
  },
  { timestamps: true }
);
clientSchema.plugin(orderedContentPlugin);

export const ClientModel = model("Client", clientSchema);
