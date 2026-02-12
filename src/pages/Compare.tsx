import { useState } from "react";
import { datasets } from "@/data/datasets";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GitCompare, BarChart3 } from "lucide-react";
import { AnalyticsComparisonModal } from "@/components/analytics/AnalyticsComparisonModal";

const Compare = () => {
  const [idA, setIdA] = useState<string>("");
  const [idB, setIdB] = useState<string>("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const datasetA = datasets.find((d) => d.id === idA) || null;
  const datasetB = datasets.find((d) => d.id === idB) || null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-primary mb-2">
          <GitCompare className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Compare Datasets</h1>
        <p className="text-sm text-muted-foreground">Select two datasets to compare side by side.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Dataset A</label>
          <Select value={idA} onValueChange={setIdA}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Select first dataset" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {datasets.map((ds) => (
                <SelectItem key={ds.id} value={ds.id} disabled={ds.id === idB}>
                  {ds.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Dataset B</label>
          <Select value={idB} onValueChange={setIdB}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Select second dataset" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {datasets.map((ds) => (
                <SelectItem key={ds.id} value={ds.id} disabled={ds.id === idA}>
                  {ds.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {datasetA && datasetB && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setShowAnalytics(true)}
            className="gap-2"
            size="lg"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics Comparison
          </Button>
        </div>
      )}

      <ComparisonTable datasetA={datasetA} datasetB={datasetB} />

      {datasetA && datasetB && (
        <AnalyticsComparisonModal
          open={showAnalytics}
          onOpenChange={setShowAnalytics}
          datasetA={datasetA}
          datasetB={datasetB}
        />
      )}
    </div>
  );
};

export default Compare;
