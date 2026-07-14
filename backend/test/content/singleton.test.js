import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { authHeader, createUser } from "../helpers.js";
const app = createApp();
describe("singleton content routes (about/contact-info)", () => {
    it("auto-creates the singleton on first public GET", async () => {
        const res = await request(app).get("/api/v1/contact-info");
        expect(res.status).toBe(200);
        expect(res.body.singletonKey).toBe("singleton");
    });
    it("always returns the same document across repeated GETs", async () => {
        const first = await request(app).get("/api/v1/about");
        const second = await request(app).get("/api/v1/about");
        expect(first.body._id).toBe(second.body._id);
    });
    it("lets an admin update the singleton via PUT, reflected on the next public GET", async () => {
        const { token } = await createUser({ role: "admin" });
        const updateRes = await request(app)
            .put("/api/v1/admin/contact-info")
            .set(authHeader(token))
            .send({ email: "hello@ecobloom.test", whatsappNumbers: ["919999999999"] });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.email).toBe("hello@ecobloom.test");
        const publicRes = await request(app).get("/api/v1/contact-info");
        expect(publicRes.body.email).toBe("hello@ecobloom.test");
        expect(publicRes.body.whatsappNumbers).toEqual(["919999999999"]);
    });
    it("rejects singleton updates from non-admins", async () => {
        const { token } = await createUser({ role: "customer" });
        const res = await request(app).put("/api/v1/admin/about").set(authHeader(token)).send({ heroHeading: "x" });
        expect(res.status).toBe(403);
    });
});
//# sourceMappingURL=singleton.test.js.map