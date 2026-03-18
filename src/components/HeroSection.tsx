import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroReal1 from "@/assets/hero-real-1.jpg";
import heroReal2 from "@/assets/hero-real-2.jpg";
import heroGarden from "@/assets/hero-garden.jpg";
import teamSpraying from "@/assets/team-spraying.png";

const slides = [heroReal1, teamSpraying, heroGarden];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow */}
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
          We Make Your Space<br />Bloom 🌿
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl">
          Professional plant care & garden maintenance services in Pune. Founded by agriculture graduates, powered by passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold shadow-lg px-8">
            <a href="#booking">Book Free Visit</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white/10 text-base font-semibold px-8 bg-transparent">
            <a href="https://wa.me/919270993102" target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
