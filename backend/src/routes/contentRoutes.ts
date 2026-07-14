import { Router, type Request } from "express";
import { buildResourceRouters } from "./buildResourceRouters.js";
import { buildSingletonRouters } from "./buildSingletonRouters.js";
import {
  HeroSlideModel,
  IntroContentModel,
  ServiceModel,
  HowItWorksStepModel,
  WhyUsReasonModel,
  PricingPlanModel,
  TestimonialModel,
  ClientModel,
  VideoGalleryItemModel,
  MissionPillarModel,
  AboutContentModel,
  ContactInfoModel,
} from "../models/index.js";

const heroSlides = buildResourceRouters(HeroSlideModel);
const services = buildResourceRouters(ServiceModel, {
  buildFilter: (req: Request) => (req.query.category ? { category: req.query.category } : {}),
});
const howItWorks = buildResourceRouters(HowItWorksStepModel);
const whyUs = buildResourceRouters(WhyUsReasonModel);
const pricingPlans = buildResourceRouters(PricingPlanModel, {
  buildFilter: (req: Request) => (req.query.plantCount ? { plantCount: Number(req.query.plantCount) } : {}),
});
const testimonials = buildResourceRouters(TestimonialModel);
const clients = buildResourceRouters(ClientModel);
const videoGallery = buildResourceRouters(VideoGalleryItemModel, {
  buildFilter: (req: Request) => (req.query.category ? { category: req.query.category } : {}),
});
const missionPillars = buildResourceRouters(MissionPillarModel);

const intro = buildSingletonRouters(IntroContentModel);
const about = buildSingletonRouters(AboutContentModel);
const contactInfo = buildSingletonRouters(ContactInfoModel);

export const publicContentRouter = Router();
publicContentRouter.use("/hero-slides", heroSlides.publicRouter);
publicContentRouter.use("/intro", intro.publicRouter);
publicContentRouter.use("/services", services.publicRouter);
publicContentRouter.use("/how-it-works", howItWorks.publicRouter);
publicContentRouter.use("/why-us", whyUs.publicRouter);
publicContentRouter.use("/pricing-plans", pricingPlans.publicRouter);
publicContentRouter.use("/testimonials", testimonials.publicRouter);
publicContentRouter.use("/clients", clients.publicRouter);
publicContentRouter.use("/video-gallery", videoGallery.publicRouter);
publicContentRouter.use("/mission-pillars", missionPillars.publicRouter);
publicContentRouter.use("/about", about.publicRouter);
publicContentRouter.use("/contact-info", contactInfo.publicRouter);

export const adminContentRouter = Router();
adminContentRouter.use("/hero-slides", heroSlides.adminRouter);
adminContentRouter.use("/intro", intro.adminRouter);
adminContentRouter.use("/services", services.adminRouter);
adminContentRouter.use("/how-it-works", howItWorks.adminRouter);
adminContentRouter.use("/why-us", whyUs.adminRouter);
adminContentRouter.use("/pricing-plans", pricingPlans.adminRouter);
adminContentRouter.use("/testimonials", testimonials.adminRouter);
adminContentRouter.use("/clients", clients.adminRouter);
adminContentRouter.use("/video-gallery", videoGallery.adminRouter);
adminContentRouter.use("/mission-pillars", missionPillars.adminRouter);
adminContentRouter.use("/about", about.adminRouter);
adminContentRouter.use("/contact-info", contactInfo.adminRouter);
