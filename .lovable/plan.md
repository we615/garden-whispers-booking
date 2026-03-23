

## Plan: Multiple Updates

### 1. Add EcoBloom text logo next to main logo in Navbar
Copy the uploaded EcoBloom text logo (`image-35.png`) as `src/assets/logo-text.png`. Display it next to the existing house logo in the navbar at a complementary size.

### 2. Hero heading: "We Make Spaces Bloom"
Change `HeroSection.tsx` line 57 from "We Make Your Space Bloom" to "We Make Spaces Bloom".

### 3. Remove "Organic" word across the website
Files affected:
- **ServicesSection.tsx**: "Organic Nutrient Management" → "Nutrient Management", "Natural organic nutrition..." → "Natural nutrition...", "Organic Pest & Disease Control" → "Pest & Disease Control"
- **WhyUsSection.tsx**: "100% Organic Solutions" → "100% Natural Solutions", "organic nutrition" → "natural nutrition"
- **MissionSection.tsx**: "Eco-Friendly & Organic Practices" → "Eco-Friendly & Natural Practices"
- **BookingForm.tsx**: "Organic Pest Control" → "Pest Control", "Organic Nutrient Management" → "Nutrient Management"
- **AboutUs.tsx**: Remove/replace "organic" in 3 places with "natural" or similar wording

### 4. Remove Hydroponics and Terrarium from Add-On Services
In `ServicesSection.tsx`, remove the hydroponics and terrarium entries from `addOnServices` array, keeping only Kitchen Garden and Vertical Garden. Remove unused imports (`svcHydroponics`, `svcTerrarium`). Update the grid from `lg:grid-cols-4` to `sm:grid-cols-2` (2 items). Also update the add-on description text to remove mentions of hydroponics/terrariums.

### 5. Remove "100% Organic Solutions" card from WhyUsSection
Based on the circled screenshot (image-36), remove the "100% Organic Solutions" card entirely from the `reasons` array in `WhyUsSection.tsx`. Remove the `whyOrganic` import.

### Technical Details
- 7 files modified: Navbar, HeroSection, ServicesSection, WhyUsSection, MissionSection, BookingForm, AboutUs
- 1 new asset: `logo-text.png`

