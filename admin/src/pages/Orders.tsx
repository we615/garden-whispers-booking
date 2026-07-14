import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";

interface Order {
  _id: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed" | "refunded";
  receiptNumber: string;
  createdAt: string;
  customerId: { name: string; email: string; phone: string } | null;
  pricingPlanId: { plantCount: number; durationLabel: string } | null;
}

const STATUS_OPTIONS: Order["status"][] = ["created", "paid", "failed", "refunded"];

const statusVariant: Record<Order["status"], "default" | "secondary" | "destructive" | "outline"> = {
  created: "outline",
  paid: "default",
  failed: "destructive",
  refunded: "secondary",
};

const formatPrice = (paise: number) => "₹" + Math.round(paise / 100).toLocaleString("en-IN");

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["admin", "orders", statusFilter],
    queryFn: () => api.get(`/orders${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`),
  });

  const orders = data ?? [];

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Razorpay payments for pricing plan subscriptions.</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Loading…</TableCell>
              </TableRow>
            )}
            {!isLoading && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No orders yet.</TableCell>
              </TableRow>
            )}
            {orders.map((o) => (
              <TableRow key={o._id}>
                <TableCell>
                  <div className="font-medium">{o.customerId?.name ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">{o.customerId?.email}</div>
                </TableCell>
                <TableCell>
                  {o.pricingPlanId ? `${o.pricingPlanId.durationLabel} · up to ${o.pricingPlanId.plantCount} plants` : "—"}
                </TableCell>
                <TableCell className="font-mono">{formatPrice(o.amount)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{o.receiptNumber}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
