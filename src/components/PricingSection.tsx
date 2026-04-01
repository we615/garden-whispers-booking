import { useState } from "react";
import { cn } from "@/lib/utils";

const plantOptions = [10, 20, 30, 40, 50, 75, 100];

const pricingData: Record<number, { monthly: number; threeMonth: number; sixMonth: number; yearly: number }> = {
  10:  { monthly: 1200,  threeMonth: 3240,  sixMonth: 6000,  yearly: 11040 },
  20:  { monthly: 2400,  threeMonth: 6480,  sixMonth: 12000, yearly: 21120 },
  30:  { monthly: 3600,  threeMonth: 9720,  sixMonth: 18000, yearly: 31680 },
  40:  { monthly: 4800,  threeMonth: 12480, sixMonth: 24000, yearly: 40320 },
  50:  { monthly: 6000,  threeMonth: 15600, sixMonth: 27600, yearly: 50400 },
  75:  { monthly: 7800,  threeMonth: 22500, sixMonth: 41400, yearly: 72000 },
  100: { monthly: 10400, threeMonth: 31200, sixMonth: 55200, yearly: 96000 },
};

const monthlyRates: Record<number, { threeMonth: number; sixMonth: number; yearly: number }> = {
  10:  { threeMonth: 1080, sixMonth: 1080, yearly: 920 },
  20:  { threeMonth: 2160, sixMonth: 2000, yearly: 1760 },
  30:  { threeMonth: 3240, sixMonth: 3000, yearly: 2640 },
  40:  { threeMonth: 4160, sixMonth: 4000, yearly: 3360 },
  50:  { threeMonth: 5200, sixMonth: 4600, yearly: 4200 },
  75:  { threeMonth: 7800, sixMonth: 6900, yearly: 6000 },
  100: { threeMonth: 10400, sixMonth: 9200, yearly: 8000 },
};

const formatPrice = (n: number) => "₹" + n.toLocaleString("en-IN");

const PricingSection = () => {
  const [plants, setPlants] = useState(10);

  const data = pricingData[plants];
  const rates = monthlyRates[plants];
  const savingsYear = Math.round(((data.monthly * 12 - data.yearly) / (data.monthly * 12)) * 100);

  const plans = [
    { label: "1 Month", total: data.monthly, perMonth: data.monthly, badge: null, freeVisits: null },
    { label: "3 Months", total: data.threeMonth, perMonth: rates.threeMonth, badge: "10% Off", freeVisits: null },
    { label: "6 Months", total: data.sixMonth, perMonth: rates.sixMonth, badge: "Save More", freeVisits: "1 Free Visit" },
    { label: "1 Year", total: data.yearly, perMonth: rates.yearly, badge: `${savingsYear}% Off`, freeVisits: "4 Free Visits", best: true },
  ];

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-2">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Garden Care Calculator 🌼
          </h2>
          <p className="text-muted-foreground">Select your plant count, choose a plan.</p>
        </div>

        {/* Plant count selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {plantOptions.map((count) => (
            <button
              key={count}
              onClick={() => setPlants(count)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                plants === count
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
            >
              Up to {count} plants
            </button>
          ))}
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.label}
              className={cn(
                "relative bg-card rounded-lg p-6 border transition-all hover:-translate-y-1",
                plan.best
                  ? "border-accent shadow-lg ring-2 ring-accent/20"
                  : "border-border/50 shadow-sm hover:shadow-md"
              )}
            >
              {plan.best && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Best Value ✨
                </div>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">{plan.label}</h3>
              {plan.badge && !plan.best && (
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                  {plan.badge}
                </span>
              )}
              <div className="mt-4 mb-1">
                <span className="font-mono text-3xl font-bold text-foreground">{formatPrice(plan.perMonth)}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Total: <span className="font-mono font-semibold">{formatPrice(plan.total)}</span>
              </p>
              {plan.freeVisits && (
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  🎁 {plan.freeVisits}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Full table for desktop */}
        <div className="mt-16 hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display font-semibold text-foreground">Plants</th>
                <th className="text-right py-3 px-4 font-display font-semibold text-foreground">1 Month</th>
                <th className="text-right py-3 px-4 font-display font-semibold text-foreground">3 Months</th>
                <th className="text-right py-3 px-4 font-display font-semibold text-foreground">6 Months</th>
                <th className="text-right py-3 px-4 font-display font-semibold text-foreground">1 Year</th>
              </tr>
            </thead>
            <tbody>
              {plantOptions.map((count) => {
                const d = pricingData[count];
                return (
                  <tr
                    key={count}
                    className={cn(
                      "border-b border-border/50 transition-colors",
                      count === plants ? "bg-accent/10" : "hover:bg-muted/50"
                    )}
                  >
                    <td className="py-3 px-4 font-semibold">Up to {count}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatPrice(d.monthly)}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatPrice(d.threeMonth)}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatPrice(d.sixMonth)}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-primary">{formatPrice(d.yearly)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            6-month plans include 1 free visit • 1-year plans include 4 free visits
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
