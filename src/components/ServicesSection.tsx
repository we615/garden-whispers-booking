import { Droplets, Sprout, Scissors, Leaf, Bug, TreePine } from "lucide-react";
import svcSoil from "@/assets/svc-soil.jpg";
import svcRepotting from "@/assets/svc-repotting.jpg";
import svcPruning from "@/assets/svc-pruning.jpg";
import svcNutrients from "@/assets/svc-nutrients.jpg";
import svcSetup from "@/assets/svc-setup.jpg";
import svcKitchen from "@/assets/svc-kitchen.jpg";
import svcVertical from "@/assets/svc-vertical.jpg";
import servicePest from "@/assets/service-pest.jpg";

const coreServices = [
  { img: svcSoil, title: "Soil, Water & Sunlight Checkup", desc: "Complete plant health assessment to ensure ideal growing conditions.", icon: Droplets },
  { img: svcRepotting, title: "Repotting & Transplanting", desc: "Safe shifting of plants into new pots with proper root protection.", icon: Sprout },
  { img: svcPruning, title: "Professional Cutting & Shaping", desc: "Expert trimming and styling to keep your plants lush and beautiful.", icon: Scissors },
  { img: svcNutrients, title: "Nutrient Management", desc: "Natural nutrition for stronger, greener plants at every growth stage.", icon: Leaf },
  { img: servicePest, title: "Pest & Disease Control", desc: "Eco-friendly treatment to protect plants from insects, diseases, and fungus.", icon: Bug },
  { img: svcSetup, title: "Plants Setup & Green Décor", desc: "We arrange your plants and enhance your space with beautiful greenery.", icon: TreePine },
];

const addOnServices = [
  { img: svcKitchen, title: "Home Kitchen Vegetable Garden", desc: "Setup & care — eat what you grow. Fresh herbs and veggies from your balcony." },
  { img: svcVertical, title: "Vertical Garden — Installation & Care", desc: "Transform walls into living green spaces with professional vertical setups." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-2">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Premium Indoor & Outdoor Plant Care
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-20 max-w-2xl mx-auto font-medium leading-relaxed">
          From soil health to styling — we handle every aspect of your garden with expert, science-backed care.
        </p>

        {/* Core Services — Premium card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-28">
          {coreServices.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-[0_4px_24px_-6px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.18)] hover:-translate-y-1.5 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add-On Services */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-red mb-2">Explore More</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Green Add-On Services
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
          Go beyond regular maintenance — kitchen gardens, vertical gardens, and more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {addOnServices.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl overflow-hidden shadow-[0_4px_24px_-6px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.18)] transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mb-2">{s.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
