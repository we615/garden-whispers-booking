import { Heart, Sprout, CalendarCheck, TreePalm } from "lucide-react";
import gardenDecor from "@/assets/garden-decoration.png";

const values = [
  { icon: Heart, title: "Expertise With Heart", desc: "We combine horticulture expertise with genuine passion for plants." },
  { icon: Sprout, title: "Simplicity", desc: "Plant care shouldn't feel complex. We make expert plant care easy and accessible." },
  { icon: CalendarCheck, title: "Consistent Care", desc: "Great gardens aren't built in a day. We provide predictable, reliable garden care." },
  { icon: TreePalm, title: "Upliftment Of Gardeners", desc: "We invest in our gardeners' skills, growth, and long-term wellbeing." },
];

const MissionSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em] mb-4">
          What 'EcoBloom' Means
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-2 leading-relaxed font-medium">
          EcoBloom is inspired by the quiet energy that keeps plants growing — the steady flow of nourishment, care, and intention. It resonates to the gentle, ongoing attention your garden receives through every season.
        </p>
        <p className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-12">
          The flow of care that keeps your garden alive
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-muted/40 rounded-xl px-6 py-10 text-center border border-border shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),0_12px_40px_-8px_hsl(var(--foreground)/0.08)] hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.08),0_20px_50px_-10px_hsl(var(--foreground)/0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-[0.1em] leading-snug">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{v.desc}</p>
              </div>
            );
          })}
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
