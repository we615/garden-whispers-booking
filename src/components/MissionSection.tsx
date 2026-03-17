import gardenDecor from "@/assets/garden-decoration.png";

const values = [
  { icon: "❤️", title: "Expertise With Heart", desc: "We combine horticulture expertise with genuine passion for plants.", color: "bg-accent/20" },
  { icon: "🌱", title: "Simplicity", desc: "Plant care shouldn't feel complex. We make expert plant care easy and accessible.", color: "bg-primary/10" },
  { icon: "📅", title: "Consistent Care", desc: "Great gardens aren't built in a day. We provide predictable, reliable garden care.", color: "bg-accent/20" },
  { icon: "🌿", title: "Upliftment Of Gardeners", desc: "We invest in our gardeners' skills, growth, and long-term wellbeing.", color: "bg-primary/10" },
];

const MissionSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-tight mb-4">
          What 'EcoBloom' Means
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-2 leading-relaxed">
          EcoBloom is inspired by the quiet energy that keeps plants growing — the steady flow of nourishment, care, and intention. It resonates to the gentle, ongoing attention your garden receives through every season.
        </p>
        <p className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-12">
          The flow of care that keeps your garden alive
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className={`${v.color} rounded-lg p-5 text-center`}>
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <img
          src={gardenDecor}
          alt="Decorative garden illustration"
          className="mx-auto mt-12 w-48 opacity-70 animate-float"
        />
      </div>
    </section>
  );
};

export default MissionSection;
