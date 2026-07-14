import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { authHeader, createUser } from "./helpers.js";

const app = createApp();

const validBooking = {
  serviceRequested: "🌿 Monthly Plant Care & Maintenance",
  name: "Jane Doe",
  phone: "9876543210",
  address: "123 Baner Road, Pune",
  plantCount: 12,
  preferredTimeSlot: "Morning (8 AM – 11 AM)",
};

describe("booking routes", () => {
  it("creates a guest booking with no auth token, customerId left null", async () => {
    const res = await request(app).post("/api/v1/bookings").send(validBooking);
    expect(res.status).toBe(201);
    expect(res.body.customerId).toBeNull();
    expect(res.body.status).toBe("new");
    expect(res.body.source).toBe("website");
  });

  it("attaches customerId when a valid customer token is present", async () => {
    const { token, user } = await createUser({ role: "customer" });
    const res = await request(app).post("/api/v1/bookings").set(authHeader(token)).send(validBooking);
    expect(res.status).toBe(201);
    expect(res.body.customerId).toBe(user._id.toString());
  });

  it("rejects a booking missing required fields", async () => {
    const res = await request(app).post("/api/v1/bookings").send({ name: "Jane" });
    expect(res.status).toBe(400);
  });

  it("does not reject the booking just because an invalid token was sent (optionalAuth degrades gracefully)", async () => {
    const res = await request(app)
      .post("/api/v1/bookings")
      .set("Authorization", "Bearer garbage-token")
      .send(validBooking);
    expect(res.status).toBe(201);
    expect(res.body.customerId).toBeNull();
  });

  it("requires admin auth to list bookings", async () => {
    const res = await request(app).get("/api/v1/bookings");
    expect(res.status).toBe(401);
  });

  it("lets an admin list, filter, and paginate bookings", async () => {
    const { token } = await createUser({ role: "admin" });
    await request(app).post("/api/v1/bookings").send(validBooking);
    await request(app).post("/api/v1/bookings").send(validBooking);

    const res = await request(app).get("/api/v1/bookings").set(authHeader(token));
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThanOrEqual(2);
    expect(res.body.items.length).toBeGreaterThanOrEqual(2);
  });

  it("lets an admin update booking status and notes", async () => {
    const { token } = await createUser({ role: "admin" });
    const created = await request(app).post("/api/v1/bookings").send(validBooking);

    const updated = await request(app)
      .patch(`/api/v1/bookings/${created.body._id}/status`)
      .set(authHeader(token))
      .send({ status: "contacted", notes: "Called, scheduled for Friday" });
    expect(updated.status).toBe(200);
    expect(updated.body.status).toBe("contacted");
    expect(updated.body.notes).toBe("Called, scheduled for Friday");
  });

  it("rejects an invalid status transition value", async () => {
    const { token } = await createUser({ role: "admin" });
    const created = await request(app).post("/api/v1/bookings").send(validBooking);
    const res = await request(app)
      .patch(`/api/v1/bookings/${created.body._id}/status`)
      .set(authHeader(token))
      .send({ status: "not-a-real-status" });
    expect(res.status).toBe(400);
  });

  it("returns only the logged-in customer's own bookings from /me/bookings", async () => {
    const { token: tokenA, user: userA } = await createUser({ role: "customer" });
    const { token: tokenB } = await createUser({ role: "customer" });

    await request(app).post("/api/v1/bookings").set(authHeader(tokenA)).send(validBooking);
    await request(app).post("/api/v1/bookings").set(authHeader(tokenB)).send(validBooking);

    const res = await request(app).get("/api/v1/me/bookings").set(authHeader(tokenA));
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].customerId).toBe(userA._id.toString());
  });
});
