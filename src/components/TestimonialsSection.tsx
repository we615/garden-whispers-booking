const testimonials = [
  {
    name: "Priya M.",
    location: "Pune",
    text: "EcoBloom transformed my terrace into a beautiful garden! Their team is knowledgeable and truly cares about every plant.",
  },
  {
    name: "Rahul S.",
    location: "Mumbai",
    text: "I was clueless about plant care. EcoBloom not only saved my dying plants but made my balcony look like a Ghibli movie scene!",
  },
  {
    name: "Anita D.",
    location: "Pune",
    text: "Professional, punctual, and passionate about plants. The monthly care plan is worth every rupee. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Testimonials</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            What our clients say 💚
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
              <p className="text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
