import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import { ICON_OPTIONS, type ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "how-it-works",
  title: "How It Works",
  description: "The 3-step explainer on the homepage.",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "iconName", label: "Icon", type: "select", options: ICON_OPTIONS, required: true },
  ],
  columns: [{ key: "title", label: "Title" }],
};

export default function HowItWorks() {
  return <ResourceCrudPage config={config} />;
}
