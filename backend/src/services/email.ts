import { Resend } from "resend";
import { env } from "../config/env.js";

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(env.RESEND_API_KEY);
  return client;
}

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

/**
 * Fire-and-forget by design: every call site treats email as a side effect of a successful
 * booking/signup/payment, never a precondition for it — so this never throws, only logs.
 * No-ops (with a warning) when RESEND_API_KEY isn't configured, so the app runs fine without it.
 */
export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping email "${subject}" to ${to}`);
    return;
  }

  try {
    const result = await resend.emails.send({ from: env.EMAIL_FROM, to, subject, html });
    if (result.error) {
      console.error(`[email] Resend rejected "${subject}" to ${to}:`, result.error);
    }
  } catch (err) {
    console.error(`[email] Failed to send "${subject}" to ${to}:`, err);
  }
}

export function getAdminNotificationEmail(): string | null {
  return env.ADMIN_NOTIFICATION_EMAIL ?? env.ADMIN_EMAIL ?? null;
}
