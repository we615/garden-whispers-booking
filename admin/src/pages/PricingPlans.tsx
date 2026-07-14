import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface PricingPlan {
  _id: string;
  plantCount: number;
  durationLabel: string;
  durationMonths: number;
  totalPrice: number; // paise
  badgeText?: string;
  freeVisits: number;
  description: string;
  isBestValue: boolean;
  isActive: boolean;
  order: number;
}

type FormState = {
  plantCount: number;
  durationLabel: string;
  durationMonths: number;
  totalPriceRupees: number;
  badgeText: string;
  freeVisits: number;
  description: string;
  isBestValue: boolean;
  isActive: boolean;
  order: number;
};

const emptyForm: FormState = {
  plantCount: 10,
  durationLabel: "1 Month",
  durationMonths: 1,
  totalPriceRupees: 0,
  badgeText: "",
  freeVisits: 0,
  description: "",
  isBestValue: false,
  isActive: true,
  order: 0,
};

const rupees = (paise: number) => `₹${(paise / 100).toLocaleString("en-IN")}`;

export default function PricingPlans() {
  const queryClient = useQueryClient();
  const listKey = ["admin", "pricing-plans"];
  const { data, isLoading } = useQuery<PricingPlan[]>({
    queryKey: listKey,
    queryFn: () => api.get("/admin/pricing-plans?includeInactive=true"),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const saveMutation = useMutation({
    mutationFn: async (state: FormState) => {
      const payload = {
        plantCount: state.plantCount,
        durationLabel: state.durationLabel,
        durationMonths: state.durationMonths,
        totalPrice: Math.round(state.totalPriceRupees * 100),
        badgeText: state.badgeText || undefined,
        freeVisits: state.freeVisits,
        description: state.description,
        isBestValue: state.isBestValue,
        isActive: state.isActive,
        order: state.order,
      };
      if (editingId) return api.put(`/admin/pricing-plans/${editingId}`, payload);
      return api.post("/admin/pricing-plans", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      toast.success(editingId ? "Plan updated" : "Plan created");
      setDialogOpen(false);
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/pricing-plans/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      toast.success("Plan deleted");
    },
  });

  function openCreate(plantCount?: number) {
    setEditingId(null);
    setForm({ ...emptyForm, plantCount: plantCount ?? emptyForm.plantCount });
    setDialogOpen(true);
  }

  function openEdit(plan: PricingPlan) {
    setEditingId(plan._id);
    setForm({
      plantCount: plan.plantCount,
      durationLabel: plan.durationLabel,
      durationMonths: plan.durationMonths,
      totalPriceRupees: plan.totalPrice / 100,
      badgeText: plan.badgeText ?? "",
      freeVisits: plan.freeVisits,
      description: plan.description,
      isBestValue: plan.isBestValue,
      isActive: plan.isActive,
      order: plan.order,
    });
    setDialogOpen(true);
  }

  const groups = new Map<number, PricingPlan[]>();
  for (const plan of data ?? []) {
    const list = groups.get(plan.plantCount) ?? [];
    list.push(plan);
    groups.set(plan.plantCount, list);
  }
  const sortedTiers = [...groups.keys()].sort((a, b) => a - b);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Pricing Plans</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create any plant-count tier and duration combination — nothing here is fixed.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openCreate()}>
              <Plus className="mr-1.5 size-4" />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Plan" : "New Plan"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Plant count tier</Label>
                  <Input
                    type="number"
                    value={form.plantCount}
                    onChange={(e) => setForm((s) => ({ ...s, plantCount: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Duration (months)</Label>
                  <Input
                    type="number"
                    value={form.durationMonths}
                    onChange={(e) => setForm((s) => ({ ...s, durationMonths: Number(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Duration label</Label>
                <Input
                  value={form.durationLabel}
                  placeholder="1 Month"
                  onChange={(e) => setForm((s) => ({ ...s, durationLabel: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Total price (₹)</Label>
                <Input
                  type="number"
                  value={form.totalPriceRupees}
                  onChange={(e) => setForm((s) => ({ ...s, totalPriceRupees: Number(e.target.value) }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Badge text</Label>
                  <Input
                    value={form.badgeText}
                    placeholder="10% Off"
                    onChange={(e) => setForm((s) => ({ ...s, badgeText: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Free visits</Label>
                  <Input
                    type="number"
                    value={form.freeVisits}
                    onChange={(e) => setForm((s) => ({ ...s, freeVisits: Number(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  rows={2}
                  value={form.description}
                  placeholder="Weekly 1 visit • Health checkup, pruning..."
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isBestValue"
                  checked={form.isBestValue}
                  onCheckedChange={(c) => setForm((s) => ({ ...s, isBestValue: Boolean(c) }))}
                />
                <Label htmlFor="isBestValue" className="font-normal">
                  Best Value (only one plan per tier can be flagged)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {!isLoading && sortedTiers.length === 0 && (
        <p className="text-muted-foreground">No pricing plans yet — click "New Plan" to add one.</p>
      )}

      <div className="space-y-8">
        {sortedTiers.map((tier) => (
          <div key={tier} className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-display font-semibold text-foreground">Up to {tier} plants</h2>
              <Button variant="outline" size="sm" onClick={() => openCreate(tier)}>
                <Plus className="mr-1.5 size-3.5" />
                Add plan to this tier
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Duration</TableHead>
                  <TableHead>Total price</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead>Free visits</TableHead>
                  <TableHead>Best value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups
                  .get(tier)!
                  .sort((a, b) => a.durationMonths - b.durationMonths)
                  .map((plan) => (
                    <TableRow key={plan._id}>
                      <TableCell>{plan.durationLabel}</TableCell>
                      <TableCell className="font-mono">{rupees(plan.totalPrice)}</TableCell>
                      <TableCell>{plan.badgeText ?? "—"}</TableCell>
                      <TableCell>{plan.freeVisits}</TableCell>
                      <TableCell>{plan.isBestValue ? <Badge>Best Value</Badge> : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={plan.isActive ? "default" : "secondary"}>
                          {plan.isActive ? "Active" : "Hidden"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(plan)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Delete this plan?")) deleteMutation.mutate(plan._id);
                          }}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}
