import type { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken, type Role } from "../utils/jwt.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: { id: string; role: Role; email: string; name: string };
    }
  }
}

async function loadUserFromHeader(req: Request) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;

  const token = header.slice("Bearer ".length);
  const payload = verifyToken(token);
  const user = await UserModel.findById(payload.sub);
  if (!user || !user.isActive) return null;

  return { id: user._id.toString(), role: user.role as Role, email: user.email, name: user.name };
}

/** Requires a valid JWT. If `roles` is given, 403s when the token's role isn't in the list. */
export function requireAuth(roles?: Role[]) {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    let user: Awaited<ReturnType<typeof loadUserFromHeader>>;
    try {
      user = await loadUserFromHeader(req);
    } catch {
      throw ApiError.unauthorized("Invalid or expired token");
    }
    if (!user) throw ApiError.unauthorized();
    if (roles && !roles.includes(user.role)) throw ApiError.forbidden();

    req.user = user;
    next();
  });
}

/** Attaches req.user if a valid token is present, but never rejects the request. */
export const optionalAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const user = await loadUserFromHeader(req);
    if (user) req.user = user;
  } catch {
    // ignore invalid/expired tokens on optional routes
  }
  next();
});
