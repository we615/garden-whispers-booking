import { UserCheck, ClipboardList, HeartPulse, Leaf, CalendarCheck, Puzzle } from "lucide-react";

const reasons = [
  {
    icon: UserCheck,
    title: "Expert Professional Plant Care",
    desc: "We understand plant nutrition, watering cycles, soil health, and pest prevention scientifically. All our plant caretakers are trained professionals.",
  },
  {
    icon: ClipboardList,
    title: "Personalized Care Plans",
    desc: "Every balcony, home, or office has a different environment. We design care based on sunlight, humidity, and plant type.",
  },
  {
    icon: HeartPulse,
    title: "Healthy & Aesthetic Growth",
    desc: "We focus on both beauty and long-term plant health — not just maintenance, but real, lasting growth.",
  },
  {
    icon: Leaf,
    title: "100% Organic Solutions",
    desc: "No harmful chemicals. We use organic nutrition, safe pest control, and premium pruning tools.",
  },
  {
    icon: CalendarCheck,
    title: "Regular Weekly Visits & Monitoring",
    desc: "We do weekly visits to your plants to track growth, spot early issues, and give progress updates.",
  },
  {
    icon: Puzzle,
    title: "Customized Add-On Services",
    desc: "Kitchen garden setup, vertical gardens, hydroponics, terrariums, kokedama, and all other green décor needs.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-muted/40 rounded-xl px-8 py-10 text-center border border-border shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_12px_40px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.08),0_20px_50px_-10px_hsl(var(--foreground)/0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-[0.1em] leading-snug">{r.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
