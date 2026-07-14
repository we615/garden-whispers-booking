import { connectDB, disconnectDB } from "../config/db.js";
import { env } from "../config/env.js";
import { UserModel } from "../models/User.js";
import { hashPassword } from "../utils/password.js";

async function main() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env to seed the admin user");
  }

  await connectDB();

  const existing = await UserModel.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log(`Promoted existing user ${existing.email} to admin.`);
    } else {
      console.log(`Admin user ${existing.email} already exists — nothing to do.`);
    }
    await disconnectDB();
    return;
  }

  const passwordHash = await hashPassword(env.ADMIN_PASSWORD);
  const admin = await UserModel.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    phone: "0000000000",
    passwordHash,
    role: "admin",
  });

  console.log(`Created admin user: ${admin.email}`);
  await disconnectDB();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
