import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import multer from "multer";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const uploadDir = path.resolve(env.UPLOAD_DIR);
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, "-").slice(0, 40);
    cb(null, `${crypto.randomUUID()}-${safeBase}${ext}`);
  },
});

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);
const VIDEO_TYPES = new Set(["video/mp4"]);

export const uploadImage = multer({
  storage,
  limits: { fileSize: env.MAX_IMAGE_UPLOAD_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!IMAGE_TYPES.has(file.mimetype)) return cb(new Error("Only JPEG, PNG, WEBP, or SVG images are allowed"));
    cb(null, true);
  },
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: env.MAX_VIDEO_UPLOAD_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!VIDEO_TYPES.has(file.mimetype)) return cb(new Error("Only MP4 videos are allowed"));
    cb(null, true);
  },
});

export const uploadsDir = uploadDir;

/** Multer reports both size-limit and fileFilter rejections as request-level errors, not
 * exceptions asyncHandler can catch — this normalizes them into a 400 via the shared error handler. */
export function singleUpload(uploader: multer.Multer, field: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    uploader.single(field)(req, res, (err: unknown) => {
      if (!err) return next();
      const message = err instanceof Error ? err.message : "Upload failed";
      next(ApiError.badRequest(message));
    });
  };
}
