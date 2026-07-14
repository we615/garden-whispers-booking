const COLORS = {
  primary: "#1f5c3d",
  accent: "#e0a324",
  bg: "#f3f5ef",
  card: "#ffffff",
  text: "#1a2e22",
  muted: "#5c6b62",
  border: "#dfe3da",
};

function baseLayout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:${COLORS.card};border-radius:16px;overflow:hidden;border:1px solid ${COLORS.border};">
            <tr>
              <td style="background:${COLORS.primary};padding:24px 32px;">
                <span style="font-size:20px;font-weight:700;color:#ffffff;">🌿 EcoBloom Plant Care</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:${COLORS.text};">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:${COLORS.bg};border-top:1px solid ${COLORS.border};">
                <p style="margin:0;font-size:12px;color:${COLORS.muted};">
                  EcoBloom Plant Care · Pune &amp; PCMC · This is an automated message.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:14px;color:${COLORS.muted};width:140px;">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:${COLORS.text};font-weight:600;">${value}</td>
  </tr>`;
}

function detailsTable(rows: string): string {
  return `<table role="presentation" width="100%" style="margin:16px 0;border-collapse:collapse;">${rows}</table>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${COLORS.text};">${text}</p>`;
}

export interface BookingEmailData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  serviceRequested: string;
  plantCount?: number;
  preferredTimeSlot: string;
}

export function bookingConfirmationCustomerEmail(data: BookingEmailData): { subject: string; html: string } {
  const body =
    paragraph(`Hi ${data.name}, thanks for booking with EcoBloom! 🌱 We've received your request and our team will reach out shortly on WhatsApp/phone to confirm your visit.`) +
    detailsTable(
      row("Service", data.serviceRequested) +
      row("Preferred time", data.preferredTimeSlot) +
      row("Address", data.address) +
      (data.plantCount ? row("Plant count", String(data.plantCount)) : "")
    ) +
    paragraph(`If anything looks off, just reply to this email or call us at <strong>9270993102</strong>.`);

  return { subject: "We've received your booking — EcoBloom Plant Care", html: baseLayout("Booking received 🌿", body) };
}

export function bookingNotificationAdminEmail(data: BookingEmailData): { subject: string; html: string } {
  const body =
    paragraph(`New booking request received from the website.`) +
    detailsTable(
      row("Name", data.name) +
      row("Phone", data.phone) +
      row("Email", data.email || "—") +
      row("Service", data.serviceRequested) +
      row("Preferred time", data.preferredTimeSlot) +
      row("Address", data.address) +
      (data.plantCount ? row("Plant count", String(data.plantCount)) : "")
    ) +
    paragraph(`Manage this booking in the admin panel's Bookings inbox.`);

  return { subject: `New booking: ${data.name} — ${data.serviceRequested}`, html: baseLayout("New booking 📥", body) };
}

export function welcomeCustomerEmail(name: string): { subject: string; html: string } {
  const body =
    paragraph(`Hi ${name}, welcome to EcoBloom! 🌿`) +
    paragraph(`Your account is ready. You can now book visits, track your bookings, and manage your plant care plans from your account page.`) +
    paragraph(`Excited to help your garden thrive!`);

  return { subject: "Welcome to EcoBloom Plant Care 🌱", html: baseLayout("Welcome to EcoBloom", body) };
}

export interface PaymentEmailData {
  customerName: string;
  customerEmail: string;
  planLabel: string;
  amountRupees: number;
  receiptNumber: string;
}

export function paymentConfirmationCustomerEmail(data: PaymentEmailData): { subject: string; html: string } {
  const body =
    paragraph(`Hi ${data.customerName}, your payment was successful! 🎉`) +
    detailsTable(
      row("Plan", data.planLabel) +
      row("Amount paid", `₹${data.amountRupees.toLocaleString("en-IN")}`) +
      row("Receipt", data.receiptNumber)
    ) +
    paragraph(`You can view this in your order history anytime from your account page. Thanks for choosing EcoBloom!`);

  return { subject: "Payment confirmed — EcoBloom Plant Care", html: baseLayout("Payment confirmed ✅", body) };
}

export function paymentNotificationAdminEmail(data: PaymentEmailData): { subject: string; html: string } {
  const body =
    paragraph(`A new payment was received.`) +
    detailsTable(
      row("Customer", data.customerName) +
      row("Email", data.customerEmail) +
      row("Plan", data.planLabel) +
      row("Amount", `₹${data.amountRupees.toLocaleString("en-IN")}`) +
      row("Receipt", data.receiptNumber)
    );

  return { subject: `New payment: ₹${data.amountRupees.toLocaleString("en-IN")} from ${data.customerName}`, html: baseLayout("New payment received 💰", body) };
}
