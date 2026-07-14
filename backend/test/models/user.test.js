import { describe, expect, it } from "vitest";
import { UserModel } from "../../src/models/User.js";
describe("User model", () => {
    it("enforces unique email", async () => {
        await UserModel.create({
            name: "A",
            email: "dup@example.com",
            phone: "1",
            passwordHash: "x",
            role: "customer",
        });
        await expect(UserModel.create({ name: "B", email: "dup@example.com", phone: "2", passwordHash: "y", role: "customer" })).rejects.toThrow();
    });
    it("defaults role to customer", async () => {
        const user = await UserModel.create({ name: "A", email: "a@example.com", phone: "1", passwordHash: "x" });
        expect(user.role).toBe("customer");
    });
});
//# sourceMappingURL=user.test.js.map