import { lazy, Suspense } from "react";
import { Dataset } from "@/data/datasets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, GitCompare } from "lucide-react";

// Lazy load the AnalyticsComparisonPanel for better performance
const AnalyticsComparisonPanel = lazy(() =>
  import("./AnalyticsComparisonPanel").then((module) => ({ default: module.AnalyticsComparisonPanel }))
);

interface AnalyticsComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  datasetA: Dataset;
  datasetB: Dataset;
  datasetC?: Dataset | null;
}

export function AnalyticsComparisonModal({
  open,
  onOpenChange,
  datasetA,
  datasetB,
  datasetC,
}: AnalyticsComparisonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            Analytics Comparison
          </DialogTitle>
          <DialogDescription>
            Side-by-side analytics visualization comparing selected datasets
          </DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            </div>
          }
        >
          <AnalyticsComparisonPanel datasetA={datasetA} datasetB={datasetB} datasetC={datasetC} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
