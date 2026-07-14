import type { Schema } from "mongoose";

/** Adds the order/isActive fields shared by every admin-managed content list collection. */
export function orderedContentPlugin(schema: Schema) {
  schema.add({
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  });
}
