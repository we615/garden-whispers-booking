const reasons = [
  { icon: "🔬", title: "Mentored By Senior Experts", desc: "We are guided by industry-leading horticulture experts, ensuring every garden benefits from deep expertise." },
  { icon: "👨‍🌾", title: "Trained & In-House Gardeners", desc: "Every gardener is a trained, full-time EcoBloom professional — ensuring quality, consistency, and care you can rely on." },
  { icon: "🌿", title: "Guided By Expert Horticulturists", desc: "Our in-house horticulture specialists conduct plant health checks to keep your garden truly fit." },
  { icon: "📚", title: "Science-Backed Materials & Methods", desc: "From soil blends to nutrients, we use only tested, high-quality, science-backed formulations to strengthen your plants." },
  { icon: "🪴", title: "Handpicked Partners For Plants & Pots", desc: "We curate reliable planters and pot partners so you can easily access healthy plants and long-lasting materials." },
  { icon: "🏠", title: "Design + Maintenance Under One Roof", desc: "From designing your garden to caring for it month after month — everything is handled seamlessly by the team." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-tight">
            Why EcoBloom
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-card rounded-lg p-6 border border-border/50 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-2xl">
                {r.icon}
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
