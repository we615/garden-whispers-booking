import teamPortrait from "@/assets/team-portrait.png";

const IntroSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pune's Trusted Plant Care Experts
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At EcoBloom, we transform struggling plants into healthy, thriving greens right at your home.
              </p>
              <p>
                We use scientific diagnosis and expert care to fix plant issues at the root — ensuring faster growth, better health, and long-lasting results.
              </p>
              <p>
                Founded by Agriculture graduates, we bring trusted plant care services across <strong className="text-foreground">PUNE</strong> and <strong className="text-foreground">PCMC</strong> — from balconies to complete garden spaces.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <img
              src={teamPortrait}
              alt="EcoBloom plant care professional"
              className="w-full max-w-sm mx-auto rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
