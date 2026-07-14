import { GraduationCap, FlaskConical, Sprout, Clock, IndianRupee, Leaf } from "lucide-react";

const reasons = [
  { icon: GraduationCap, title: "Expert-Led Care", desc: "Founded by Agriculture graduates, every service is backed by real knowledge — not guesswork." },
  { icon: FlaskConical, title: "Scientific Plant Care", desc: "We diagnose plant issues at the root and use proven techniques for long-term health and growth." },
  { icon: Sprout, title: "Complete Care, All in One Place", desc: "From plant treatment to garden design and maintenance — everything your plants need, under one roof." },
  { icon: Clock, title: "Reliable & Timely Service", desc: "Quick response and scheduled visits to ensure your plants always get the care they need." },
  { icon: IndianRupee, title: "Affordable & Transparent Pricing", desc: "High-quality service without overcharging — clear and honest pricing." },
  { icon: Leaf, title: "Visible Results You Can See", desc: "Healthier plants, better growth, and greener spaces — real transformation, not just promises." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-red mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl p-7 bg-card border border-border shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)] hover:shadow-[0_8px_30px_-4px_hsl(var(--foreground)/0.18)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
