import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import type { ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "video-gallery",
  title: "Video Gallery",
  description: "Home and corporate showcase videos.",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "videoUrl", label: "Video (MP4)", type: "video", required: true },
    { name: "thumbnailUrl", label: "Thumbnail", type: "image" },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { value: "home", label: "Home" },
        { value: "corporate", label: "Corporate" },
      ],
    },
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ],
};

export default function VideoGallery() {
  return <ResourceCrudPage config={config} />;
}
