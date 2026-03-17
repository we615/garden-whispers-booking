const services = [
  { icon: "🌿", title: "Monthly Care", desc: "Regular visits to water, prune, fertilize and monitor your plants for optimal health." },
  { icon: "📅", title: "Annual Care Plans", desc: "Year-round garden management with seasonal adjustments and premium care." },
  { icon: "🎨", title: "Garden Design", desc: "Custom landscape design to transform your space into a green paradise." },
  { icon: "🐛", title: "Pest Control", desc: "100% organic pest management to keep your plants safe and thriving." },
  { icon: "🪴", title: "Repotting", desc: "Expert repotting with the right soil mix for each plant species." },
  { icon: "🧪", title: "Nutrient Management", desc: "Tailored fertilization schedules for healthy, lush growth." },
  { icon: "🌱", title: "Plant Setup", desc: "Complete indoor & outdoor plant installation with expert placement advice." },
  { icon: "🏡", title: "Custom Green Décor", desc: "Green walls, terrace gardens, balcony makeovers and decorative planting." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Everything your garden needs 🌸
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-border/50"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
