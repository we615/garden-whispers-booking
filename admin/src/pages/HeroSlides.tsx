import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import type { ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "hero-slides",
  title: "Hero Slides",
  description: "The rotating image carousel on the homepage hero section.",
  fields: [
    { name: "imageUrl", label: "Image", type: "image", required: true },
    { name: "imageAlt", label: "Alt text", type: "text", placeholder: "EcoBloom garden" },
  ],
  columns: [{ key: "imageAlt", label: "Alt text" }],
};

export default function HeroSlides() {
  return <ResourceCrudPage config={config} />;
}
