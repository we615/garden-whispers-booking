import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, details: err.details });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ message: "Validation failed", details: err.flatten() });
    return;
  }

  if (err && typeof err === "object" && "name" in err && err.name === "ValidationError") {
    res.status(400).json({ message: (err as Error).message });
    return;
  }

  if (err && typeof err === "object" && "code" in err && err.code === 11000) {
    res.status(409).json({ message: "A record with these unique fields already exists" });
    return;
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
