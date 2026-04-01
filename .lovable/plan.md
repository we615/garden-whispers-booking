

## Plan: Add CTA Section, Floating WhatsApp Button, and More Testimonials

### 1. Add "Not Sure Where to Begin?" CTA Section
**New file: `src/components/CtaBanner.tsx`**

A dark green banner section placed between the Pricing section and the next section (Why Us). Contains:
- Subtext: "LET OUR EXPERTS HELP YOU CHOOSE THE RIGHT PLAN FOR YOUR GARDEN."
- Heading: "NOT SURE WHERE TO BEGIN?"
- Yellow/accent "Talk to Our Care Team" button linking to WhatsApp (`https://wa.me/919270993102`)

Update `src/pages/Index.tsx` to import and place `<CtaBanner />` after `<PricingSection />`.

### 2. Add Floating WhatsApp Button
**New file: `src/components/FloatingWhatsApp.tsx`**

A fixed-position button in the bottom-right corner with:
- WhatsApp icon
- "Get FREE Plant Diagnosis 🌿" label text
- Sub-line: "Send your plant photo on WhatsApp and get expert advice instantly"
- Links to `https://wa.me/919270993102`
- Styled with green WhatsApp brand color, subtle shadow, always visible

Add it to `src/pages/Index.tsx` (or `App.tsx`) so it appears on all pages.

### 3. Add More Testimonials
**Edit: `src/components/TestimonialsSection.tsx`**

Add these testimonials to the array plus a few more to fill out the grid:
- "EcoBloom saved my plants — they look fresh and healthy now!" — Rahul, Pune
- "Very professional service, highly recommended." — Sneha, Wakad

Change the layout to accommodate more cards (e.g., 2 rows of 3, or a scrollable carousel). Use a simpler quote-style card format for the new entries (just quote + name + location, no time/rating needed).

### Files Changed
- `src/components/CtaBanner.tsx` (new)
- `src/components/FloatingWhatsApp.tsx` (new)
- `src/components/TestimonialsSection.tsx` (edit)
- `src/pages/Index.tsx` (edit)

