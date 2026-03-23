

## Plan: Replace Header Logo + Fix Broken Images

### 1. Replace Navbar logo with the uploaded combined logo
Copy the uploaded `ChatGPT_Image_Mar_23_2026_04_51_07_PM.png` as `src/assets/logo-combined.png`. In `Navbar.tsx`, replace the two separate logo images (house logo + text logo) with this single combined image. Keep the feathered edge masking for smooth blending. Size it generously (h-16 sm:h-20).

### 2. Fix broken/404 service and section images
The following image files are broken (contain `<html><body>404</body></html>`):
- `svc-pruning.jpg` — used in Services (Professional Cutting & Shaping)
- `before-society.jpg` — used in Transformations
- `before-office.jpg` — used in Transformations
- `why-addon.jpg` — used in Why Us section

Replace each with a relevant Unsplash stock photo:
- **svc-pruning.jpg**: Plant pruning/trimming photo
- **before-society.jpg**: Neglected garden/empty lawn photo
- **before-office.jpg**: Bare office space photo
- **why-addon.jpg**: Kitchen garden or green decor photo

### Technical Details
- **Files modified**: `Navbar.tsx` (swap 2 logo imports for 1 combined logo)
- **Assets added**: 1 new logo file (`logo-combined.png`)
- **Assets replaced**: 4 broken jpg files overwritten with real stock photos

