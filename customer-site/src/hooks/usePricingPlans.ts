import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface PricingPlan {
  _id: string;
  plantCount: number;
  durationLabel: string;
  durationMonths: number;
  totalPrice: number; // paise
  badgeText?: string;
  freeVisits: number;
  description: string;
  isBestValue: boolean;
}

export const usePricingPlans = () =>
  useQuery({ queryKey: ["pricing-plans"], queryFn: () => api.get<PricingPlan[]>("/pricing-plans") });
