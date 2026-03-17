import { Home, Flower2, Wrench, Leaf, Salad, FlaskConical, TreePine, Heart } from "lucide-react";

const missions = [
  { icon: Home, title: "Greener & Healthier Spaces", desc: "To build natural, eco-friendly homes and workplaces that feel fresh, calm, and full of life." },
  { icon: Flower2, title: "Relaxing & Aesthetic Balconies", desc: "To make every balcony beautiful and green, helping you feel refreshed and connected with nature." },
  { icon: Wrench, title: "Easy & Professional Plant Care", desc: "To deliver reliable, scientific, and hassle-free plant maintenance for everyone." },
  { icon: Leaf, title: "Eco-Friendly & Organic Practices", desc: "To promote natural growth solutions that protect your plants, your home, and the planet." },
  { icon: Salad, title: "Grow What You Eat", desc: "To inspire households to grow vegetables and herbs for a healthy, toxin-free lifestyle." },
  { icon: FlaskConical, title: "Scientific Green Aesthetics", desc: "To create long-lasting beauty with expert plant selection, nutrient care, and pest safety." },
  { icon: TreePine, title: "Cleaner & Greener Cities", desc: "To help cities breathe cleaner and live greener through sustainable urban gardening." },
  { icon: Heart, title: "Nature-First Lifestyle", desc: "To encourage people to value sustainability, wellness, and green living as a daily habit." },
];

const MissionSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">What Drives Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em] mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed font-medium mb-2">
            EcoBloom isn't just a plant service — we make your spaces bloom with life, health, and beauty. We take complete responsibility for your plants so you enjoy greenery without stress.
          </p>
          <p className="font-display text-base font-semibold text-primary italic mb-12">
            "We care today for a greener tomorrow"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {missions.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="bg-card rounded-xl px-7 py-8 border border-border shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_12px_40px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.08),0_20px_50px_-10px_hsl(var(--foreground)/0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2 uppercase tracking-[0.08em] leading-snug">{m.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{m.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center font-display text-lg font-semibold text-foreground mt-14 tracking-wide">
          EcoBloom — Growing Green, Growing Smiles. 🌿
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
