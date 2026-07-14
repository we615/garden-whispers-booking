import type { Request, Response } from "express";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { toPublicUser } from "./authController.js";

const addressSchema = z.object({
  label: z.string().optional(),
  addressLine: z.string().min(1),
  city: z.string().optional(),
  pincode: z.string().optional(),
  isDefault: z.boolean().optional(),
});

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(6).optional(),
  addresses: z.array(addressSchema).optional(),
});

export async function updateProfile(req: Request, res: Response) {
  const body = updateProfileSchema.parse(req.body);
  const user = await UserModel.findByIdAndUpdate(req.user!.id, body, { new: true, runValidators: true });
  if (!user) throw ApiError.notFound("User not found");
  res.json({ user: toPublicUser(user) });
}
