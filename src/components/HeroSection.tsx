import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-garden.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Ghibli-style magical garden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-24">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4 animate-fade-in-up">
          🌱 Expert Plant Care at Your Doorstep
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Your garden, tended with heart.
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Professional plant care, garden design & maintenance — starting at just ₹1,200/month. We make spaces bloom.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            <a href="#booking">Start Your Garden's Journey 🌻</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full text-base font-semibold hover:-translate-y-0.5 transition-all">
            <a href="#pricing">View Plans</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
