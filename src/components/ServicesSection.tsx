import { Droplets, Shovel, ArrowRightLeft, Scissors, Leaf, Bug, TreePine, Palette, Salad, Waves, Fence, Sprout, Lamp } from "lucide-react";

const coreServices = [
  {
    icon: Droplets,
    title: "Soil, Water & Sunlight Checkup",
    desc: "Complete plant health assessment to ensure ideal growing conditions for every plant in your space.",
  },
  {
    icon: Shovel,
    title: "Soil Operations",
    desc: "Soil loosening, aeration, and rejuvenation to improve soil strength and root growth.",
  },
  {
    icon: ArrowRightLeft,
    title: "Repotting & Transplanting",
    desc: "Safe shifting of plants into new pots with proper root protection and care.",
  },
  {
    icon: Scissors,
    title: "Professional Cutting & Shaping",
    desc: "Expert trimming and styling to keep your plants clean, lush, and aesthetically beautiful.",
  },
  {
    icon: Leaf,
    title: "Organic Nutrient Management",
    desc: "Natural organic nutrition for stronger, greener plants — step-by-step according to each growth stage.",
  },
  {
    icon: Bug,
    title: "Organic Pest & Disease Management",
    desc: "Eco-friendly treatment to protect your plants from insects, diseases, and fungus.",
  },
  {
    icon: TreePine,
    title: "Plants Setup & Arrangement",
    desc: "We place and arrange your plants according to their sunlight needs, benefits, and space requirements.",
  },
  {
    icon: Palette,
    title: "Customized Green Setup & Décor",
    desc: "Enhancing your space with beautiful greenery to make your home feel alive, fresh, and relaxing.",
  },
];

const addOnServices = [
  {
    icon: Salad,
    title: "Home Kitchen Vegetable Garden",
    desc: "Setup & care — eat what you grow. Fresh herbs and veggies from your own balcony.",
  },
  {
    icon: Waves,
    title: "Hydroponics Setup & Maintenance",
    desc: "Soil-free growing systems installed and maintained for modern urban homes.",
  },
  {
    icon: Fence,
    title: "Vertical Garden — Installation & Care",
    desc: "Transform walls into living green spaces with professional vertical garden setups.",
  },
  {
    icon: Sprout,
    title: "Vermicompost & Kids' Gardening Kits",
    desc: "Sustainable composting solutions and fun gardening kits designed for kids.",
  },
  {
    icon: Lamp,
    title: "Terrariums & HomeGreen Décor",
    desc: "Beautiful terrariums and other green décor items to bring nature indoors.",
  },
];

const ServiceCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
  <div className="bg-muted/40 rounded-xl px-7 py-8 border border-border shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_12px_40px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.08),0_20px_50px_-10px_hsl(var(--foreground)/0.12)] hover:-translate-y-0.5 transition-all duration-300">
    <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center mb-5">
      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
    </div>
    <h3 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-[0.08em] leading-snug">{title}</h3>
    <p className="text-base text-muted-foreground leading-relaxed font-medium">{desc}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Core Services */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Premium Indoor & Outdoor Plant Care
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
          From soil health to styling, we handle every aspect of your garden with expert, science-backed care — so your plants stay healthy and your space stays beautiful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {coreServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* Add-On Services */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Explore More</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Green Add-On Services
          </h2>
        </div>
        <p className="text-center text-muted-foreground text-base mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
          Go beyond regular maintenance with our specialized services — kitchen gardens, hydroponics, terrariums, and more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {addOnServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
