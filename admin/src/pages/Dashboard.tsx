import { useQuery } from "@tanstack/react-query";
import { Wrench, Tags, MessageSquareQuote, Building2, Inbox, Receipt } from "lucide-react";
import { api } from "@/lib/api";

function useContentCount(resourcePath: string) {
  return useQuery<unknown[]>({
    queryKey: ["admin", resourcePath, "count"],
    queryFn: () => api.get(`/admin/${resourcePath}?includeInactive=true`),
  });
}

function useNewBookingsCount() {
  return useQuery<{ total: number }>({
    queryKey: ["admin", "bookings", "new-count"],
    queryFn: () => api.get("/bookings?status=new"),
  });
}

function usePaidOrdersCount() {
  return useQuery<unknown[]>({
    queryKey: ["admin", "orders", "paid-count"],
    queryFn: () => api.get("/orders?status=paid"),
  });
}

const contentStats = [
  { path: "services", label: "Services", icon: Wrench },
  { path: "pricing-plans", label: "Pricing Plans", icon: Tags },
  { path: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { path: "clients", label: "Clients", icon: Building2 },
];

export default function Dashboard() {
  const { data: newBookings, isLoading: bookingsLoading } = useNewBookingsCount();
  const { data: paidOrders, isLoading: ordersLoading } = usePaidOrdersCount();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-6">A quick look at your site content.</p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <div className="rounded-xl border border-accent bg-card p-5">
          <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-accent/15">
            <Inbox className="size-4 text-accent" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {bookingsLoading ? "…" : (newBookings?.total ?? 0)}
          </p>
          <p className="text-sm text-muted-foreground">New Bookings</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <Receipt className="size-4 text-primary" />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {ordersLoading ? "…" : (paidOrders?.length ?? 0)}
          </p>
          <p className="text-sm text-muted-foreground">Paid Orders</p>
        </div>
        {contentStats.map((stat) => (
          <StatCard key={stat.path} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ path, label, icon: Icon }: { path: string; label: string; icon: typeof Wrench }) {
  const { data, isLoading } = useContentCount(path);
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>
      <p className="font-display text-2xl font-bold text-foreground">{isLoading ? "…" : (data?.length ?? 0)}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
