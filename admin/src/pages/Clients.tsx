import { ResourceCrudPage } from "@/components/ResourceCrudPage";
import type { ResourceConfig } from "@/lib/resourceConfig";

const config: ResourceConfig = {
  resourcePath: "clients",
  title: "Clients",
  description: "B2B client logos shown in the 'Trusted By' strip.",
  fields: [
    { name: "name", label: "Client name", type: "text", required: true },
    { name: "logoUrl", label: "Logo", type: "image", required: true },
  ],
  columns: [{ key: "name", label: "Name" }],
};

export default function Clients() {
  return <ResourceCrudPage config={config} />;
}
