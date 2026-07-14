import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { createUser } from "./helpers.js";

const app = createApp();

describe("auth routes", () => {
  it("registers a new customer and returns a token", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Jane",
      email: "jane@example.com",
      phone: "9876543210",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.role).toBe("customer");
  });

  it("rejects registering a duplicate email", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Jane",
      email: "dupe@example.com",
      phone: "9876543210",
      password: "password123",
    });
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Jane 2",
      email: "dupe@example.com",
      phone: "9876543211",
      password: "password123",
    });
    expect(res.status).toBe(409);
  });

  it("logs in a customer with correct credentials", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Jane",
      email: "login@example.com",
      phone: "9876543210",
      password: "password123",
    });
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it("rejects login with wrong password", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Jane",
      email: "wrongpw@example.com",
      phone: "9876543210",
      password: "password123",
    });
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "wrongpw@example.com",
      password: "nope",
    });
    expect(res.status).toBe(401);
  });

  it("rejects a customer using the admin-login endpoint", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Jane",
      email: "notadmin@example.com",
      phone: "9876543210",
      password: "password123",
    });
    const res = await request(app).post("/api/v1/auth/admin-login").send({
      email: "notadmin@example.com",
      password: "password123",
    });
    expect(res.status).toBe(401);
  });

  it("logs in an admin via admin-login", async () => {
    const { user } = await createUser({ role: "admin", email: "admin@example.com" });
    const res = await request(app).post("/api/v1/auth/admin-login").send({
      email: user.email,
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe("admin");
  });

  it("returns the current user for GET /me with a valid token", async () => {
    const { token, user } = await createUser({ role: "customer" });
    const res = await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
  });

  it("returns 401 for GET /me without a token", async () => {
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
  });

  it("lets a logged-in customer update their own profile", async () => {
    const { token } = await createUser({ role: "customer" });
    const res = await request(app)
      .patch("/api/v1/me/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name", phone: "9000000000" });
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe("Updated Name");
    expect(res.body.user.phone).toBe("9000000000");
  });

  it("rejects profile updates without a token", async () => {
    const res = await request(app).patch("/api/v1/me/profile").send({ name: "x" });
    expect(res.status).toBe(401);
  });
});
