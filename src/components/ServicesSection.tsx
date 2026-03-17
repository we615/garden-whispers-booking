import ghibliSoil from "@/assets/ghibli-soil.jpg";
import ghibliRepotting from "@/assets/ghibli-repotting.jpg";
import ghibliPruning from "@/assets/ghibli-pruning.jpg";
import ghibliNutrients from "@/assets/ghibli-nutrients.jpg";
import ghibliPest from "@/assets/ghibli-pest.jpg";
import ghibliSetup from "@/assets/ghibli-setup.jpg";
import ghibliKitchen from "@/assets/ghibli-kitchen.jpg";
import ghibliHydroponics from "@/assets/ghibli-hydroponics.jpg";
import ghibliVertical from "@/assets/ghibli-vertical.jpg";
import ghibliTerrarium from "@/assets/ghibli-terrarium.jpg";

const coreServices = [
  { img: ghibliSoil, title: "Soil, Water & Sunlight Checkup", desc: "Complete plant health assessment to ensure ideal growing conditions." },
  { img: ghibliRepotting, title: "Repotting & Transplanting", desc: "Safe shifting of plants into new pots with proper root protection." },
  { img: ghibliPruning, title: "Professional Cutting & Shaping", desc: "Expert trimming and styling to keep your plants lush and beautiful." },
  { img: ghibliNutrients, title: "Organic Nutrient Management", desc: "Natural organic nutrition for stronger, greener plants at every growth stage." },
  { img: ghibliPest, title: "Organic Pest & Disease Control", desc: "Eco-friendly treatment to protect plants from insects, diseases, and fungus." },
  { img: ghibliSetup, title: "Plants Setup & Green Décor", desc: "We arrange your plants and enhance your space with beautiful greenery." },
];

const addOnServices = [
  { img: ghibliKitchen, title: "Home Kitchen Vegetable Garden", desc: "Setup & care — eat what you grow. Fresh herbs and veggies from your balcony." },
  { img: ghibliHydroponics, title: "Hydroponics Setup & Maintenance", desc: "Soil-free growing systems installed and maintained for modern urban homes." },
  { img: ghibliVertical, title: "Vertical Garden — Installation & Care", desc: "Transform walls into living green spaces with professional vertical setups." },
  { img: ghibliTerrarium, title: "Terrariums & HomeGreen Décor", desc: "Beautiful terrariums, vermicompost kits, and other green décor items." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Premium Indoor & Outdoor Plant Care
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          From soil health to styling — we handle every aspect of your garden with expert, science-backed care.
        </p>

        {/* Core Services — Alternating image+text rows */}
        <div className="space-y-8 mb-28">
          {coreServices.map((s, i) => (
            <div
              key={s.title}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-center group`}
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)]">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="w-full md:w-1/2 md:px-8">
                <div className="w-12 h-1 bg-accent rounded-full mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3 uppercase tracking-wide">{s.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add-On Services — Image card grid with overlay */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Explore More</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Green Add-On Services
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
          Go beyond regular maintenance — kitchen gardens, hydroponics, terrariums, and more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {addOnServices.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)] hover:shadow-[0_8px_30px_-4px_hsl(var(--foreground)/0.2)] transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide mb-2">{s.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
