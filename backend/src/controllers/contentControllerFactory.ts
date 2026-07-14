import type { Request, Response } from "express";
import type { Model } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Builds standard list/get/create/update/delete handlers for an ordered content collection
 * (order + isActive fields). `buildFilter` lets a resource add query-param filters, e.g.
 * ?category=core on Service, without duplicating the CRUD boilerplate per resource.
 */
export function createContentController<T>(
  ContentModel: Model<T>,
  options: { buildFilter?: (req: Request) => Record<string, unknown> } = {}
) {
  const buildFilter = options.buildFilter ?? (() => ({}));

  return {
    listPublic: asyncHandler(async (req: Request, res: Response) => {
      const docs = await ContentModel.find({ ...buildFilter(req), isActive: true }).sort({
        order: 1,
        createdAt: 1,
      });
      res.json(docs);
    }),

    listAdmin: asyncHandler(async (req: Request, res: Response) => {
      const filter: Record<string, unknown> = { ...buildFilter(req) };
      if (req.query.includeInactive !== "true") filter.isActive = true;
      const docs = await ContentModel.find(filter).sort({ order: 1, createdAt: 1 });
      res.json(docs);
    }),

    getOne: asyncHandler(async (req: Request, res: Response) => {
      const doc = await ContentModel.findById(req.params.id);
      if (!doc) throw ApiError.notFound();
      res.json(doc);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
      const doc = await ContentModel.create(req.body);
      res.status(201).json(doc);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const doc = await ContentModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) throw ApiError.notFound();
      res.json(doc);
    }),

    remove: asyncHandler(async (req: Request, res: Response) => {
      const doc = await ContentModel.findByIdAndDelete(req.params.id);
      if (!doc) throw ApiError.notFound();
      res.status(204).send();
    }),
  };
}

/** Builds get/update handlers for a singleton document (About/Contact/Intro), auto-creating on first read. */
export function createSingletonController<T>(SingletonModel: Model<T>) {
  return {
    get: asyncHandler(async (_req: Request, res: Response) => {
      let doc = await SingletonModel.findOne({ singletonKey: "singleton" });
      if (!doc) doc = await SingletonModel.create({ singletonKey: "singleton" });
      res.json(doc);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const doc = await SingletonModel.findOneAndUpdate({ singletonKey: "singleton" }, req.body, {
        new: true,
        upsert: true,
        runValidators: true,
      });
      res.json(doc);
    }),
  };
}
