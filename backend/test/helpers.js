import { UserModel } from "../src/models/User.js";
import { hashPassword } from "../src/utils/password.js";
import { signToken } from "../src/utils/jwt.js";
export async function createUser(overrides = {}) {
    const role = overrides.role ?? "customer";
    const email = overrides.email ?? `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
    const passwordHash = await hashPassword("password123");
    const user = await UserModel.create({
        name: role === "admin" ? "Test Admin" : "Test Customer",
        email,
        phone: "9999999999",
        passwordHash,
        role,
    });
    const token = signToken({ sub: user._id.toString(), role }, role);
    return { user, token };
}
export function authHeader(token) {
    return { Authorization: `Bearer ${token}` };
}
//# sourceMappingURL=helpers.js.map