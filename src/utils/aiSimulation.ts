import { datasets, Dataset } from "@/data/datasets";

/** Keyword → category mapping for AI-like search */
const keywordCategoryMap: Record<string, string[]> = {
  mail: ["postal", "email"],
  postal: ["postal"],
  address: ["postal"],
  mailing: ["postal"],
  email: ["email"],
  contact: ["email", "telemarketing", "enrichment"],
  phone: ["telemarketing"],
  call: ["telemarketing"],
  telemarketing: ["telemarketing"],
  health: ["healthcare"],
  medical: ["healthcare"],
  doctor: ["healthcare"],
  hospital: ["healthcare"],
  pharmacy: ["healthcare"],
  clinic: ["healthcare"],
  senior: ["healthcare"],
  business: ["new-business"],
  startup: ["new-business"],
  filing: ["new-business"],
  new: ["new-business"],
  company: ["new-business", "enrichment"],
  soho: ["soho"],
  home: ["soho"],
  freelance: ["soho"],
  office: ["soho"],
  poi: ["poi"],
  location: ["poi"],
  restaurant: ["poi"],
  place: ["poi"],
  map: ["poi"],
  enrich: ["enrichment"],
  append: ["enrichment"],
  social: ["enrichment"],
  linkedin: ["enrichment"],
  data: ["enrichment", "email", "postal"],
  consumer: ["postal", "telemarketing"],
  b2b: ["email", "enrichment"],
  insurance: ["telemarketing", "healthcare"],
  retail: ["poi"],
  lead: ["email", "telemarketing"],
  gdpr: ["email", "postal"],
  compliance: ["email", "postal"],
};

/** Generate a random confidence score between 80-98 */
export function generateConfidence(): number {
  return Math.round((Math.random() * 18 + 80) * 10) / 10;
}

/** Search datasets using keyword-to-category mapping */
export function searchDatasets(query: string): Dataset[] {
  if (!query.trim()) return datasets;

  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);

  // Find matching categories from keywords
  const matchedCategories = new Set<string>();
  words.forEach((word) => {
    Object.entries(keywordCategoryMap).forEach(([keyword, cats]) => {
      if (word.includes(keyword) || keyword.includes(word)) {
        cats.forEach((c) => matchedCategories.add(c));
      }
    });
  });

  // Also match directly against dataset fields
  const results = datasets.filter((ds) => {
    if (matchedCategories.has(ds.category)) return true;

    const searchableText = [
      ds.name,
      ds.description,
      ds.category,
      ...ds.industries,
      ...ds.geography,
    ]
      .join(" ")
      .toLowerCase();

    return words.some((w) => searchableText.includes(w));
  });

  return results.length > 0 ? results : datasets.slice(0, 5);
}

/** Filter datasets by criteria */
export function filterDatasets(
  items: Dataset[],
  filters: {
    industries?: string[];
    geography?: string[];
    category?: string[];
    compliance?: number;
  }
): Dataset[] {
  return items.filter((ds) => {
    if (filters.industries?.length) {
      if (!filters.industries.some((ind) => ds.industries.includes(ind))) return false;
    }
    if (filters.geography?.length) {
      if (!filters.geography.some((geo) => ds.geography.includes(geo))) return false;
    }
    if (filters.category?.length) {
      if (!filters.category.includes(ds.category)) return false;
    }
    if (filters.compliance) {
      if (ds.complianceScore < filters.compliance) return false;
    }
    return true;
  });
}

/** AI loading step messages */
export const aiLoadingSteps = [
  "Analyzing Intent",
  "Filtering Datasets",
  "Ranking Results",
];

/** Use-case → dataset recommendations */
export const useCaseRecommendations: Record<
  string,
  { datasetIds: string[]; reasoning: string }
> = {
  "lead-generation": {
    datasetIds: ["ds-002", "ds-003", "ds-011"],
    reasoning: "Email and phone-based outreach datasets with high accuracy for targeted B2B prospecting.",
  },
  "market-research": {
    datasetIds: ["ds-008", "ds-013", "ds-007"],
    reasoning: "Firmographic data combined with POI and startup tracking for comprehensive market analysis.",
  },
  "expansion-planning": {
    datasetIds: ["ds-007", "ds-001", "ds-015"],
    reasoning: "Location intelligence and consumer data to identify high-potential expansion markets.",
  },
  "healthcare-outreach": {
    datasetIds: ["ds-004", "ds-012", "ds-019"],
    reasoning: "Provider directories and facility data for targeted healthcare industry campaigns.",
  },
  "retail-mapping": {
    datasetIds: ["ds-007", "ds-015", "ds-001"],
    reasoning: "POI databases and consumer addresses for retail footprint planning and competitor analysis.",
  },
};

/** Format large numbers */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}
