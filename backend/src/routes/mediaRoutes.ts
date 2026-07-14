import { Router } from "express";
import * as mediaController from "../controllers/mediaController.js";
import { requireAuth } from "../middleware/auth.js";
import { singleUpload, uploadImage, uploadVideo } from "../middleware/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth(["admin"]));

router.get("/", asyncHandler(mediaController.list));
router.post("/upload", singleUpload(uploadImage, "file"), asyncHandler(mediaController.upload));
router.post("/upload-video", singleUpload(uploadVideo, "file"), asyncHandler(mediaController.upload));
router.delete("/:id", asyncHandler(mediaController.remove));

export default router;
