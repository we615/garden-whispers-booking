import { Button } from "@/components/ui/button";
import { Home, Flower2, Wrench, Leaf, Salad, FlaskConical, TreePine, Heart } from "lucide-react";

const brandColors = [
  "bg-primary/10 text-primary",
  "bg-brand-red/10 text-brand-red",
  "bg-brand-blue/10 text-brand-blue",
  "bg-accent/15 text-accent",
];

const missions = [
  { icon: Home, title: "Greener & Healthier Spaces", desc: "Natural, eco-friendly homes and workplaces that feel fresh, calm, and full of life." },
  { icon: Flower2, title: "Relaxing & Aesthetic Balconies", desc: "Making every balcony beautiful and green, helping you feel refreshed and connected with nature." },
  { icon: Wrench, title: "Easy & Professional Plant Care", desc: "Reliable, scientific, and hassle-free plant maintenance for everyone." },
  { icon: Leaf, title: "Eco-Friendly & Natural Practices", desc: "Natural growth solutions that protect your plants, your home, and the planet." },
  { icon: Salad, title: "Grow What You Eat", desc: "Inspiring households to grow vegetables and herbs for a healthy, toxin-free lifestyle." },
  { icon: FlaskConical, title: "Scientific Green Aesthetics", desc: "Long-lasting beauty with expert plant selection, nutrient care, and pest safety." },
  { icon: TreePine, title: "Cleaner & Greener Cities", desc: "Helping cities breathe cleaner and live greener through sustainable urban gardening." },
  { icon: Heart, title: "Nature-First Lifestyle", desc: "Encouraging sustainability, wellness, and green living as a daily habit." },
];

const MissionSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        {/* CTA content block */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 mb-20 text-center">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
            Professional plant care and garden maintenance services across Pune and PCMC — driven by expertise, backed by passion.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
            We combine scientific plant care with thoughtful design to revive, protect, and elevate your green spaces — all under one roof.
          </p>
          <p className="font-display text-xl sm:text-2xl font-bold text-foreground mb-8">
            Create a space that feels alive, thriving, and beautifully green. 🌿
          </p>
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold shadow-lg px-8">
            <a href="#booking">👉 Book Your Expert Visit Today</a>
          </Button>
        </div>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-3">What Drives Us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.1em] mb-6">
              Our Mission<br />& Vision
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-medium mb-8">
              EcoBloom isn't just a plant service — we make your spaces bloom with life, health, and beauty. 
              We take complete responsibility for your plants so you enjoy greenery without stress.
            </p>
            <blockquote className="border-l-4 border-l-brand-red pl-5 py-2">
              <p className="font-display text-lg font-semibold text-foreground italic leading-relaxed">
                "We care today for a greener tomorrow"
              </p>
            </blockquote>
            <p className="font-display text-base font-semibold text-primary mt-6 tracking-wide">
              EcoBloom — Growing Green, Growing Smiles. 🌿
            </p>
          </div>

          <div className="space-y-4">
            {missions.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="flex gap-4 items-start bg-card/80 backdrop-blur-sm rounded-xl px-5 py-5 border border-border hover:border-primary/30 hover:bg-card transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg ${brandColors[i % brandColors.length]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
