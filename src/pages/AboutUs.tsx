import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MissionSection from "@/components/MissionSection";
import { Leaf, Heart, Users, Target } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "We use 100% organic methods — no chemicals, no shortcuts. Just nature-friendly plant care that's good for your home and the planet.",
    iconClass: "text-primary",
  },
  {
    icon: Heart,
    title: "Passion for Plants",
    description: "Every leaf matters to us. Our team of trained gardeners treats your plants with the same love and attention as their own.",
    iconClass: "text-brand-red",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We believe in building a greener community, one balcony, terrace, and garden at a time across Pune.",
    iconClass: "text-brand-blue",
  },
  {
    icon: Target,
    title: "Personalized Approach",
    description: "No two gardens are the same. We create custom care plans tailored to your space, light, and lifestyle.",
    iconClass: "text-accent",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  const goToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/?scrollTo=booking");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base font-semibold tracking-widest uppercase text-accent mb-3">About Us</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            We're EcoBloom Plant Care
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Founded in Pune, EcoBloom is a passionate team of plant lovers and trained gardeners dedicated to bringing life, color, and fresh air into your home — the organic way.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              EcoBloom started with a simple idea — everyone deserves a thriving garden without the hassle. We noticed that busy homeowners in Pune loved having plants but struggled to keep them healthy.
            </p>
            <p>
              That's when we stepped in. With expert knowledge in organic plant care, soil health, pest management, and garden design, we created a complete end-to-end service that takes the stress out of gardening.
            </p>
            <p>
              Today, we care for hundreds of gardens across Pune, from cozy balcony setups to large terrace gardens. Our monthly maintenance plans, seasonal checkups, and green add-on services ensure your plants stay happy year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl border border-border p-8 hover:-translate-y-1 transition-transform duration-300">
                <v.icon className={`w-10 h-10 ${v.iconClass} mb-4`} />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <MissionSection />

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to go green?</h2>
          <p className="text-muted-foreground text-lg mb-8">Book a visit and let us transform your space into a living, breathing garden.</p>
          <a
            href="/#booking"
            onClick={goToBooking}
            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12 px-8 shadow-lg transition-colors"
          >
            Book a Visit 🌱
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
