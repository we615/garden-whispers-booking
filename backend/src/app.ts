import path from "node:path";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { uploadsDir } from "./middleware/upload.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import meRoutes from "./routes/meRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import { adminContentRouter, publicContentRouter } from "./routes/contentRoutes.js";

export function createApp() {
  const app = express();

  // This API serves uploaded images/videos to separate frontend origins (marketing site + admin
  // panel) via plain <img>/<video> tags — helmet's default same-origin CORP header blocks that.
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin: env.corsOrigins,
      credentials: true,
    })
  );
  if (env.NODE_ENV !== "test") app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

  // Signature verification needs the raw, unparsed body — must be mounted before express.json().
  app.use("/api/v1/webhooks", express.raw({ type: "application/json" }), webhookRoutes);

  app.use(express.json({ limit: "2mb" }));
  app.use("/uploads", express.static(path.resolve(uploadsDir)));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/media", mediaRoutes);
  app.use("/api/v1/bookings", bookingRoutes);
  app.use("/api/v1/me", meRoutes);
  app.use("/api/v1/orders", orderRoutes);
  app.use("/api/v1/admin", adminContentRouter);
  app.use("/api/v1", publicContentRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
