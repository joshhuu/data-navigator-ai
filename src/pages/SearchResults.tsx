import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { DatasetCard } from "@/components/DatasetCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { searchDatasets, filterDatasets, aiLoadingSteps } from "@/utils/aiSimulation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SlidersHorizontal, X } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    industries: [] as string[],
    geography: [] as string[],
    category: categoryParam ? [categoryParam] : [] as string[],
    compliance: 0,
  });

  // AI loading simulation
  useEffect(() => {
    setLoading(true);
    setLoadingStep(0);
    const timers = aiLoadingSteps.map((_, i) =>
      setTimeout(() => setLoadingStep(i), i * 600)
    );
    const done = setTimeout(() => setLoading(false), aiLoadingSteps.length * 600 + 300);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [query, categoryParam]);

  const searchResults = useMemo(() => searchDatasets(query), [query]);
  const filteredResults = useMemo(
    () => filterDatasets(searchResults, filters),
    [searchResults, filters]
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar defaultValue={query} />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow mb-4" />
            <div className="space-y-2">
              {aiLoadingSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i <= loadingStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className={`text-sm ${i <= loadingStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                  {i === loadingStep && <span className="text-primary animate-pulse">...</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{filteredResults.length}</span> datasets found
                {query && (
                  <span>
                    {" "}for "<span className="text-primary">{query}</span>"
                  </span>
                )}
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md border border-border"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
            </div>

            <div className="flex gap-6">
              {/* Desktop filters */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <FilterSidebar filters={filters} onChange={setFilters} />
              </div>

              {/* Mobile filters overlay */}
              {showFilters && (
                <div className="fixed inset-0 z-50 bg-background/95 p-4 lg:hidden overflow-y-auto">
                  <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />
                </div>
              )}

              {/* Results grid */}
              <div className="flex-1">
                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredResults.map((ds) => (
                      <DatasetCard key={ds.id} dataset={ds} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-sm">No datasets match your filters. Try adjusting your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResults;
