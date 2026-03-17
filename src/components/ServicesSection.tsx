import { Button } from "@/components/ui/button";
import serviceMonthly from "@/assets/service-monthly.jpg";
import serviceDesign from "@/assets/service-design.jpg";
import serviceRepotting from "@/assets/service-repotting.jpg";
import servicePest from "@/assets/service-pest.jpg";

const services = [
  {
    img: serviceMonthly,
    title: "Monthly Care",
    desc: "One-time visits for pruning, cleaning and plant revival.",
    cta: "View Plans",
    href: "#pricing",
  },
  {
    img: serviceRepotting,
    title: "Annual Care",
    desc: "Monthly maintenance to keep your garden healthy.",
    cta: "View Plans",
    href: "#pricing",
  },
  {
    img: serviceDesign,
    title: "Design Your Garden",
    desc: "One-time visits for pruning, cleaning and plant revival.",
    cta: "Connect Now",
    href: "#booking",
  },
  {
    img: servicePest,
    title: "Pest Control",
    desc: "100% organic pest management to keep plants safe.",
    cta: "Book Now",
    href: "#booking",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight uppercase">
            Your Garden. Our Care.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto mb-16">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2 uppercase tracking-wide">Designed for Urban Homes</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              EcoBloom is a plant care service designed for today's urban homes. We blend expert horticulture with warm, personalized care to create green spaces that feel calming, intentional, and uniquely yours.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2 uppercase tracking-wide">Flexible Care Plans</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you need steady monthly maintenance or a complete garden makeover, we help your plants stay healthy and your space stay beautiful all year. Our approach is simple: thoughtful design, consistent care, and clear guidance.
            </p>
          </div>
        </div>

        <p className="text-center text-muted-foreground italic text-sm mb-12 max-w-xl mx-auto">
          With EcoBloom, your balcony becomes more than a garden — it becomes your own little sanctuary, where nature grows closer, one sapling at a time.
        </p>

        {/* Service Cards — Sapplo style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <Button asChild variant="outline" size="sm" className="rounded-sm text-xs font-semibold uppercase tracking-wide">
                  <a href={s.href}>{s.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
