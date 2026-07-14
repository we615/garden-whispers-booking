import type { Request, Response } from "express";
import { z } from "zod";
import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { sendEmail } from "../services/email.js";
import { welcomeCustomerEmail } from "../emails/templates.js";

export function toPublicUser(user: InstanceType<typeof UserModel>) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    addresses: user.addresses,
  };
}

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  password: z.string().min(8),
});

export async function register(req: Request, res: Response) {
  const body = registerSchema.parse(req.body);
  const existing = await UserModel.findOne({ email: body.email.toLowerCase() });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  const passwordHash = await hashPassword(body.password);
  const user = await UserModel.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    passwordHash,
    role: "customer",
  });

  const token = signToken({ sub: user._id.toString(), role: "customer" }, "customer");
  res.status(201).json({ token, user: toPublicUser(user) });

  const { subject, html } = welcomeCustomerEmail(user.name);
  void sendEmail({ to: user.email, subject, html });
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const user = await UserModel.findOne({ email: body.email.toLowerCase(), role: "customer" });
  if (!user || !(await comparePassword(body.password, user.passwordHash))) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signToken({ sub: user._id.toString(), role: "customer" }, "customer");
  res.json({ token, user: toPublicUser(user) });
}

export async function adminLogin(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const user = await UserModel.findOne({ email: body.email.toLowerCase(), role: "admin" });
  if (!user || !(await comparePassword(body.password, user.passwordHash))) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signToken({ sub: user._id.toString(), role: "admin" }, "admin");
  res.json({ token, user: toPublicUser(user) });
}

export async function me(req: Request, res: Response) {
  const user = await UserModel.findById(req.user!.id);
  if (!user) throw ApiError.notFound("User not found");
  res.json({ user: toPublicUser(user) });
}
