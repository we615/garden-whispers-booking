import { Award, UserCheck, Users, FlaskConical, Handshake, Home } from "lucide-react";

const reasons = [
  { icon: Award, title: "Mentored By Senior Experts", desc: "We are guided by industry-leading horticulture experts, ensuring every garden benefits from deep expertise." },
  { icon: UserCheck, title: "Trained & In-House Gardeners", desc: "Every gardener is a trained, full-time EcoBloom professional — ensuring quality, consistency, and care you can rely on." },
  { icon: Users, title: "Guided By Expert Horticulturists", desc: "Our in-house horticulture specialists conduct plant health checks to keep your garden truly fit." },
  { icon: FlaskConical, title: "Science-Backed Materials & Methods", desc: "From soil blends to nutrients, we use only tested, high-quality, science-backed formulations to strengthen your plants." },
  { icon: Handshake, title: "Handpicked Partners For Plants & Pots", desc: "We curate reliable planters and pot partners so you can easily access healthy plants and long-lasting materials." },
  { icon: Home, title: "Design + Maintenance Under One Roof", desc: "From designing your garden to caring for it month after month — everything is handled seamlessly by the team." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            Why EcoBloom
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-muted/40 rounded-xl px-8 py-10 text-center border border-border/30 shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_12px_40px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.08),0_20px_50px_-10px_hsl(var(--foreground)/0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[13px] font-bold text-foreground mb-3 uppercase tracking-[0.12em] leading-snug">{r.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
