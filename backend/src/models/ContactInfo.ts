import { Schema, model } from "mongoose";
import { singletonPlugin } from "./plugins/singleton.js";

const contactInfoSchema = new Schema(
  {
    whatsappNumbers: { type: [String], default: [] },
    phoneNumbers: { type: [String], default: [] },
    email: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);
contactInfoSchema.plugin(singletonPlugin);

export const ContactInfoModel = model("ContactInfo", contactInfoSchema);
