import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";
import * as profileController from "../controllers/profileController.js";
import * as orderController from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Mounted at /api/v1/me — customer-scoped resources, requires a customer (or admin) JWT.
const router = Router();
router.use(requireAuth());

router.get("/bookings", asyncHandler(bookingController.listMyBookings));
router.patch("/profile", asyncHandler(profileController.updateProfile));
router.get("/orders", asyncHandler(orderController.listMyOrders));

export default router;
