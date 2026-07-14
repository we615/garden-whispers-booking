import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import { ICON_OPTIONS, type ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "services",
  title: "Services",
  description: "Core plant-care services and add-on services shown on the Services section.",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "imageUrl", label: "Image", type: "image", required: true },
    { name: "iconName", label: "Icon", type: "select", options: ICON_OPTIONS, required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { value: "core", label: "Core service" },
        { value: "addon", label: "Add-on service" },
      ],
    },
    {
      name: "imageFit",
      label: "Image fit",
      type: "select",
      options: [
        { value: "cover", label: "Cover" },
        { value: "contain", label: "Contain" },
      ],
    },
    { name: "featured", label: "Featured", type: "boolean", helpText: "Highlight this add-on service" },
  ],
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
  ],
};

export default function Services() {
  return <ResourceCrudPage config={config} />;
}
