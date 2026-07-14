import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePricingPlans, type PricingPlan } from "@/hooks/usePricingPlans";
import { useAuth } from "@/context/AuthContext";
import { api, ApiRequestError } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";

// Used only if the API has no pricing plans yet (e.g. API unreachable) — converted into the
// same flat PricingPlan shape the rest of this component works with. No "Subscribe & Pay" button
// is shown for these since they have no real backend record to create a payment order against.
const fallbackPlans: PricingPlan[] = (() => {
  const pricingData: Record<number, { monthly: number; threeMonth: number; sixMonth: number; yearly: number }> = {
    10: { monthly: 1200, threeMonth: 3240, sixMonth: 6000, yearly: 11040 },
    20: { monthly: 2400, threeMonth: 6480, sixMonth: 12000, yearly: 21120 },
    30: { monthly: 3600, threeMonth: 9720, sixMonth: 18000, yearly: 31680 },
    40: { monthly: 4800, threeMonth: 12480, sixMonth: 24000, yearly: 40320 },
    50: { monthly: 6000, threeMonth: 15600, sixMonth: 27600, yearly: 50400 },
    75: { monthly: 7800, threeMonth: 22500, sixMonth: 41400, yearly: 72000 },
    100: { monthly: 10400, threeMonth: 30000, sixMonth: 55200, yearly: 96000 },
  };
  const plans: PricingPlan[] = [];
  for (const [plantCountStr, d] of Object.entries(pricingData)) {
    const plantCount = Number(plantCountStr);
    const savingsYear = Math.round(((d.monthly * 12 - d.yearly) / (d.monthly * 12)) * 100);
    plans.push(
      { _id: `${plantCount}-1m`, plantCount, durationLabel: "1 Month", durationMonths: 1, totalPrice: d.monthly * 100, freeVisits: 0, description: "Weekly 1 plant care visit • Health checkup, pruning, fertilizing & pest control", isBestValue: false },
      { _id: `${plantCount}-3m`, plantCount, durationLabel: "3 Months", durationMonths: 3, totalPrice: d.threeMonth * 100, badgeText: "10% Off", freeVisits: 0, description: "Weekly 1 visit • Soil treatment, repotting & seasonal care included", isBestValue: false },
      { _id: `${plantCount}-6m`, plantCount, durationLabel: "6 Months", durationMonths: 6, totalPrice: d.sixMonth * 100, badgeText: "Save More", freeVisits: 1, description: "Weekly 1 visit • Complete garden maintenance, new plant guidance & 1 free bonus visit", isBestValue: false },
      { _id: `${plantCount}-1y`, plantCount, durationLabel: "1 Year", durationMonths: 12, totalPrice: d.yearly * 100, badgeText: `${savingsYear}% Off`, freeVisits: 4, description: "Weekly 1 visit • Full care cycle, seasonal planning, repotting & 4 free bonus visits", isBestValue: true }
    );
  }
  return plans;
})();

const formatPrice = (paise: number) => "₹" + Math.round(paise / 100).toLocaleString("en-IN");

