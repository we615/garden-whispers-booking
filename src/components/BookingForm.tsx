import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const serviceOptions = [
  { value: "maintenance", label: "🌿 Monthly Maintenance" },
  { value: "consultation", label: "📋 Consultation" },
  { value: "pest-control", label: "🐛 Pest Control" },
  { value: "garden-design", label: "🎨 Garden Design" },
];

const timeSlots = [
  "Morning (8 AM - 11 AM)",
  "Midday (11 AM - 2 PM)",
  "Afternoon (2 PM - 5 PM)",
  "Evening (5 PM - 7 PM)",
];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    plantCount: "",
    timeSlot: "",
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 1) return form.service !== "";
    if (step === 2) return form.name && form.phone && form.address && form.plantCount;
    if (step === 3) return form.timeSlot !== "";
    return false;
  };

  const handleSubmit = () => {
    const message = `🌿 *EcoBloom Booking Request*%0A%0A*Service:* ${form.service}%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email || "N/A"}%0A*Address:* ${form.address}%0A*Plant Count:* ${form.plantCount}%0A*Preferred Time:* ${form.timeSlot}`;
    window.open(`https://wa.me/919270993102?text=${message}`, "_blank");
  };

  return (
    <section id="booking" className="py-24 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Book a Visit</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Let's grow together 🌱
          </h2>
          <p className="text-muted-foreground text-base font-medium">Fill the form and we'll reach out via WhatsApp!</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {s}
              </div>
              {s < 3 && <div className={cn("w-12 h-0.5", step > s ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg border border-border/50 shadow-sm p-6 sm:p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">What do you need?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("service", opt.label)}
                    className={cn(
                      "p-4 rounded-lg border text-left text-sm font-medium transition-all",
                      form.service === opt.label
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Tell us about your garden</h3>
              <Input placeholder="Your Name *" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <Input placeholder="Phone Number *" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <Input placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <Input placeholder="Address *" value={form.address} onChange={(e) => update("address", e.target.value)} />
              <Input placeholder="Number of Plants *" type="number" value={form.plantCount} onChange={(e) => update("plantCount", e.target.value)} />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Preferred time for visit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => update("timeSlot", slot)}
                    className={cn(
                      "p-4 rounded-lg border text-sm font-medium transition-all",
                      form.timeSlot === slot
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" className="rounded-full" onClick={() => setStep(step - 1)}>
                ← Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                disabled={!canNext()}
                onClick={() => setStep(step + 1)}
              >
                Next →
              </Button>
            ) : (
              <Button
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                disabled={!canNext()}
                onClick={handleSubmit}
              >
                Send via WhatsApp 💬
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Or call us directly: <a href="tel:+919270993102" className="text-primary font-semibold">9270993102</a> / <a href="tel:+919322084283" className="text-primary font-semibold">9322084283</a>
        </p>
      </div>
    </section>
  );
};

export default BookingForm;
