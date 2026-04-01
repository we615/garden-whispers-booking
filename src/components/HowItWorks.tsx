import { ClipboardList, Compass, Flower2 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Schedule a Consultation",
    desc: "Schedule a consultation. We'll visit your property, assess your garden's needs, and discuss your preferences.",
  },
  {
    icon: Compass,
    title: "Get a Customized Plan",
    desc: "Based on the consultation, we'll create a customized garden maintenance plan tailored to your requirements.",
  },
  {
    icon: Flower2,
    title: "Enjoy a Beautiful Garden",
    desc: "Sit back and relax while our experts take care of all the maintenance, ensuring your garden stays beautiful and blooming.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-tight">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
