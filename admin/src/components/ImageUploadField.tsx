import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, API_BASE_URL, ApiRequestError } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface UploadResponse {
  url: string;
}

export function ImageUploadField({
  value,
  onChange,
  kind = "image",
}: {
  value: string;
  onChange: (url: string) => void;
  kind?: "image" | "video";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const path = kind === "video" ? "/media/upload-video" : "/media/upload";
      const res = await api.upload<UploadResponse>(path, formData);
      onChange(res.url);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const previewSrc = value ? (value.startsWith("http") ? value : `${API_BASE_URL.replace(/\/api\/v1$/, "")}${value}`) : "";

  return (
    <div className="space-y-2">
      {value && kind === "image" && (
        <img src={previewSrc} alt="Preview" className="h-24 w-24 rounded-lg border border-border object-cover" />
      )}
      {value && kind === "video" && (
        <video src={previewSrc} className="h-24 w-40 rounded-lg border border-border object-cover" muted />
      )}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 size-4" />
          {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
        </Button>
        {value && <span className="truncate text-xs text-muted-foreground max-w-[200px]">{value}</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={kind === "video" ? "video/mp4" : "image/png,image/jpeg,image/webp,image/svg+xml"}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
