import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { ServiceModel } from "../../src/models/Service.js";
import { authHeader, createUser } from "../helpers.js";
const app = createApp();
const baseService = {
    title: "Soil Checkup",
    description: "Checkup",
    imageUrl: "/uploads/soil.jpg",
    iconName: "Droplets",
    category: "core",
};
describe("services content routes", () => {
    it("public list only returns active services", async () => {
        await ServiceModel.create({ ...baseService, isActive: true });
        await ServiceModel.create({ ...baseService, title: "Hidden", isActive: false });
        const res = await request(app).get("/api/v1/services");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe("Soil Checkup");
    });
    it("filters public list by category", async () => {
        await ServiceModel.create({ ...baseService, category: "core" });
        await ServiceModel.create({ ...baseService, title: "Kitchen Garden", category: "addon" });
        const res = await request(app).get("/api/v1/services?category=addon");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].category).toBe("addon");
    });
    it("rejects unauthenticated writes", async () => {
        const res = await request(app).post("/api/v1/admin/services").send(baseService);
        expect(res.status).toBe(401);
    });
    it("rejects writes from a customer token", async () => {
        const { token } = await createUser({ role: "customer" });
        const res = await request(app).post("/api/v1/admin/services").set(authHeader(token)).send(baseService);
        expect(res.status).toBe(403);
    });
    it("lets an admin create, update, and delete a service", async () => {
        const { token } = await createUser({ role: "admin" });
        const createRes = await request(app).post("/api/v1/admin/services").set(authHeader(token)).send(baseService);
        expect(createRes.status).toBe(201);
        const id = createRes.body._id;
        const updateRes = await request(app)
            .put(`/api/v1/admin/services/${id}`)
            .set(authHeader(token))
            .send({ title: "Updated Title" });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.title).toBe("Updated Title");
        const deleteRes = await request(app).delete(`/api/v1/admin/services/${id}`).set(authHeader(token));
        expect(deleteRes.status).toBe(204);
        const getRes = await request(app).get(`/api/v1/admin/services/${id}`).set(authHeader(token));
        expect(getRes.status).toBe(404);
    });
    it("admin list includes inactive items only when includeInactive=true", async () => {
        const { token } = await createUser({ role: "admin" });
        await ServiceModel.create({ ...baseService, isActive: false });
        const withoutFlag = await request(app).get("/api/v1/admin/services").set(authHeader(token));
        expect(withoutFlag.body).toHaveLength(0);
        const withFlag = await request(app).get("/api/v1/admin/services?includeInactive=true").set(authHeader(token));
        expect(withFlag.body).toHaveLength(1);
    });
    it("rejects an expired/garbage token with 401, not a 500", async () => {
        const res = await request(app).post("/api/v1/admin/services").set("Authorization", "Bearer not-a-real-token").send(baseService);
        expect(res.status).toBe(401);
    });
});
//# sourceMappingURL=services.test.js.map