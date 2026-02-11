import { useParams, Link } from "react-router-dom";
import { datasets } from "@/data/datasets";
import { formatNumber } from "@/utils/aiSimulation";
import { ConfidenceRing } from "@/components/ConfidenceRing";
import { DatasetCard } from "@/components/DatasetCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Globe, Tag, DollarSign } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dataset = datasets.find((d) => d.id === id);

  if (!dataset) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Dataset not found.</p>
        <Link to="/search" className="text-primary text-sm hover:underline mt-2 inline-block">
          Back to search
        </Link>
      </div>
    );
  }

  const relatedDatasets = datasets
    .filter((d) => d.category === dataset.category && d.id !== dataset.id)
    .slice(0, 3);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/search"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-3 w-3" /> Back to results
      </Link>

      {/* Header */}
      <div className="surface-card rounded-lg p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-[10px] border-primary/30 text-primary">
              {dataset.category.replace("-", " ").toUpperCase()}
            </Badge>
            <h1 className="text-2xl font-bold text-foreground mb-2">{dataset.name}</h1>
            <p className="text-sm text-muted-foreground max-w-lg">{dataset.description}</p>
          </div>
          <ConfidenceRing value={dataset.accuracy} size={80} strokeWidth={6} label="Accuracy" />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          {[
            { label: "Records", value: formatNumber(dataset.records), icon: Tag },
            { label: "Accuracy", value: `${dataset.accuracy}%`, icon: Shield },
            { label: "Coverage", value: dataset.geography.join(", "), icon: Globe },
            { label: "Price Tier", value: dataset.priceTier, icon: DollarSign },
            { label: "Compliance", value: `${dataset.complianceScore}%`, icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="bg-secondary/50 rounded-md p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon className="h-3 w-3 text-primary" />
                <p className="text-[10px] text-muted-foreground uppercase">{stat.label}</p>
              </div>
              <p className="text-sm font-semibold text-foreground truncate">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="volumes" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Volumes & Samples</TabsTrigger>
          <TabsTrigger value="sample" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sample Data</TabsTrigger>
          <TabsTrigger value="dictionary" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Data Dictionary</TabsTrigger>
          <TabsTrigger value="related" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Related</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="surface-card rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">About this Dataset</h3>
          <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[10px] uppercase text-muted-foreground font-medium">Industries:</span>
            {dataset.industries.map((ind) => (
              <Badge key={ind} variant="secondary" className="text-[10px]">{ind}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] uppercase text-muted-foreground font-medium">Geography:</span>
            {dataset.geography.map((geo) => (
              <Badge key={geo} variant="secondary" className="text-[10px]">{geo}</Badge>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volumes" className="surface-card rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Volume & Coverage</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Records</p>
              <p className="text-2xl font-bold text-foreground">{formatNumber(dataset.records)}</p>
            </div>
            <div className="bg-secondary/50 rounded-md p-4">
              <p className="text-xs text-muted-foreground mb-1">Data Columns</p>
              <p className="text-2xl font-bold text-foreground">{dataset.columns.length}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sample" className="surface-card rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Sample Data (5 rows)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {Object.keys(dataset.sampleRows[0]).map((col) => (
                    <th key={col} className="py-2 px-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.sampleRows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="py-2 px-3 text-foreground whitespace-nowrap font-mono text-[11px]">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="dictionary" className="surface-card rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Data Dictionary</h3>
          <div className="space-y-2">
            {dataset.columns.map((col) => (
              <div key={col} className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-md">
                <span className="text-xs font-mono text-foreground">{col}</span>
                <span className="text-[10px] text-muted-foreground">string</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="related">
          <h3 className="text-sm font-semibold text-foreground mb-3">Related Products</h3>
          {relatedDatasets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedDatasets.map((ds) => (
                <DatasetCard key={ds.id} dataset={ds} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No related products found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
