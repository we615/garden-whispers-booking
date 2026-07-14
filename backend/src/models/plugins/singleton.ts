import type { Schema } from "mongoose";

/** Pins every document of a singleton collection to the same key so there is ever only one. */
export function singletonPlugin(schema: Schema) {
  schema.add({
    singletonKey: { type: String, default: "singleton", unique: true },
  });
}

export const SINGLETON_KEY = "singleton";
