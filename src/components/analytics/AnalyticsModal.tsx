import { lazy, Suspense } from "react";
import { datasets } from "@/data/datasets";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

// Lazy load the AnalyticsPanel for better performance
const AnalyticsPanel = lazy(() =>
  import("./AnalyticsPanel").then((module) => ({ default: module.AnalyticsPanel }))
);

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnalyticsModal({ open, onOpenChange }: AnalyticsModalProps) {
  const analytics = useAnalytics(datasets);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Analytics Dashboard
          </DialogTitle>
          <DialogDescription>
            Comprehensive analytics and insights across all data products
          </DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            </div>
          }
        >
          <AnalyticsPanel analytics={analytics} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
