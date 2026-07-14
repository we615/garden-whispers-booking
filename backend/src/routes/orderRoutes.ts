import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Mounted at /api/v1/orders.
const router = Router();

router.post("/razorpay", requireAuth(["customer", "admin"]), asyncHandler(orderController.createRazorpayOrder));
router.post(
  "/razorpay/verify",
  requireAuth(["customer", "admin"]),
  asyncHandler(orderController.verifyRazorpayPayment)
);
router.get("/", requireAuth(["admin"]), asyncHandler(orderController.listOrders));
router.get("/:id", requireAuth(["admin"]), asyncHandler(orderController.getOrder));

export default router;
