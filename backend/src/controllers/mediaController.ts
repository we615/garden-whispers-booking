import fs from "node:fs";
import path from "node:path";
import type { Request, Response } from "express";
import { MediaModel } from "../models/Media.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadsDir } from "../middleware/upload.js";

export async function upload(req: Request, res: Response) {
  if (!req.file) throw ApiError.badRequest("No file uploaded (expected field 'file')");

  const media = await MediaModel.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    url: `/uploads/${req.file.filename}`,
    sizeBytes: req.file.size,
    uploadedBy: req.user!.id,
    usageHint: typeof req.body.usageHint === "string" ? req.body.usageHint : "",
  });

  res.status(201).json({ url: media.url, mediaId: media._id, media });
}

export async function list(_req: Request, res: Response) {
  const items = await MediaModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function remove(req: Request, res: Response) {
  const media = await MediaModel.findByIdAndDelete(req.params.id);
  if (!media) throw ApiError.notFound();

  const filePath = path.join(uploadsDir, media.filename);
  fs.unlink(filePath, () => {
    // best-effort — a missing file on disk shouldn't block the DB record deletion above
  });

  res.status(204).send();
}
