

## Plan: Client Logos, Video Tabs, Booking Form Update, Image Replacement

### 1. Create "Our Clients" section
- New component `src/components/ClientsSection.tsx` displaying logos of: Spurx, RedSky Hospitality, Life Saving India, Enversys Greentek Solutions, Planet Enviro Services
- Copy all 5 logo images to `src/assets/clients/`
- Horizontal scrolling logo row or grid, with company names below each
- Add to `Index.tsx` (place after TestimonialsSection, before BookingForm)

### 2. Video Gallery — merge into tabbed layout
- Combine "Our Work — Live" and "Corporate Offices" into one section with filter tabs: **All**, **Home**, **Corporate**
- All videos in a single array with a `category` field
- Tabs filter the displayed videos; "All" shows everything
- Single responsive grid, no separate sub-headers

### 3. Remove Before & After section
- Remove `<TransformationSection />` from `Index.tsx`
- Keep the component file (no deletion), just remove from page

### 4. Update Booking Form service options
Replace the 8 current options with these 6:
1. Monthly Plant Care & Maintenance
2. Design Your Garden
3. Plants Consultation
4. Visit My Garden Plants
5. Vertical Garden Installation & Care
6. Kitchen Garden & Grow Vegetables

### 5. Replace IntroSection image
- Copy `image-63.png` (EcoBloom professional gardener) to `src/assets/team-portrait.png` (overwrite)
- Also fix the duplicated text in IntroSection paragraph

### Files Modified
- `src/components/ClientsSection.tsx` — new
- `src/assets/clients/` — 5 new logo files
- `src/pages/Index.tsx` — add ClientsSection, remove TransformationSection
- `src/components/VideoGallery.tsx` — tabbed layout
- `src/components/BookingForm.tsx` — update service options
- `src/assets/team-portrait.png` — overwrite with new image
- `src/components/IntroSection.tsx` — fix duplicated text

