export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "image" | "video";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}

export interface ColumnConfig {
  key: string;
  label: string;
}

export interface ResourceConfig {
  resourcePath: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

export const ICON_OPTIONS: FieldOption[] = [
  "Droplets",
  "Sprout",
  "Scissors",
  "Leaf",
  "Bug",
  "TreePine",
  "CalendarCheck",
  "Shovel",
  "ClipboardList",
  "Compass",
  "Flower2",
  "GraduationCap",
  "FlaskConical",
  "Clock",
  "IndianRupee",
  "Home",
  "Wrench",
  "Salad",
  "Heart",
  "Users",
  "Target",
].map((name) => ({ value: name, label: name }));

export const AVATAR_COLOR_OPTIONS: FieldOption[] = [
  { value: "primary", label: "Green (primary)" },
  { value: "brand-red", label: "Red" },
  { value: "brand-blue", label: "Blue" },
];
