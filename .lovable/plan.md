

## Plan: Multiple Image/Video Updates & Text Fix

### 1. Replace "Customized Add-On Services" image in Why Us section
- Copy `image-58` (balcony garden photo) to `src/assets/nursery-plants.jpg` (overwrite) — this is used by `whyAddon` in WhyUsSection

### 2. Update Video Gallery — restructure into 2 categories
- **Keep** `ecobloom-work-3.mp4` ("Indoor Plant Styling")
- **Add** `WhatsApp_Video_2026-03-26_at_14.16.59.mp4` as 2nd video (copy to `public/videos/ecobloom-work-6.mp4`)
- **Remove** `ecobloom-work-4.mp4` and `ecobloom-work-5.mp4`
- **Add new "Corporate Offices" category** with the 3 latest videos:
  - `WhatsApp_Video_2026-03-30_at_12.30.13.mp4` → `public/videos/corporate-1.mp4`
  - `WhatsApp_Video_2026-03-30_at_12.30.11.mp4` → `public/videos/corporate-2.mp4`
  - `WhatsApp_Video_2026-03-30_at_12.30.07.mp4` → `public/videos/corporate-3.mp4`
- Update `VideoGallery.tsx`: two video arrays, two grid sections with "Corporate Offices" sub-header
- Remove photo gallery (snake plant / zz plant images) to keep section clean

### 3. Remove "BSc" from IntroSection
- In `src/components/IntroSection.tsx` line 13, change "two BSc Agriculture graduates" to "two Agriculture graduates"

### 4. Replace "Regular Weekly Visits" image in Why Us
- Copy `image-60` (team member arranging plants on office desk) to `src/assets/team-pruning.png` (overwrite) — used by `whyWeekly`

### 5. Replace "Nutrient Management" image in Services
- Copy `image-61` (team member watering plant) to `src/assets/svc-nutrients.jpg` (overwrite) — used by `svcNutrients`

### Files Modified
- `src/assets/nursery-plants.jpg` — overwrite with balcony garden
- `src/assets/team-pruning.png` — overwrite with office desk plants photo
- `src/assets/svc-nutrients.jpg` — overwrite with watering photo
- `public/videos/ecobloom-work-6.mp4` — new video
- `public/videos/corporate-1.mp4`, `corporate-2.mp4`, `corporate-3.mp4` — new videos
- `public/videos/ecobloom-work-4.mp4` — delete
- `public/videos/ecobloom-work-5.mp4` — delete
- `src/components/VideoGallery.tsx` — restructure with 2 categories
- `src/components/IntroSection.tsx` — remove "BSc"

