const testimonials = [
  {
    name: "Shalmali Deshpande",
    time: "3 months ago",
    rating: 5,
    text: "So happy how my balcony garden has grown up by EcoBloom. They are so professional and have always connected and everything was well, timely cleaned. The team is friendly, efficient!",
    color: "bg-primary",
  },
  {
    name: "Hitesh Chithra",
    time: "1 month ago",
    rating: 5,
    text: "Really happy with my gardening experience. They have been very helpful and knowledgeable. The team took out a professional approach. I would highly recommend EcoBloom!",
    color: "bg-accent",
  },
  {
    name: "Kaushik Kochhar",
    time: "2 months ago",
    rating: 5,
    text: "Smart team, very passionate for what they do. Had a great knowledge. Quick response and professional. Highly recommended!",
    color: "bg-primary",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-tight">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${t.color} text-primary-foreground flex items-center justify-center font-display font-bold text-sm`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-accent text-xs">★</span>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{t.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
