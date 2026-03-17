import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-base tracking-widest uppercase text-primary-foreground/60 mb-2 font-medium">
          Let our experts help you choose the right plan for your garden.
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-8">
          Not Sure Where to Begin?
        </h2>
        <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
          <a href="#booking">Talk to Our Care Team</a>
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
