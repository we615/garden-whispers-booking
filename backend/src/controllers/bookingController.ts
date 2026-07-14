import type { Request, Response } from "express";
import { z } from "zod";
import { BookingModel, BOOKING_STATUSES } from "../models/Booking.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail, getAdminNotificationEmail } from "../services/email.js";
import { bookingConfirmationCustomerEmail, bookingNotificationAdminEmail } from "../emails/templates.js";

const createBookingSchema = z.object({
  serviceRequested: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional(),
  address: z.string().min(1),
  plantCount: z.coerce.number().optional(),
  preferredTimeSlot: z.string().min(1),
});

/** Public/guest-friendly — customerId is attached only if optionalAuth found a valid token. */
export async function createBooking(req: Request, res: Response) {
  const body = createBookingSchema.parse(req.body);
  const booking = await BookingModel.create({
    ...body,
    customerId: req.user?.role === "customer" ? req.user.id : null,
    source: "website",
  });
  res.status(201).json(booking);

  // Fire-and-forget — a slow/failed email must never delay or fail the booking response.
  if (body.email) {
    const { subject, html } = bookingConfirmationCustomerEmail(body);
    void sendEmail({ to: body.email, subject, html });
  }
  const adminEmail = getAdminNotificationEmail();
  if (adminEmail) {
    const { subject, html } = bookingNotificationAdminEmail(body);
    void sendEmail({ to: adminEmail, subject, html });
  }
}

export async function listMyBookings(req: Request, res: Response) {
  const bookings = await BookingModel.find({ customerId: req.user!.id }).sort({ createdAt: -1 });
  res.json(bookings);
}

export async function listBookings(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (req.query.status && BOOKING_STATUSES.includes(req.query.status as (typeof BOOKING_STATUSES)[number])) {
    filter.status = req.query.status;
  }
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 25);

  const [items, total] = await Promise.all([
    BookingModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    BookingModel.countDocuments(filter),
  ]);

  res.json({ items, total, page, limit });
}

export async function getBooking(req: Request, res: Response) {
  const booking = await BookingModel.findById(req.params.id);
  if (!booking) throw ApiError.notFound();
  res.json(booking);
}

const updateStatusSchema = z.object({
  status: z.enum(BOOKING_STATUSES).optional(),
  notes: z.string().optional(),
});

export async function updateBookingStatus(req: Request, res: Response) {
  const body = updateStatusSchema.parse(req.body);
  const booking = await BookingModel.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
  if (!booking) throw ApiError.notFound();
  res.json(booking);
}
