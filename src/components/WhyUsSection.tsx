import { UserCheck, ClipboardList, HeartPulse, Leaf, CalendarCheck, Puzzle } from "lucide-react";

const reasons = [
  { icon: UserCheck, title: "Expert Professional Plant Care", desc: "We understand plant nutrition, watering cycles, soil health, and pest prevention scientifically. All our caretakers are trained professionals." },
  { icon: ClipboardList, title: "Personalized Care Plans", desc: "Every balcony, home, or office has a different environment. We design care based on sunlight, humidity, and plant type." },
  { icon: HeartPulse, title: "Healthy & Aesthetic Growth", desc: "We focus on both beauty and long-term plant health — not just maintenance, but real, lasting growth." },
  { icon: Leaf, title: "100% Organic Solutions", desc: "No harmful chemicals. We use organic nutrition, safe pest control, and premium pruning tools." },
  { icon: CalendarCheck, title: "Regular Weekly Visits & Monitoring", desc: "We do weekly visits to track growth, spot early issues, and give progress updates." },
  { icon: Puzzle, title: "Customized Add-On Services", desc: "Kitchen garden setup, vertical gardens, hydroponics, terrariums, kokedama, and all other green décor needs." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            What Makes Us Different
          </h2>
        </div>

        {/* Horizontal cards with accent left border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="flex gap-5 items-start bg-card rounded-xl px-6 py-7 border-l-4 border-l-primary border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground mb-1.5 leading-snug">{r.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
