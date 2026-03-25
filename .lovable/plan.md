

## Plan: Fix Image Issues Across Multiple Sections

### Issues Identified

1. **Decorative plant image (image-53)** — Currently displayed separately at the bottom of VideoGallery section with `object-cover` cropping it. Should be moved to the "Plants Setup & Green Décor" service card in ServicesSection where it contextually belongs, and displayed without cropping.

2. **Consultation image (image-54)** — Used as `svcConsultation` (mapped to `why-personalized.jpg`), face is cut off due to `object-cover` on the add-on card. Fix by using `object-top` positioning so the face stays visible.

3. **Design Your Garden** — `svc-garden-design.jpg` is an empty/broken file. Replace with a relevant open-source garden design photo from Unsplash.

4. **Before & After images don't match** — The before/after pairs aren't realistic transformation pairs. Replace all 6 images with realistic open-source before/after garden transformation photos from Unsplash.

### Changes

#### 1. Move decorative plant image to ServicesSection
- Replace `svc-setup.jpg` (Plants Setup & Green Décor) with the uploaded `image-53.png` (the dracaena plant photo)
- Remove the decorative image block from `VideoGallery.tsx` (lines 74-82) and the `decor-plant.jpg` import

#### 2. Fix face cropping on Plants Consultation card
- In `ServicesSection.tsx`, update the add-on card image styling to use `object-top` specifically for the consultation card, so the person's face isn't cut off

#### 3. Replace broken Design Your Garden image
- Overwrite `svc-garden-design.jpg` with a relevant Unsplash stock photo of a designed garden landscape

#### 4. Replace Before & After images with realistic Unsplash photos
- Replace all 6 before/after images with matching pairs from Unsplash:
  - **Balcony**: neglected balcony → lush green balcony
  - **Society Garden**: barren lawn → landscaped garden
  - **Office**: bare office → green office space

### Files Modified
- `src/assets/svc-setup.jpg` — overwrite with uploaded image-53
- `src/components/VideoGallery.tsx` — remove decorative image block
- `src/components/ServicesSection.tsx` — add `object-top` for consultation card
- `src/assets/svc-garden-design.jpg` — replace with Unsplash stock photo
- `src/assets/before-balcony.jpg`, `after-balcony.jpg`, `before-society.jpg`, `after-society.jpg`, `before-office.jpg`, `after-office.jpg` — replace with realistic Unsplash pairs

