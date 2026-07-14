import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Mounted at /api/v1/webhooks — no auth (Razorpay calls this directly), verified via HMAC
// signature instead. Must receive the raw request body, so app.ts mounts this router's
// express.raw() middleware ahead of the global express.json() parser.
const router = Router();

router.post("/razorpay", asyncHandler(orderController.razorpayWebhook));

export default router;
