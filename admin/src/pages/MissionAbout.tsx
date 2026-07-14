import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { api, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";
import { ICON_OPTIONS } from "@/lib/resourceConfig";
import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import type { ResourceConfig } from "@/lib/resourceConfig";

interface AboutValue {
  title: string;
  description: string;
  iconName: string;
}

interface AboutContent {
  heroHeading: string;
  heroSubtext: string;
  storyParagraphs: string[];
  values: AboutValue[];
  visionQuote: string;
  visionTagline: string;
  missionIntro: string;
}

const empty: AboutContent = {
  heroHeading: "",
  heroSubtext: "",
  storyParagraphs: [],
  values: [],
  visionQuote: "",
  visionTagline: "",
  missionIntro: "",
};

const missionPillarConfig: ResourceConfig = {
  resourcePath: "mission-pillars",
  title: "Mission Pillars",
  description: "The 8 'What Drives Us' pillars shown on the About page.",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "iconName", label: "Icon", type: "select", options: ICON_OPTIONS, required: true },
  ],
  columns: [{ key: "title", label: "Title" }],
};

function AboutContentForm() {
  const queryClient = useQueryClient();
  const { data } = useQuery<AboutContent>({
    queryKey: ["admin", "about"],
    queryFn: () => api.get("/admin/about"),
  });
  const [form, setForm] = useState<AboutContent>(empty);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: AboutContent) => api.put("/admin/about", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "about"] });
      toast.success("About page updated");
    },
    onError: (err) => toast.error(err instanceof ApiRequestError ? err.message : "Save failed"),
  });

  function updateValue(index: number, patch: Partial<AboutValue>) {
    setForm((s) => ({ ...s, values: s.values.map((v, i) => (i === index ? { ...v, ...patch } : v)) }));
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="space-y-1.5">
        <Label>Hero heading</Label>
        <Input value={form.heroHeading} onChange={(e) => setForm((s) => ({ ...s, heroHeading: e.target.value }))} />
      </div>
      <div className="space-y-1.5">
        <Label>Hero subtext</Label>
        <Textarea
          rows={2}
          value={form.heroSubtext}
          onChange={(e) => setForm((s) => ({ ...s, heroSubtext: e.target.value }))}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Story paragraphs (one per line)</Label>
        <Textarea
          rows={5}
          value={form.storyParagraphs.join("\n")}
          onChange={(e) =>
            setForm((s) => ({ ...s, storyParagraphs: e.target.value.split("\n").filter((p) => p.trim()) }))
          }
        />
      </div>
      <div className="space-y-1.5">
        <Label>Mission intro</Label>
        <Textarea
          rows={3}
          value={form.missionIntro}
          onChange={(e) => setForm((s) => ({ ...s, missionIntro: e.target.value }))}
        />
      </div>
      <div className="space-y-1.5">
        <Label>Vision quote</Label>
        <Input value={form.visionQuote} onChange={(e) => setForm((s) => ({ ...s, visionQuote: e.target.value }))} />
      </div>
      <div className="space-y-1.5">
        <Label>Vision tagline</Label>
        <Input
          value={form.visionTagline}
          onChange={(e) => setForm((s) => ({ ...s, visionTagline: e.target.value }))}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>"What We Stand For" values</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setForm((s) => ({ ...s, values: [...s.values, { title: "", description: "", iconName: "Leaf" }] }))}
          >
            <Plus className="mr-1.5 size-3.5" />
            Add value
          </Button>
        </div>
        {form.values.map((value, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-start rounded-lg border border-border p-3">
            <div className="space-y-2">
              <Input
                placeholder="Title"
                value={value.title}
                onChange={(e) => updateValue(i, { title: e.target.value })}
              />
              <Select value={value.iconName} onValueChange={(v) => updateValue(i, { iconName: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Icon" />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              rows={3}
              placeholder="Description"
              value={value.description}
              onChange={(e) => updateValue(i, { description: e.target.value })}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setForm((s) => ({ ...s, values: s.values.filter((_, idx) => idx !== i) }))}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
        {saveMutation.isPending ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}

export default function MissionAbout() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">About Page</h1>
        <p className="text-sm text-muted-foreground mb-6">Story, values, and mission/vision content.</p>
        <AboutContentForm />
      </div>
      <ResourceCrudPage config={missionPillarConfig} />
    </div>
  );
}
