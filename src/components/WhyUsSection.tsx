const reasons = [
  { icon: "👨‍🌾", title: "Expert Horticulturists", desc: "Trained professionals who understand every plant's unique needs." },
  { icon: "📝", title: "Personalized Care Plans", desc: "Custom schedules tailored to your garden's species and environment." },
  { icon: "🌿", title: "100% Organic Solutions", desc: "We use only eco-friendly, organic products for pest control and nutrition." },
  { icon: "📊", title: "Weekly Monitoring", desc: "Regular health checks and progress reports for your garden." },
  { icon: "🌺", title: "Healthy & Aesthetic Growth", desc: "We care about both plant health and visual beauty." },
  { icon: "✨", title: "Customized Add-Ons", desc: "Garden décor, seasonal planting, terrace makeovers and more." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Why EcoBloom</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            What makes us different 🌟
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
