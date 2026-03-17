const steps = [
  { num: "01", icon: "📋", title: "Tell Us About Your Garden", desc: "Share your plant count, space details & what you need." },
  { num: "02", icon: "📐", title: "We Plan the Care", desc: "Our horticulturists create a custom care schedule for your plants." },
  { num: "03", icon: "🌻", title: "We Take Care of It", desc: "Sit back while our team nurtures your garden to perfection." },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">How It Works</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Three simple steps 🍃
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <span className="font-mono text-xs font-semibold text-accent tracking-widest">{step.num}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
