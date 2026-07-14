import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface Booking {
  _id: string;
  serviceRequested: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  plantCount?: number;
  preferredTimeSlot: string;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  source: "website" | "admin";
  whatsappSent: boolean;
  notes: string;
  createdAt: string;
}

const STATUS_OPTIONS: Booking["status"][] = ["new", "contacted", "confirmed", "completed", "cancelled"];

const statusVariant: Record<Booking["status"], "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  contacted: "secondary",
  confirmed: "secondary",
  completed: "outline",
  cancelled: "destructive",
};

export default function Bookings() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState<Booking["status"]>("new");

  const { data, isLoading } = useQuery<{ items: Booking[]; total: number }>({
    queryKey: ["admin", "bookings", statusFilter],
    queryFn: () => api.get(`/bookings${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes: string }) =>
      api.patch(`/bookings/${id}/status`, { status, notes }).then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
      toast.success("Booking updated");
      setSelected(null);
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Update failed"),
  });

  function openBooking(b: Booking) {
    setSelected(b);
    setStatusDraft(b.status);
    setNotesDraft(b.notes ?? "");
  }

  const bookings = data?.items ?? [];

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every booking form submission — persisted alongside the WhatsApp handoff, guests included.
          </p>
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
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Loading…</TableCell>
              </TableRow>
            )}
            {!isLoading && bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No bookings yet.</TableCell>
              </TableRow>
            )}
            {bookings.map((b) => (
              <TableRow key={b._id} className="cursor-pointer" onClick={() => openBooking(b)}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{b.serviceRequested}</TableCell>
                <TableCell>{b.phone}</TableCell>
                <TableCell>{b.preferredTimeSlot}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <Row label="Service" value={selected.serviceRequested} />
                <Row label="Phone" value={selected.phone} />
                <Row label="Email" value={selected.email || "—"} />
                <Row label="Address" value={selected.address} />
                <Row label="Plant count" value={selected.plantCount?.toString() ?? "—"} />
                <Row label="Preferred time" value={selected.preferredTimeSlot} />
                <Row label="Source" value={selected.source} />
                <Row label="WhatsApp sent" value={selected.whatsappSent ? "Yes" : "No"} />

                <div className="space-y-1.5 pt-2">
                  <Label>Status</Label>
                  <Select value={statusDraft} onValueChange={(v) => setStatusDraft(v as Booking["status"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s[0].toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Internal notes</Label>
                  <Textarea rows={3} value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
                <Button
                  onClick={() => updateMutation.mutate({ id: selected._id, status: statusDraft, notes: notesDraft })}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving…" : "Save"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
