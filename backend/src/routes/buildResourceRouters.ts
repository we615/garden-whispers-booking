import { Router, type Request } from "express";
import type { Model } from "mongoose";
import { createContentController } from "../controllers/contentControllerFactory.js";
import { requireAuth } from "../middleware/auth.js";

/**
 * Wires the standard pair of routers for a content collection:
 *  - publicRouter: GET /  (active-only, no auth) — mounted at /api/v1/<resource>
 *  - adminRouter:  GET /, GET /:id, POST /, PUT /:id, DELETE /:id (admin JWT required,
 *    supports ?includeInactive=true) — mounted at /api/v1/admin/<resource>
 */
export function buildResourceRouters<T>(
  ContentModel: Model<T>,
  options: { buildFilter?: (req: Request) => Record<string, unknown> } = {}
) {
  const controller = createContentController(ContentModel, options);

  const publicRouter = Router();
  publicRouter.get("/", controller.listPublic);

  const adminRouter = Router();
  adminRouter.use(requireAuth(["admin"]));
  adminRouter.get("/", controller.listAdmin);
  adminRouter.get("/:id", controller.getOne);
  adminRouter.post("/", controller.create);
  adminRouter.put("/:id", controller.update);
  adminRouter.delete("/:id", controller.remove);

  return { publicRouter, adminRouter };
}
