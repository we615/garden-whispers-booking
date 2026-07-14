import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUploadField } from "@/components/ImageUploadField";
import { api, ApiRequestError } from "@/lib/api";
import type { FieldConfig, ResourceConfig } from "@/lib/resourceConfig";
import { toast } from "@/components/ui/sonner";

type Doc = Record<string, unknown> & { _id: string; isActive?: boolean; order?: number };

function getFieldValue(doc: Doc, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined), doc);
}

function emptyFormState(fields: FieldConfig[]): Record<string, unknown> {
  const state: Record<string, unknown> = { order: 0, isActive: true };
  for (const field of fields) {
    state[field.name] = field.type === "boolean" ? false : field.type === "number" ? 0 : "";
  }
  return state;
}

export function ResourceCrudPage({ config }: { config: ResourceConfig }) {
  const queryClient = useQueryClient();
  const listKey = ["admin", config.resourcePath];
  const { data, isLoading } = useQuery<Doc[]>({
    queryKey: listKey,
    queryFn: () => api.get(`/admin/${config.resourcePath}?includeInactive=true`),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Record<string, unknown>>(() => emptyFormState(config.fields));

  const saveMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (editingId) return api.put(`/admin/${config.resourcePath}/${editingId}`, payload);
      return api.post(`/admin/${config.resourcePath}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      toast.success(editingId ? "Updated" : "Created");
      setDialogOpen(false);
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/${config.resourcePath}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listKey });
      toast.success("Deleted");
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Delete failed"),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      api.put(`/admin/${config.resourcePath}/${id}`, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: listKey }),
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Update failed"),
  });

  function openCreate() {
    setEditingId(null);
    setFormState(emptyFormState(config.fields));
    setDialogOpen(true);
  }

  function openEdit(doc: Doc) {
    setEditingId(doc._id);
    const state: Record<string, unknown> = { order: doc.order ?? 0, isActive: doc.isActive ?? true };
    for (const field of config.fields) state[field.name] = doc[field.name] ?? (field.type === "boolean" ? false : "");
    setFormState(state);
    setDialogOpen(true);
  }

  function handleSubmit() {
    // An unselected optional <select> is "" in form state, which fails enum validation on the
    // backend (e.g. Service.imageFit) — omit those so the schema's own default applies instead.
    const payload = { ...formState };
    for (const field of config.fields) {
      if (field.type === "select" && !field.required && payload[field.name] === "") {
        delete payload[field.name];
      }
    }
    saveMutation.mutate(payload);
  }

  const rows = [...(data ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{config.title}</h1>
          {config.description && <p className="text-sm text-muted-foreground mt-1">{config.description}</p>}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-1.5 size-4" />
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? `Edit ${config.title}` : `New ${config.title}`}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {config.fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-destructive"> *</span>}
                  </Label>
                  {field.type === "text" && (
                    <Input
                      id={field.name}
                      value={(formState[field.name] as string) ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.name]: e.target.value }))}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.name}
                      rows={3}
                      value={(formState[field.name] as string) ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.name]: e.target.value }))}
                    />
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.name}
                      type="number"
                      value={(formState[field.name] as number) ?? 0}
                      onChange={(e) => setFormState((s) => ({ ...s, [field.name]: Number(e.target.value) }))}
                    />
                  )}
                  {field.type === "boolean" && (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={field.name}
                        checked={Boolean(formState[field.name])}
                        onCheckedChange={(checked) => setFormState((s) => ({ ...s, [field.name]: Boolean(checked) }))}
                      />
                      <span className="text-sm text-muted-foreground">{field.helpText}</span>
                    </div>
                  )}
                  {field.type === "select" && (
                    <Select
                      value={(formState[field.name] as string) ?? ""}
                      onValueChange={(v) => setFormState((s) => ({ ...s, [field.name]: v }))}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {(field.type === "image" || field.type === "video") && (
                    <ImageUploadField
                      kind={field.type}
                      value={(formState[field.name] as string) ?? ""}
                      onChange={(url) => setFormState((s) => ({ ...s, [field.name]: url }))}
                    />
                  )}
                  {field.helpText && field.type !== "boolean" && (
                    <p className="text-xs text-muted-foreground">{field.helpText}</p>
                  )}
                </div>
              ))}
              <div className="space-y-1.5">
                <Label htmlFor="order">Display order</Label>
                <Input
                  id="order"
                  type="number"
                  value={(formState.order as number) ?? 0}
                  onChange={(e) => setFormState((s) => ({ ...s, order: Number(e.target.value) }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              {config.columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={config.columns.length + 3} className="text-center text-muted-foreground py-8">
                  Loading…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={config.columns.length + 3} className="text-center text-muted-foreground py-8">
                  No items yet — click "New" to add one.
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="text-muted-foreground">
                  <GripVertical className="size-4" />
                </TableCell>
                {config.columns.map((col) => (
                  <TableCell key={col.key} className="max-w-[240px] truncate">
                    {String(getFieldValue(row, col.key) ?? "—")}
                  </TableCell>
                ))}
                <TableCell>
                  <button
                    type="button"
                    onClick={() => toggleActiveMutation.mutate({ id: row._id, isActive: !row.isActive })}
                  >
                    <Badge variant={row.isActive ? "default" : "secondary"}>
                      {row.isActive ? "Active" : "Hidden"}
                    </Badge>
                  </button>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Delete this item? This cannot be undone.")) deleteMutation.mutate(row._id);
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
    </div>
  );
}
