import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import { AVATAR_COLOR_OPTIONS, type ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "testimonials",
  title: "Testimonials",
  description: "Customer reviews shown on the homepage.",
  fields: [
    { name: "customerName", label: "Customer name", type: "text", required: true },
    { name: "rating", label: "Rating (1-5)", type: "number", required: true },
    { name: "text", label: "Review text", type: "textarea", required: true },
    { name: "relativeTime", label: "Relative time", type: "text", placeholder: "3 months ago" },
    { name: "location", label: "Location", type: "text", placeholder: "Pune" },
    { name: "avatarColor", label: "Avatar color", type: "select", options: AVATAR_COLOR_OPTIONS },
  ],
  columns: [
    { key: "customerName", label: "Customer" },
    { key: "rating", label: "Rating" },
  ],
};

export default function Testimonials() {
  return <ResourceCrudPage config={config} />;
}
