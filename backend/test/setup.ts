import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, afterEach, beforeAll } from "vitest";
// Import every model up front so their indexes (e.g. User.email unique) exist before any
// test runs — models are otherwise only registered lazily when a test file imports them.
import "../src/models/index.js";

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret-at-least-16-chars";
// Placeholder to satisfy env.ts's eager validation at import time — the real test connection
// below uses the in-memory server's own URI directly via mongoose.connect(), not this value.
process.env.MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/ecobloom-test";
// Fake Razorpay credentials — tests only exercise the local HMAC signature math, never the
// real Razorpay API, so these just need to be present and consistent within a test run.
process.env.RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID ?? "rzp_test_fake_key_id";
process.env.RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "fake_razorpay_key_secret";
process.env.RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "fake_razorpay_webhook_secret";
// Force-disabled regardless of a real backend/.env on the machine running the suite — the
// email tests specifically assert the "not configured" no-op path, and no test should ever
// make a real Resend API call. `??` wouldn't be enough here since dotenv only fills in unset
// vars, and this needs to override whatever real value a local .env already has.
process.env.RESEND_API_KEY = "";

// One in-memory MongoDB instance for the whole test run (not one per file) — starting/stopping
// a real mongod binary per file was slow and raced on mongodb-memory-server's shared download
// lockfile. `isolate: false` in vitest.config.ts keeps all files in one worker so this
// module-level singleton is actually reused instead of re-imported fresh per file.
let mongod: MongoMemoryServer | undefined;

beforeAll(async () => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    await Promise.all(Object.values(mongoose.connection.models).map((m) => m.init()));
  }
}, 60000);

afterEach(async () => {
  const collections = mongoose.connection.collections;
  await Promise.all(Object.values(collections).map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
    mongod = undefined;
  }
});
