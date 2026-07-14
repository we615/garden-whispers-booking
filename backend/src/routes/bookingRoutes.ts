import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Mounted at /api/v1/bookings — POST is guest-accessible (optionalAuth), everything else is admin-only.
const router = Router();

router.post("/", optionalAuth, asyncHandler(bookingController.createBooking));
router.get("/", requireAuth(["admin"]), asyncHandler(bookingController.listBookings));
router.get("/:id", requireAuth(["admin"]), asyncHandler(bookingController.getBooking));
router.patch("/:id/status", requireAuth(["admin"]), asyncHandler(bookingController.updateBookingStatus));

export default router;
