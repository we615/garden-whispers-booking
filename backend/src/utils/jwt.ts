import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type Role = "admin" | "customer";

export interface JwtPayload {
  sub: string;
  role: Role;
}

export function signToken(payload: JwtPayload, role: Role): string {
  const expiresIn = role === "admin" ? env.JWT_ADMIN_EXPIRES_IN : env.JWT_CUSTOMER_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
