

## Plan: Fix Client Logos, Update Pricing, Replace Service Images

### 1. Fix Our Clients section alignment
- In `ClientsSection.tsx`, ensure all logos are aligned in a straight horizontal line using `items-center` and consistent container sizing
- Add `aspect-square` or fixed dimensions to ensure uniform logo boxes

### 2. Replace service images (3 changes)
- Copy `image-64.png` (balcony garden) → `src/assets/svc-garden-design.jpg` (overwrite) — used by "Design Your Garden" add-on
- Copy `image-68.png` (kitchen vegetable garden) → `src/assets/svc-kitchen.jpg` (overwrite) — used by "Home Kitchen Vegetable Garden" add-on
- Copy `image-69.png` (team member watering plant) → `src/assets/svc-nutrients.jpg` (overwrite) — used by "Nutrient Management" core service
- For Nutrient Management, adjust the image CSS to use `object-contain` or proper positioning so the full image is visible without cropping

### 3. Fix pricing data (3 changes in `PricingSection.tsx`)
- **10 plants, 6-month**: change sixMonth total from 6480 → 6000, monthly rate from 1080 → 1000
- **75 plants, 3-month**: change threeMonth total from 23400 → 22500, monthly rate from 7800 → 7500
- **100 plants, 3-month**: change threeMonth total from 31200 → 30000, monthly rate from 10400 → 10000

### Files Modified
- `src/components/ClientsSection.tsx` — fix logo alignment
- `src/components/PricingSection.tsx` — update 3 pricing values
- `src/components/ServicesSection.tsx` — adjust Nutrient Management image to prevent cropping
- `src/assets/svc-garden-design.jpg` — overwrite with balcony garden
- `src/assets/svc-kitchen.jpg` — overwrite with kitchen vegetable garden
- `src/assets/svc-nutrients.jpg` — overwrite with team member watering

