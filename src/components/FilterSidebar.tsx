import { categories, industries, geographies } from "@/data/datasets";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface Filters {
  industries: string[];
  geography: string[];
  category: string[];
  compliance: number;
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClose?: () => void;
  className?: string;
}

export function FilterSidebar({ filters, onChange, onClose, className = "" }: FilterSidebarProps) {
  const toggle = (key: "industries" | "geography" | "category", value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className={`surface-card rounded-lg p-4 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Product Type</p>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.category.includes(cat.id)}
                onCheckedChange={() => toggle("category", cat.id)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Industry */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Industry</p>
        <div className="space-y-1.5">
          {industries.slice(0, 6).map((ind) => (
            <label key={ind} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.industries.includes(ind)}
                onCheckedChange={() => toggle("industries", ind)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {ind}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Geography */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Geography</p>
        <div className="space-y-1.5">
          {geographies.map((geo) => (
            <label key={geo} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={filters.geography.includes(geo)}
                onCheckedChange={() => toggle("geography", geo)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {geo}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Min Compliance: {filters.compliance}%
        </p>
        <Slider
          value={[filters.compliance]}
          onValueChange={([v]) => onChange({ ...filters, compliance: v })}
          min={0}
          max={100}
          step={5}
          className="py-2"
        />
      </div>
    </div>
  );
}
