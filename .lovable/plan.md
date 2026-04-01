

## Plan: Testimonials, Floating Button, Content Updates, New Service Images

### 1. Add more testimonials
Add two new entries to `TestimonialsSection.tsx`:
- "EcoBloom saved my plants — they look fresh and healthy now!" — Rahul, Pune
- "Very professional service, highly recommended." — Sneha, Wakad
Update grid to handle 5 cards (keep `md:grid-cols-3`, cards will wrap naturally).

### 2. Floating WhatsApp button
Create `src/components/FloatingWhatsApp.tsx` — a fixed bottom-right button:
- Text: "Get FREE Plant Diagnosis 🌿"
- Subtitle: "Send your plant photo on WhatsApp and get expert advice instantly."
- Links to `https://wa.me/919270993102`
- Add to `Index.tsx`

### 3. Change hero CTA text
In `HeroSection.tsx`, change "Book Free Visit" → "Book free plants inspection visit"

### 4. Update IntroSection text
Replace the paragraph in `IntroSection.tsx` with the new 3-paragraph copy about scientific diagnosis, Agriculture graduates, Pune and PCMC.

### 5. Update hero subtitle (image-81 reference)
Change hero `<p>` to: "Professional plant care and garden maintenance services across Pune and PCMC driven by expertise, backed by passion."

### 6. New service images (3 replacements + 1 new)
- Copy `image-78.png` → `src/assets/svc-setup.jpg` (Plants Setup & Green Décor)
- Copy `image-79.png` → new `src/assets/svc-soil-ops.jpg` (new "Soil Operations" core service)
- Copy `image-80.png` → `src/assets/svc-pruning.jpg` (Professional Cutting & Shaping)
- Add "Soil Operations" entry to `coreServices` array with Shovel icon

### 7. Add MissionSection-style content block (image-81 reference)
Create a new section or update an existing one with the content from image-81:
- "Professional plant care and garden maintenance services across Pune and PCMC..."
- "We combine scientific plant care with thoughtful design..."
- "Create a space that feels alive, thriving, and beautifully green."
- CTA: "Book Your Expert Visit Today" linking to #booking
- Add after IntroSection in Index.tsx (or integrate into MissionSection if it exists)

### Files Modified
- `src/components/TestimonialsSection.tsx` — add 2 testimonials
- `src/components/FloatingWhatsApp.tsx` — new floating button
- `src/components/HeroSection.tsx` — update CTA text + subtitle
- `src/components/IntroSection.tsx` — update paragraph text
- `src/components/ServicesSection.tsx` — add Soil Operations service
- `src/components/MissionSection.tsx` — update with new content block + CTA
- `src/pages/Index.tsx` — add FloatingWhatsApp, add MissionSection
- `src/assets/svc-setup.jpg` — overwrite with image-78
- `src/assets/svc-soil-ops.jpg` — new (image-79)
- `src/assets/svc-pruning.jpg` — overwrite with image-80

