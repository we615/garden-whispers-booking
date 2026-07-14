import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  JWT_CUSTOMER_EXPIRES_IN: z.string().default("7d"),
  JWT_ADMIN_EXPIRES_IN: z.string().default("12h"),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  ADMIN_NAME: z.string().default("EcoBloom Admin"),
  CORS_ORIGINS: z.string().default("http://localhost:8080,http://localhost:8081"),
  UPLOAD_DIR: z.string().default("./uploads"),
  MAX_IMAGE_UPLOAD_MB: z.coerce.number().default(10),
  MAX_VIDEO_UPLOAD_MB: z.coerce.number().default(100),
  RAZORPAY_KEY_ID: z.string().default(""),
  RAZORPAY_KEY_SECRET: z.string().default(""),
  RAZORPAY_WEBHOOK_SECRET: z.string().default(""),
  RESEND_API_KEY: z.string().default(""),
  EMAIL_FROM: z.string().default("EcoBloom Plant Care <onboarding@resend.dev>"),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean),
};
