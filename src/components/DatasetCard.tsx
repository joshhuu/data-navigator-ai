import { Dataset } from "@/data/datasets";
import { ConfidenceRing } from "./ConfidenceRing";
import { formatNumber, generateConfidence } from "@/utils/aiSimulation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, ArrowRight, ShoppingCart, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { AnalyticsModal } from "./analytics/AnalyticsModal";
import { useCart } from "@/hooks/useCart";

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const confidence = useMemo(() => generateConfidence(), []);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(dataset.id);

  return (
    <div className="surface-card rounded-lg p-5 hover-lift group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate group-hover:text-primary transition-colors">
            {dataset.name}
          </h3>
          <Badge variant="outline" className="mt-1.5 text-[10px] border-primary/30 text-primary">
            {dataset.category.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        <ConfidenceRing value={confidence} size={52} strokeWidth={4} label="Match" />
      </div>

      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {dataset.description}
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-secondary/50 rounded-md p-2 text-center">
          <p className="text-[10px] text-muted-foreground">Records</p>
          <p className="text-xs font-semibold text-foreground">{formatNumber(dataset.records)}</p>
        </div>
        <div className="bg-secondary/50 rounded-md p-2 text-center">
          <p className="text-[10px] text-muted-foreground">Accuracy</p>
          <p className="text-xs font-semibold text-foreground">{dataset.accuracy}%</p>
        </div>
        <div className="bg-secondary/50 rounded-md p-2 text-center">
          <p className="text-[10px] text-muted-foreground">Price</p>
          <p className="text-xs font-semibold text-foreground">{dataset.priceTier}</p>
        </div>
      </div>

      {/* Mini bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
          <span>Compliance Score</span>
          <span>{dataset.complianceScore}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${dataset.complianceScore}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {dataset.industries.slice(0, 2).map((ind) => (
          <span key={ind} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {ind}
          </span>
        ))}
        {dataset.geography.slice(0, 1).map((geo) => (
          <span key={geo} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {geo}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant={inCart ? "secondary" : "default"}
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            if (!inCart) {
              addToCart(dataset);
            }
          }}
          disabled={inCart}
          className="flex-1 text-xs gap-1.5"
          title={inCart ? "Already in cart" : "Add to cart"}
        >
          {inCart ? (
            <>
              <Check className="h-3 w-3" /> In Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-3 w-3" /> Add
            </>
          )}
        </Button>
        <Link to={`/dataset/${dataset.id}`}>
          <Button variant="outline" size="sm" className="text-xs border-border hover:border-primary hover:text-primary px-3">
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            setShowAnalytics(true);
          }}
          className="text-xs px-2"
          title="View Analytics"
        >
          <BarChart3 className="h-4 w-4 text-primary" />
        </Button>
      </div>

      <AnalyticsModal open={showAnalytics} onOpenChange={setShowAnalytics} />
    </div>
  );
}
