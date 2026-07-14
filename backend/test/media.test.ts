import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { authHeader, createUser } from "./helpers.js";

const app = createApp();

// Minimal valid 1x1 PNG
const PNG_BUFFER = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64"
);

describe("media routes", () => {
  it("rejects upload without admin auth", async () => {
    const res = await request(app).post("/api/v1/media/upload").attach("file", PNG_BUFFER, "test.png");
    expect(res.status).toBe(401);
  });

  it("uploads an image and returns a usable URL", async () => {
    const { token } = await createUser({ role: "admin" });
    const res = await request(app)
      .post("/api/v1/media/upload")
      .set(authHeader(token))
      .attach("file", PNG_BUFFER, "test.png");
    expect(res.status).toBe(201);
    expect(res.body.url).toMatch(/^\/uploads\/.+\.png$/);
  });

  it("rejects a non-image file on the image upload route", async () => {
    const { token } = await createUser({ role: "admin" });
    const res = await request(app)
      .post("/api/v1/media/upload")
      .set(authHeader(token))
      .attach("file", Buffer.from("not an image"), { filename: "evil.exe", contentType: "application/x-msdownload" });
    expect(res.status).toBe(400);
  });

  it("lists and deletes uploaded media", async () => {
    const { token } = await createUser({ role: "admin" });
    const uploadRes = await request(app)
      .post("/api/v1/media/upload")
      .set(authHeader(token))
      .attach("file", PNG_BUFFER, "test2.png");
    const mediaId = uploadRes.body.mediaId;

    const listRes = await request(app).get("/api/v1/media").set(authHeader(token));
    expect(listRes.body.some((m: { _id: string }) => m._id === mediaId)).toBe(true);

    const deleteRes = await request(app).delete(`/api/v1/media/${mediaId}`).set(authHeader(token));
    expect(deleteRes.status).toBe(204);
  });
});
