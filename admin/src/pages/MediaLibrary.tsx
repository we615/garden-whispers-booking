import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, API_BASE_URL, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface Media {
  _id: string;
  url: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
}

const assetOrigin = API_BASE_URL.replace(/\/api\/v1$/, "");

export default function MediaLibrary() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery<Media[]>({
    queryKey: ["admin", "media"],
    queryFn: () => api.get("/media"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/media/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      toast.success("Deleted");
    },
  });

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const isVideo = file.type.startsWith("video/");
      await api.upload(isVideo ? "/media/upload-video" : "/media/upload", formData);
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      toast.success("Uploaded");
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(`${assetOrigin}${url}`);
    toast.success("URL copied");
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every image/video uploaded from any content form ends up here too.
          </p>
        </div>
        <Button disabled={uploading} onClick={() => inputRef.current?.click()}>
          <Upload className="mr-1.5 size-4" />
          {uploading ? "Uploading…" : "Upload file"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/mp4"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
      </div>

      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {!isLoading && (data ?? []).length === 0 && <p className="text-muted-foreground">No uploads yet.</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {(data ?? []).map((item) => (
          <div key={item._id} className="rounded-xl border border-border bg-card p-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              {item.mimeType.startsWith("video/") ? (
                <video src={`${assetOrigin}${item.url}`} className="h-full w-full object-cover" muted />
              ) : (
                <img src={`${assetOrigin}${item.url}`} alt={item.originalName} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-2 truncate text-xs text-muted-foreground" title={item.originalName}>
              {item.originalName}
            </p>
            <div className="mt-1 flex gap-1">
              <Button variant="ghost" size="icon" className="size-7" onClick={() => copyUrl(item.url)}>
                <Copy className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => {
                  if (confirm("Delete this file?")) deleteMutation.mutate(item._id);
                }}
              >
                <Trash2 className="size-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
