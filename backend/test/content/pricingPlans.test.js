import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { authHeader, createUser } from "../helpers.js";
const app = createApp();
describe("pricing-plans content routes", () => {
    it("filters public list by plantCount", async () => {
        const { token } = await createUser({ role: "admin" });
        await request(app)
            .post("/api/v1/admin/pricing-plans")
            .set(authHeader(token))
            .send({ plantCount: 10, durationLabel: "1 Month", durationMonths: 1, totalPrice: 120000 });
        await request(app)
            .post("/api/v1/admin/pricing-plans")
            .set(authHeader(token))
            .send({ plantCount: 20, durationLabel: "1 Month", durationMonths: 1, totalPrice: 240000 });
        const res = await request(app).get("/api/v1/pricing-plans?plantCount=10");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].plantCount).toBe(10);
    });
    it("enforces a single best-value plan per tier through the API, not just the model layer", async () => {
        const { token } = await createUser({ role: "admin" });
        const first = await request(app)
            .post("/api/v1/admin/pricing-plans")
            .set(authHeader(token))
            .send({ plantCount: 30, durationLabel: "1 Month", durationMonths: 1, totalPrice: 360000, isBestValue: true });
        const second = await request(app)
            .post("/api/v1/admin/pricing-plans")
            .set(authHeader(token))
            .send({ plantCount: 30, durationLabel: "1 Year", durationMonths: 12, totalPrice: 3168000, isBestValue: true });
        const firstAfter = await request(app).get(`/api/v1/admin/pricing-plans/${first.body._id}`).set(authHeader(token));
        expect(firstAfter.body.isBestValue).toBe(false);
        expect(second.body.isBestValue).toBe(true);
    });
});
//# sourceMappingURL=pricingPlans.test.js.map