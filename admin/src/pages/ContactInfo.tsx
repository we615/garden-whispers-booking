import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface ContactInfo {
  whatsappNumbers: string[];
  phoneNumbers: string[];
  email: string;
  instagramUrl: string;
  address: string;
}

const empty: ContactInfo = { whatsappNumbers: [], phoneNumbers: [], email: "", instagramUrl: "", address: "" };

const toList = (csv: string) => csv.split(",").map((s) => s.trim()).filter(Boolean);

export default function ContactInfoPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<ContactInfo>({
    queryKey: ["admin", "contact-info"],
    queryFn: () => api.get("/admin/contact-info"),
  });

  const [form, setForm] = useState<ContactInfo>(empty);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: ContactInfo) => api.put("/admin/contact-info", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "contact-info"] });
      toast.success("Contact info updated");
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Save failed"),
  });

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Contact Info</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Used across the site: WhatsApp links, phone numbers, email, and Instagram. The first WhatsApp/phone
        number is treated as primary.
      </p>

      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label>WhatsApp numbers (comma-separated, first = primary)</Label>
          <Input
            value={form.whatsappNumbers.join(", ")}
            placeholder="919270993102, 919322084283"
            onChange={(e) => setForm((s) => ({ ...s, whatsappNumbers: toList(e.target.value) }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Phone numbers (comma-separated)</Label>
          <Input
            value={form.phoneNumbers.join(", ")}
            placeholder="9270993102, 9322084283"
            onChange={(e) => setForm((s) => ({ ...s, phoneNumbers: toList(e.target.value) }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Instagram URL</Label>
          <Input
            value={form.instagramUrl}
            onChange={(e) => setForm((s) => ({ ...s, instagramUrl: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Address</Label>
          <Input value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
        </div>
        <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
