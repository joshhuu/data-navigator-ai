import { Dataset } from "@/data/datasets";

export interface IndustryDistribution {
  industry: string;
  count: number;
  percentage: number;
}

export interface GeographyDistribution {
  geography: string;
  count: number;
  percentage: number;
}

export interface RecordAccuracyData {
  name: string;
  records: number;
  accuracy: number;
  recordsMil: number;
}

export interface GrowthTrendData {
  month: string;
  records: number;
  projected: number;
}

export interface AnalyticsData {
  industryDistribution: IndustryDistribution[];
  geographyDistribution: GeographyDistribution[];
  recordAccuracyData: RecordAccuracyData[];
  growthTrend: GrowthTrendData[];
  totalRecords: number;
  avgAccuracy: number;
  totalDatasets: number;
}

/**
 * Compute industry distribution from datasets
 */
export function computeIndustryDistribution(datasets: Dataset[]): IndustryDistribution[] {
  const industryCount = new Map<string, number>();
  
  datasets.forEach((dataset) => {
    dataset.industries.forEach((industry) => {
      industryCount.set(industry, (industryCount.get(industry) || 0) + 1);
    });
  });

  const total = Array.from(industryCount.values()).reduce((sum, count) => sum + count, 0);
  
  return Array.from(industryCount.entries())
    .map(([industry, count]) => ({
      industry,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 industries
}

/**
 * Compute geography distribution from datasets
 */
export function computeGeographyDistribution(datasets: Dataset[]): GeographyDistribution[] {
  const geoCount = new Map<string, number>();
  
  datasets.forEach((dataset) => {
    dataset.geography.forEach((geo) => {
      geoCount.set(geo, (geoCount.get(geo) || 0) + 1);
    });
  });

  const total = Array.from(geoCount.values()).reduce((sum, count) => sum + count, 0);
  
  return Array.from(geoCount.entries())
    .map(([geography, count]) => ({
      geography,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Compute records vs accuracy correlation
 */
export function computeRecordAccuracyData(datasets: Dataset[]): RecordAccuracyData[] {
  return datasets
    .map((dataset) => ({
      name: dataset.name.split(" ").slice(0, 3).join(" "), // Shorten names for chart
      records: dataset.records,
      accuracy: dataset.accuracy,
      recordsMil: Math.round(dataset.records / 1000000),
    }))
    .sort((a, b) => b.records - a.records)
    .slice(0, 10); // Top 10 by records
}

/**
 * Simulate growth trend based on current record counts
 */
export function computeGrowthTrend(datasets: Dataset[]): GrowthTrendData[] {
  const totalRecords = datasets.reduce((sum, ds) => sum + ds.records, 0);
  const monthlyGrowthRate = 1.08; // 8% monthly growth simulation
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  return months.map((month, index) => ({
    month,
    records: Math.round(totalRecords * Math.pow(0.85, 5 - index)), // Historical backfill
    projected: Math.round(totalRecords * Math.pow(monthlyGrowthRate, index)),
  }));
}

/**
 * Compute full analytics data from datasets
 */
export function computeAnalytics(datasets: Dataset[]): AnalyticsData {
  const totalRecords = datasets.reduce((sum, ds) => sum + ds.records, 0);
  const avgAccuracy = datasets.reduce((sum, ds) => sum + ds.accuracy, 0) / datasets.length;
  
  return {
    industryDistribution: computeIndustryDistribution(datasets),
    geographyDistribution: computeGeographyDistribution(datasets),
    recordAccuracyData: computeRecordAccuracyData(datasets),
    growthTrend: computeGrowthTrend(datasets),
    totalRecords,
    avgAccuracy: Math.round(avgAccuracy * 10) / 10,
    totalDatasets: datasets.length,
  };
}

/**
 * Format large numbers for display
 */
export function formatAnalyticsNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