const PricingSection = () => {
  const { data } = usePricingPlans();
  const isLiveData = Boolean(data?.length);
  const plans = data?.length ? data : fallbackPlans;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [payingPlanId, setPayingPlanId] = useState<string | null>(null);

  const tiers = useMemo(() => [...new Set(plans.map((p) => p.plantCount))].sort((a, b) => a - b), [plans]);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const activeTier = selectedTier ?? tiers[0] ?? 10;

  const tierPlans = useMemo(
    () => plans.filter((p) => p.plantCount === activeTier).sort((a, b) => a.durationMonths - b.durationMonths),
    [plans, activeTier]
  );

  const durationColumns = useMemo(() => {
    const seen = new Map<number, string>();
    for (const p of plans) if (!seen.has(p.durationMonths)) seen.set(p.durationMonths, p.durationLabel);
    return [...seen.entries()].sort((a, b) => a[0] - b[0]);
  }, [plans]);

  async function handleSubscribe(plan: PricingPlan) {
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent("/?scrollTo=pricing"));
      return;
    }
    setPayingPlanId(plan._id);
    try {
      const order = await api.post<{ razorpayOrderId: string; amount: number; currency: string; keyId: string }>(
        "/orders/razorpay",
        { pricingPlanId: plan._id }
      );
      await openRazorpayCheckout({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "EcoBloom Plant Care",
        description: `${plan.durationLabel} plan — up to ${plan.plantCount} plants`,
        order_id: order.razorpayOrderId,
        prefill: { name: user.name, email: user.email, contact: user.phone },
        theme: { color: "#1f5c3a" },
        handler: async (response) => {
          try {
            await api.post("/orders/razorpay/verify", response);
            toast.success("Payment successful! Redirecting to your orders…");
            navigate("/account/orders");
          } catch (err) {
            toast.error(err instanceof ApiRequestError ? err.message : "Payment verification failed");
          } finally {
            setPayingPlanId(null);
          }
        },
        modal: { ondismiss: () => setPayingPlanId(null) },
      });
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : "Couldn't start checkout. Please try again.");
      setPayingPlanId(null);
    }
  }

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
          {tiers.map((count) => (
            <button
              key={count}
              onClick={() => setSelectedTier(count)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                activeTier === count
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
          {tierPlans.map((plan) => {
            const perMonth = Math.round(plan.totalPrice / plan.durationMonths);
            return (
              <div
                key={plan._id}
                className={cn(
                  "relative bg-card rounded-lg p-6 border transition-all hover:-translate-y-1",
                  plan.isBestValue
                    ? "border-accent shadow-lg ring-2 ring-accent/20"
                    : "border-border/50 shadow-sm hover:shadow-md"
                )}
              >
                {plan.isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Best Value ✨
                  </div>
                )}
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{plan.durationLabel}</h3>
                {plan.badgeText && !plan.isBestValue && (
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                    {plan.badgeText}
                  </span>
                )}
                <div className="mt-4 mb-1">
                  <span className="font-mono text-3xl font-bold text-foreground">{formatPrice(perMonth)}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Total: <span className="font-mono font-semibold">{formatPrice(plan.totalPrice)}</span>
                </p>
                {plan.freeVisits > 0 && (
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full mb-2">
                    🎁 {plan.freeVisits} Free Visit{plan.freeVisits > 1 ? "s" : ""}
                  </span>
                )}
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{plan.description}</p>
                {isLiveData && (
                  <Button
                    className="w-full mt-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                    disabled={payingPlanId === plan._id}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {payingPlanId === plan._id ? "Opening checkout…" : "Subscribe & Pay"}
                  </Button>
                )}
              </div>
            );
          })}
          {tierPlans.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">No plans available for this tier yet.</p>
          )}
        </div>

        {/* Full table for desktop */}
        <div className="mt-16 hidden md:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-display font-semibold text-foreground">Plants</th>
                {durationColumns.map(([months, label]) => (
                  <th key={months} className="text-right py-3 px-4 font-display font-semibold text-foreground">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiers.map((count) => {
                const rowPlans = plans.filter((p) => p.plantCount === count);
                return (
                  <tr
                    key={count}
                    className={cn(
                      "border-b border-border/50 transition-colors",
                      count === activeTier ? "bg-accent/10" : "hover:bg-muted/50"
                    )}
                  >
                    <td className="py-3 px-4 font-semibold">Up to {count}</td>
                    {durationColumns.map(([months]) => {
                      const plan = rowPlans.find((p) => p.durationMonths === months);
                      return (
                        <td
                          key={months}
                          className={cn(
                            "py-3 px-4 text-right font-mono",
                            plan?.isBestValue && "font-semibold text-primary"
                          )}
                        >
                          {plan ? formatPrice(plan.totalPrice) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Prices and bonuses are set by the EcoBloom team and may vary by plan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
