import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

const serviceOptions = [
  { value: "monthly-care", label: "🌿 Monthly Plant Care & Maintenance" },
  { value: "design-garden", label: "🎨 Design Your Garden" },
  { value: "consultation", label: "🪴 Plants Consultation" },
  { value: "visit-garden", label: "🏡 Visit My Garden Plants" },
  { value: "vertical-garden", label: "🌱 Vertical Garden Installation & Care" },
  { value: "kitchen-garden", label: "🥬 Kitchen Garden & Grow Vegetables" },
];

const timeSlots = [
  "Morning (8 AM – 11 AM)",
  "Midday (11 AM – 2 PM)",
  "Afternoon (2 PM – 5 PM)",
  "Evening (5 PM – 7 PM)",
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
    if (step === 2) return form.name.trim() && form.phone.trim() && form.address.trim() && form.plantCount.trim();
    if (step === 3) return form.timeSlot !== "";
    return false;
  };

  const handleSubmit = () => {
    // Persist the lead in the background — fire-and-forget so a backend hiccup never blocks or
    // slows down the WhatsApp handoff below, which remains the primary, always-working path.
    api
      .post("/bookings", {
        serviceRequested: form.service,
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        address: form.address,
        plantCount: Number(form.plantCount) || undefined,
        preferredTimeSlot: form.timeSlot,
      })
      .catch((err) => console.error("Booking persistence failed (WhatsApp handoff continues anyway):", err));

    const sanitize = (s: string) => encodeURIComponent(s.trim().slice(0, 200));
    const message = `🌿 *EcoBloom Booking Request*%0A%0A*Service:* ${sanitize(form.service)}%0A*Name:* ${sanitize(form.name)}%0A*Phone:* ${sanitize(form.phone)}%0A*Email:* ${sanitize(form.email || "N/A")}%0A*Address:* ${sanitize(form.address)}%0A*Plant Count:* ${sanitize(form.plantCount)}%0A*Preferred Time:* ${sanitize(form.timeSlot)}`;
    window.open(`https://wa.me/919270993102?text=${message}`, "_blank");
  };

  return (
    <section id="booking" className="py-28 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-base font-semibold tracking-widest uppercase text-brand-red mb-3">Book a Visit</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Let's grow together 🌱
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Fill the form and we'll reach out via WhatsApp!
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-base font-bold transition-all",
                  step >= s ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"
                )}
              >
                {s}
              </div>
              {s < 3 && <div className={cn("w-16 h-0.5 rounded-full", step > s ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.1)] p-8 sm:p-12">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">What do you need?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("service", opt.label)}
                    className={cn(
                      "p-5 rounded-xl border-2 text-left text-base font-semibold transition-all duration-300",
                      form.service === opt.label
                        ? "border-primary bg-primary/10 text-foreground shadow-md"
                        : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
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
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Tell us about your garden</h3>
              <Input className="h-14 text-base px-5 rounded-xl" placeholder="Your Name *" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} />
              <Input className="h-14 text-base px-5 rounded-xl" placeholder="Phone Number *" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={15} />
              <Input className="h-14 text-base px-5 rounded-xl" placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
              <Input className="h-14 text-base px-5 rounded-xl" placeholder="Address *" value={form.address} onChange={(e) => update("address", e.target.value)} maxLength={300} />
              <Input className="h-14 text-base px-5 rounded-xl" placeholder="Number of Plants *" type="number" value={form.plantCount} onChange={(e) => update("plantCount", e.target.value)} />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Preferred time for visit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => update("timeSlot", slot)}
                    className={cn(
                      "p-5 rounded-xl border-2 text-base font-semibold transition-all duration-300",
                      form.timeSlot === slot
                        ? "border-primary bg-primary/10 text-foreground shadow-md"
                        : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button variant="outline" className="rounded-full h-12 px-8 text-base font-semibold" onClick={() => setStep(step - 1)}>
                ← Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                className="rounded-full h-12 px-8 text-base bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg"
                disabled={!canNext()}
                onClick={() => setStep(step + 1)}
              >
                Next →
              </Button>
            ) : (
              <Button
                className="rounded-full h-12 px-8 text-base bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg"
                disabled={!canNext()}
                onClick={handleSubmit}
              >
                Send via WhatsApp 💬
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-base text-muted-foreground mt-6 font-medium">
          Or call us directly: <a href="tel:+919270993102" className="text-primary font-bold">9270993102</a> / <a href="tel:+919322084283" className="text-primary font-bold">9322084283</a>
        </p>
      </div>
    </section>
  );
};

export default BookingForm;
