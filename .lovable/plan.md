

## Plan: Update Hero Subtext, Consultation Card, and Add Client Logo

### 1. Fix hero subtext (HeroSection.tsx)
The subtext on line 60 appears to already have the correct text, but based on user feedback it hasn't changed in the preview. Will re-apply the exact text without em dashes to match user's request:
> "Professional plant care and garden maintenance services across Pune and PCMC driven by expertise, backed by passion.We combine scientific plant care with thoughtful design to revive, protect, and elevate your green spaces all under one roof.Create a space that feels alive, thriving, and beautifully green."

### 2. Update "Plants Consultation" add-on card (ServicesSection.tsx)
- Change title from "Plants Consultation" to "EcoBloom DIY Care Kit with Expert Plants Consultation Visit"
- Replace description with the new multi-paragraph content about EcoBloom Care Kit
- Replace image: copy `image-87.png` (DIY Care Kit photo) to `src/assets/svc-consultation.jpg` and update the import
- Since the description is long, may need to adjust the card's text area or aspect ratio

### 3. Add new client logo (ClientsSection.tsx)
- Copy `image-88.png` (Kalpataru Regency I) to `src/assets/clients/kalpataru.png`
- Add to clients array and ensure alignment remains consistent

### Files Modified
- `src/components/HeroSection.tsx` -- fix subtext
- `src/components/ServicesSection.tsx` -- update consultation card title, desc, image
- `src/components/ClientsSection.tsx` -- add Kalpataru Regency I logo
- `src/assets/svc-consultation.jpg` -- new image (DIY kit photo)
- `src/assets/clients/kalpataru.png` -- new client logo

