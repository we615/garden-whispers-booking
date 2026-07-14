import { Schema, model } from "mongoose";
import { orderedContentPlugin } from "./plugins/orderedContent.js";

const pricingPlanSchema = new Schema(
  {
    plantCount: { type: Number, required: true, min: 1, index: true },
    durationLabel: { type: String, required: true },
    durationMonths: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 }, // paise
    badgeText: { type: String },
    freeVisits: { type: Number, default: 0, min: 0 },
    description: { type: String, default: "" },
    isBestValue: { type: Boolean, default: false },
  },
  { timestamps: true }
);
pricingPlanSchema.plugin(orderedContentPlugin);
pricingPlanSchema.index({ plantCount: 1, order: 1 });

// Only one plan per plantCount tier may be flagged "Best Value" — enforced at the model layer
// so it holds regardless of which controller/script writes the document.
pricingPlanSchema.pre("save", async function (next) {
  if (this.isBestValue && (this.isModified("isBestValue") || this.isModified("plantCount"))) {
    await PricingPlanModel.updateMany(
      { plantCount: this.plantCount, _id: { $ne: this._id } },
      { isBestValue: false }
    );
  }
  next();
});

pricingPlanSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as { isBestValue?: boolean; plantCount?: number } | null;
  if (update?.isBestValue) {
    const current = await this.model.findOne(this.getQuery());
    if (current) {
      const plantCount = update.plantCount ?? current.plantCount;
      await this.model.updateMany({ plantCount, _id: { $ne: current._id } }, { isBestValue: false });
    }
  }
  next();
});

export const PricingPlanModel = model("PricingPlan", pricingPlanSchema);
