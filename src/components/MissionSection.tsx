import valueHeart from "@/assets/value-heart.jpg";
import valueSimplicity from "@/assets/value-simplicity.jpg";
import valueConsistent from "@/assets/value-consistent.jpg";
import valueGardener from "@/assets/value-gardener.jpg";

const values = [
  { img: valueHeart, title: "Expertise With Heart", desc: "We combine horticulture expertise with genuine passion for plants." },
  { img: valueSimplicity, title: "Simplicity", desc: "Plant care shouldn't feel complex. We make expert plant care easy and accessible." },
  { img: valueConsistent, title: "Consistent Care", desc: "Great gardens aren't built in a day. We provide predictable, reliable garden care." },
  { img: valueGardener, title: "Upliftment Of Gardeners", desc: "We invest in our gardeners' skills, growth, and long-term wellbeing." },
];

const MissionSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em] mb-4">
            What 'EcoBloom' Means
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-2 leading-relaxed font-medium">
            EcoBloom is inspired by the quiet energy that keeps plants growing — the steady flow of nourishment, care, and intention.
          </p>
          <p className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-12">
            The flow of care that keeps your garden alive
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="group relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.12)] hover:shadow-[0_8px_30px_-4px_hsl(var(--foreground)/0.2)] transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={v.img}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide mb-2">{v.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
