import { Schema, model, type InferSchemaType } from "mongoose";

const addressSchema = new Schema(
  {
    label: { type: String, default: "Home" },
    addressLine: { type: String, required: true },
    city: { type: String, default: "Pune" },
    pincode: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer", index: true },
    addresses: { type: [addressSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema> & { _id: import("mongoose").Types.ObjectId };

export const UserModel = model("User", userSchema);
