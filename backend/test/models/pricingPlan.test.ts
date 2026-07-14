import { describe, expect, it } from "vitest";
import { PricingPlanModel } from "../../src/models/PricingPlan.js";

describe("PricingPlan model", () => {
  it("rejects a plan missing required fields", async () => {
    await expect(PricingPlanModel.create({ plantCount: 10 })).rejects.toThrow();
  });

  it("allows admin to freely create new plant-count tiers not in a fixed list", async () => {
    const plan = await PricingPlanModel.create({
      plantCount: 250,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 3000000,
      description: "custom large tier",
    });
    expect(plan.plantCount).toBe(250);
  });

  it("only allows one isBestValue plan per plantCount tier", async () => {
    const a = await PricingPlanModel.create({
      plantCount: 10,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 120000,
      isBestValue: true,
    });
    const b = await PricingPlanModel.create({
      plantCount: 10,
      durationLabel: "1 Year",
      durationMonths: 12,
      totalPrice: 1104000,
      isBestValue: true,
    });

    const refreshedA = await PricingPlanModel.findById(a._id);
    const refreshedB = await PricingPlanModel.findById(b._id);
    expect(refreshedA?.isBestValue).toBe(false);
    expect(refreshedB?.isBestValue).toBe(true);
  });

  it("does not let isBestValue on one plantCount tier affect another tier", async () => {
    const tier10 = await PricingPlanModel.create({
      plantCount: 10,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 120000,
      isBestValue: true,
    });
    const tier20 = await PricingPlanModel.create({
      plantCount: 20,
      durationLabel: "1 Month",
      durationMonths: 1,
      totalPrice: 240000,
      isBestValue: true,
    });

    const refreshedTier10 = await PricingPlanModel.findById(tier10._id);
    const refreshedTier20 = await PricingPlanModel.findById(tier20._id);
    expect(refreshedTier10?.isBestValue).toBe(true);
    expect(refreshedTier20?.isBestValue).toBe(true);
  });
});
