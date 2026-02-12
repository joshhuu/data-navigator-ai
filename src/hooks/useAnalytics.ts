import { useMemo } from "react";
import { Dataset } from "@/data/datasets";
import { computeAnalytics, AnalyticsData } from "@/utils/analytics";

/**
 * Custom hook to compute analytics from datasets
 * Uses memoization for performance
 */
export function useAnalytics(datasets: Dataset[]): AnalyticsData {
  return useMemo(() => computeAnalytics(datasets), [datasets]);
}
