import gardenDecor from "@/assets/garden-decoration.png";

const MissionSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Our Mission</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8">
          We make spaces bloom 🌷
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
          <p>
            At EcoBloom Plant Care, we believe every space deserves a touch of green. Our mission is to bring
            expert horticultural care right to your doorstep — nurturing your plants with knowledge, dedication,
            and 100% organic practices.
          </p>
          <p>
            Whether it's a cozy balcony, a sprawling terrace, or an office lobby, we craft personalized care plans
            that keep your green companions healthy, vibrant, and beautiful — all year round.
          </p>
        </div>
        <img
          src={gardenDecor}
          alt="Decorative garden illustration"
          className="mx-auto mt-12 w-64 opacity-80 animate-float"
        />
      </div>
    </section>
  );
};

export default MissionSection;
