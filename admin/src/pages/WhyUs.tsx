import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import { ICON_OPTIONS, type ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "why-us",
  title: "Why Us",
  description: "The 'What Makes Us Different' reasons grid.",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "iconName", label: "Icon", type: "select", options: ICON_OPTIONS, required: true },
  ],
  columns: [{ key: "title", label: "Title" }],
};

export default function WhyUs() {
  return <ResourceCrudPage config={config} />;
}
