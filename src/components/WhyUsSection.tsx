import whyExpert from "@/assets/team-repotting.png";
import whyPersonalized from "@/assets/why-personalized.jpg";
import whyHealthy from "@/assets/why-healthy.jpg";
import whyOrganic from "@/assets/team-spraying.png";
import whyWeekly from "@/assets/team-pruning.png";
import whyAddon from "@/assets/why-addon.jpg";

const reasons = [
  { img: whyExpert, title: "Expert Professional Plant Care", desc: "We understand plant nutrition, watering cycles, soil health, and pest prevention scientifically. All our caretakers are trained professionals." },
  { img: whyPersonalized, title: "Personalized Care Plans", desc: "Every balcony, home, or office has a different environment. We design care based on sunlight, humidity, and plant type." },
  { img: whyHealthy, title: "Healthy & Aesthetic Growth", desc: "We focus on both beauty and long-term plant health — not just maintenance, but real, lasting growth." },
  { img: whyOrganic, title: "100% Organic Solutions", desc: "No harmful chemicals. We use organic nutrition, safe pest control, and premium pruning tools." },
  { img: whyWeekly, title: "Regular Weekly Visits & Monitoring", desc: "We do weekly visits to track growth, spot early issues, and give progress updates." },
  { img: whyAddon, title: "Customized Add-On Services", desc: "Kitchen garden setup, vertical gardens, hydroponics, terrariums, kokedama, and all other green décor needs." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-red mb-2">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)] hover:shadow-[0_8px_30px_-4px_hsl(var(--foreground)/0.2)] hover:-translate-y-1 transition-all duration-500 bg-card border border-border"
            >
              <div className="aspect-[3/3] overflow-hidden">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-1.5">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
