import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";

interface Order {
  _id: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed" | "refunded";
  receiptNumber: string;
  createdAt: string;
  pricingPlanId: {
    plantCount: number;
    durationLabel: string;
  } | null;
}

const statusVariant: Record<Order["status"], "default" | "secondary" | "destructive" | "outline"> = {
  created: "outline",
  paid: "default",
  failed: "destructive",
  refunded: "secondary",
};

const formatPrice = (paise: number) => "₹" + Math.round(paise / 100).toLocaleString("en-IN");

const AccountOrders = () => {
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: () => api.get<Order[]>("/me/orders"),
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <Button asChild variant="ghost" className="mb-6 -ml-3">
          <Link to="/account">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to account
          </Link>
        </Button>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">My Orders</h1>

        {isLoading && <p className="text-muted-foreground">Loading…</p>}

        {!isLoading && !orders?.length && (
          <div className="bg-card rounded-2xl border border-border p-8 text-center text-muted-foreground">
            You haven't purchased a plan yet. Head to the{" "}
            <Link to="/?scrollTo=pricing" className="text-primary font-semibold">
              pricing calculator
            </Link>{" "}
            to subscribe.
          </div>
        )}

        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order._id} className="bg-card rounded-2xl border border-border p-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-display font-bold text-foreground">
                  {order.pricingPlanId
                    ? `${order.pricingPlanId.durationLabel} — up to ${order.pricingPlanId.plantCount} plants`
                    : "Plan no longer available"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Receipt {order.receiptNumber} •{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-lg text-foreground">{formatPrice(order.amount)}</p>
                <Badge variant={statusVariant[order.status]} className="mt-1">
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountOrders;
