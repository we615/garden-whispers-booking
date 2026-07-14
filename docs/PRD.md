# Product Requirements Document — EcoBloom Plant Care Website

**Status:** Reverse-engineered from current implementation (baseline for future planning)
**Last updated:** 2026-07-13
**Owner:** TBD

---

## 1. Overview

EcoBloom Plant Care is a marketing and lead-generation website for a plant care / garden maintenance
service business operating in Pune and PCMC, India. The site's job is to convert visitors into booked
consultation visits, with **WhatsApp as the primary conversion and communication channel** (no backend,
no database, no CRM integration today).

The company is founded by agriculture graduates and offers recurring plant-care subscriptions
(weekly visits, billed monthly/quarterly/half-yearly/yearly) plus one-off services (garden design,
consultations, vertical gardens, kitchen gardens).

## 2. Goals

- Generate qualified leads (booking requests) via a low-friction multi-step form that hands off to WhatsApp.
- Clearly communicate service offerings, pricing, and credibility (testimonials, B2B client logos) to
  build trust before a visitor commits to contact.
- Support both consumer (residential) and small B2B (societies, offices) audiences.
- Keep infrastructure minimal — static site, no server-side moving parts, cheap to host and maintain.

### Non-goals (current version)
- No online payments or checkout.
- No account creation / login / customer portal.
- No real booking/calendar system — "booking" is a structured WhatsApp message, not a confirmed
  appointment.
- No CMS — all copy, pricing, and images are hard-coded in the React source.

## 3. Target Users

| Segment | Description |
|---|---|
| Residential customers | Homeowners/renters in Pune/PCMC with balcony, terrace, or indoor plants needing care, design, or troubleshooting. |
| Prospective subscribers | Visitors comparing recurring maintenance plans by plant count and commitment length. |
| B2B / societies | Housing societies, hospitality, and corporate clients wanting landscaping/plant maintenance contracts (see "Our Clients" section: Spurx, RedSky Hospitality, Kalpataru Regency, etc.). |
| Return visitors | Existing customers looking up contact info or the About page. |

## 4. Current Feature Set

### 4.1 Site structure
- **`/` (Home)** — single scrolling page composed of: Navbar → Hero → Intro → Services →
  How It Works → Pricing Calculator → CTA Banner → Why Us → Video Gallery → Testimonials →
  Clients → Booking Form → Floating WhatsApp button → Footer.
- **`/about`** — brand story, values, mission/vision, secondary CTA back to booking.
- **`*` (404)** — catch-all not-found page.
- Cross-page navigation supports deep-linking into home page sections via `?scrollTo=<sectionId>`
  (e.g. `/about` → "Book a Visit" navigates to `/?scrollTo=booking` and auto-scrolls).

### 4.2 Hero Section
- Auto-advancing image carousel (3 images, 5s interval) with manual prev/next arrows and dot indicators.
- Primary CTA → scrolls to booking form. Secondary CTA → opens WhatsApp chat directly.

### 4.3 Services
- **8 core services** (soil/water/sunlight checkup, repotting, pruning, nutrient management, pest
  control, plant styling/décor, weekly visits, soil operations) shown as an image-card grid.
