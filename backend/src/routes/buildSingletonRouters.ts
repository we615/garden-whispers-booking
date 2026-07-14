import { Router } from "express";
import type { Model } from "mongoose";
import { createSingletonController } from "../controllers/contentControllerFactory.js";
import { requireAuth } from "../middleware/auth.js";

/** Public GET + admin PUT for a singleton document (About/Contact/Intro). */
export function buildSingletonRouters<T>(SingletonModel: Model<T>) {
  const controller = createSingletonController(SingletonModel);

  const publicRouter = Router();
  publicRouter.get("/", controller.get);

  const adminRouter = Router();
  adminRouter.use(requireAuth(["admin"]));
  adminRouter.get("/", controller.get);
  adminRouter.put("/", controller.update);

  return { publicRouter, adminRouter };
}
