import { describe, expect, it, vi } from "vitest";
import {
  bookingConfirmationCustomerEmail,
  bookingNotificationAdminEmail,
  welcomeCustomerEmail,
  paymentConfirmationCustomerEmail,
  paymentNotificationAdminEmail,
} from "../src/emails/templates.js";
import { sendEmail } from "../src/services/email.js";

describe("email templates (pure rendering, no network)", () => {
  const booking = {
    name: "Jane Doe",
    phone: "9876543210",
    email: "jane@example.com",
    address: "123 Baner Road, Pune",
    serviceRequested: "🌿 Monthly Plant Care & Maintenance",
    plantCount: 12,
    preferredTimeSlot: "Morning (8 AM – 11 AM)",
  };

  it("renders the customer booking confirmation with the booking details", () => {
    const { subject, html } = bookingConfirmationCustomerEmail(booking);
    expect(subject).toContain("booking");
    expect(html).toContain("Jane Doe");
    expect(html).toContain("Monthly Plant Care");
    expect(html).toContain("Morning (8 AM – 11 AM)");
    expect(html).toContain("123 Baner Road, Pune");
  });

  it("renders the admin booking notification with contact details for follow-up", () => {
    const { subject, html } = bookingNotificationAdminEmail(booking);
    expect(subject).toContain("Jane Doe");
    expect(html).toContain("9876543210");
    expect(html).toContain("jane@example.com");
  });

  it("omits the plant count row when not provided", () => {
    const { html } = bookingConfirmationCustomerEmail({ ...booking, plantCount: undefined });
    expect(html).not.toContain("Plant count");
  });

  it("renders a welcome email with the customer's name", () => {
    const { html } = welcomeCustomerEmail("Priya Sharma");
    expect(html).toContain("Priya Sharma");
  });

  const payment = {
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    planLabel: "1 Year — up to 10 plants",
    amountRupees: 11040,
    receiptNumber: "EB-12345-abcdef",
  };

  it("renders the customer payment confirmation with the formatted amount", () => {
    const { html } = paymentConfirmationCustomerEmail(payment);
    expect(html).toContain("11,040");
    expect(html).toContain("EB-12345-abcdef");
    expect(html).toContain("1 Year — up to 10 plants");
  });

  it("renders the admin payment notification with the customer email", () => {
    const { subject, html } = paymentNotificationAdminEmail(payment);
    expect(subject).toContain("11,040");
    expect(html).toContain("jane@example.com");
  });
});

describe("email service graceful degradation", () => {
  // The test environment never sets RESEND_API_KEY (see test/setup.ts), so sendEmail() here
  // exercises the real no-op path — no mocking of the Resend client needed.
  it("does not throw and logs a warning when RESEND_API_KEY is not configured", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await expect(sendEmail({ to: "x@example.com", subject: "Test", html: "<p>hi</p>" })).resolves.toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("RESEND_API_KEY not set"));
    warnSpy.mockRestore();
  });
});