- **4 add-on services** (kitchen garden, vertical garden, custom garden design, "DIY Care Kit +
  consultation" — flagged as featured) shown as expandable text-over-image cards ("Read more/less").

### 4.4 How It Works
- 3-step explainer: Schedule a Consultation → Get a Customized Plan → Enjoy a Beautiful Garden.

### 4.5 Pricing Calculator
- Interactive: user selects a plant count tier (10/20/30/40/50/75/100).
- Displays 4 commitment plans (1 month, 3 months, 6 months, 1 year) with per-month rate, total price,
  discount badges (e.g. "10% Off", computed yearly savings %), and bonus free visits for longer terms
  (1 free visit at 6mo, 4 free visits at 1yr).
- Desktop-only full comparison table across all plant tiers.
- All pricing data is hard-coded (`pricingData` / `monthlyRates` maps in `PricingSection.tsx`) — no
  backend pricing source.

### 4.6 CTA Banner
- Mid-page nudge ("Not sure where to begin?") linking to WhatsApp with a pre-filled message.

### 4.7 Why Us
- 6 differentiators: expert-led (agriculture graduates), scientific approach, one-stop service,
  reliability, transparent pricing, visible results.

### 4.8 Video Gallery, Testimonials, Clients
- Video gallery of work/results (component present, not inspected in depth here).
- Testimonial cards with customer name, rating, quote, relative time/location.
- B2B client logo strip (6 organizations) for social proof.

### 4.9 Booking Form (core conversion flow)
- 3-step wizard, client-side state only, no persistence:
  1. **Service selection** — 6 options (monthly care, design garden, consultation, garden visit,
     vertical garden, kitchen garden).
  2. **Contact & garden details** — name, phone, email (optional), address, plant count. All fields
     have `maxLength` caps; required fields gate progression.
  3. **Preferred time slot** — 4 fixed windows (morning/midday/afternoon/evening).
- On submit: builds a formatted message from form data (sanitized via `encodeURIComponent` + length
  truncation) and opens `wa.me/919270993102` with the pre-filled text in a new tab. **This is the
  entire "booking" mechanism** — there is no server record of submissions.
- Fallback: direct phone numbers displayed below the form for users who prefer calling.

### 4.10 Floating WhatsApp Widget
- Persistent bottom-right button ("Get FREE Plant Diagnosis") opening a WhatsApp chat with a
  pre-filled photo-diagnosis prompt — a secondary, lower-friction conversion path alongside the form.

### 4.11 Navbar & Footer
- Sticky navbar with smooth-scroll anchor links (Home, Services, Pricing, Why Us, Contact) plus a
  routed link to About Us; mobile hamburger menu.
- Footer with sitemap links, service links, contact (2 phone numbers, email), and social links
  (call, email, WhatsApp, Instagram).

### 4.12 About Us Page
- Brand story, 4 value pillars (sustainability, passion, community, personalization), Mission &
  Vision section (8 mission pillars + vision statement), closing CTA back to booking.

## 5. Technical Overview

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite, TypeScript |
| Routing | react-router-dom (client-side, 2 real routes + catch-all) |
| UI | shadcn/ui (Radix primitives) + Tailwind CSS, custom `font-display` typography, custom brand color tokens (`brand-red`, `brand-blue`, `primary`, `accent`) |
| State/data | Local component state only; `@tanstack/react-query` is installed but no query/mutation usage observed against a real API — no backend exists |
| Lead capture | WhatsApp deep links (`wa.me`) — no server, no database, no email capture pipeline |
| Testing | Vitest (unit) + Playwright (e2e), config present under `vitest.config.ts` / `playwright.config.ts` |
| Hosting/build | Static build via `vite build`; originally scaffolded on the Lovable platform (`vite_react_shadcn_ts` template) |
| Assets | All images bundled from `src/assets` (hero photos, service photos, client logos, team portrait) |

## 6. Known Gaps / Risks

- **No lead persistence.** If a user's WhatsApp fails to open (e.g., desktop without WhatsApp Web
  configured, or the link is blocked), the lead is lost with no record anywhere.
- **No analytics/conversion tracking** observed (no GA/Meta Pixel/etc. wired in) — no visibility into
  funnel drop-off across the 3-step booking form.
- **No form validation beyond presence checks** — e.g. phone number isn't validated for format, plant
  count isn't bounded, email isn't validated when provided.
- **Hard-coded business data** (pricing, phone numbers, service list, testimonials) requires a code
  change + redeploy for any content update — no CMS or admin panel.
- **Single WhatsApp number for all traffic** — no routing/queueing if lead volume grows, no way to
  measure response SLAs.
- **`docs/`, `README.md` are effectively empty** — no onboarding documentation for new contributors.
- Favicon currently shows as modified in git status (uncommitted) — cosmetic, unrelated to product
  scope, but worth clearing before this PRD is treated as "current state."

## 7. Open Questions (for whoever owns this next)

1. Is WhatsApp-only lead capture a deliberate long-term choice, or a stopgap before a real
   booking/CRM system?
2. Should the pricing calculator ever reflect live/editable pricing (e.g., via a lightweight CMS or
   config file) instead of hard-coded maps?
3. Is there a target for lead-tracking/analytics (e.g., attributing WhatsApp clicks, form-step
   completion) to measure funnel performance?
4. Is multi-city expansion beyond Pune/PCMC planned? Several copy blocks explicitly hard-code Pune/PCMC.

## 8. Suggested Next Steps (not yet scoped)

- Add basic analytics (page views + form step completion + CTA clicks) to measure the funnel before
  changing it.
- Add lightweight lead capture redundancy (e.g., a serverless form endpoint that logs submissions
  even if the WhatsApp handoff fails or is abandoned).
- Tighten form validation (phone format, plant count bounds).
- Consider extracting hard-coded content (pricing, services, testimonials) into a single config/data
  file to reduce the blast radius of routine content updates.
