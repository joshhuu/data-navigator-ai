import { categories, industries, geographies } from "@/data/datasets";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div className={`surface-card rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground lg:hidden">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={[]} className="w-full">
        {/* Product Type */}
        <AccordionItem value="product-type" className="border-border">
          <AccordionTrigger className="text-xs font-medium text-foreground uppercase tracking-wider hover:no-underline py-3">
            Product Type
            {filters.category.length > 0 && (
              <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {filters.category.length}
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
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
          </AccordionContent>
        </AccordionItem>

        {/* Industry */}
        <AccordionItem value="industry" className="border-border">
          <AccordionTrigger className="text-xs font-medium text-foreground uppercase tracking-wider hover:no-underline py-3">
            Industry
            {filters.industries.length > 0 && (
              <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {filters.industries.length}
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {industries.map((ind) => (
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
          </AccordionContent>
        </AccordionItem>

        {/* Geography */}
        <AccordionItem value="geography" className="border-border">
          <AccordionTrigger className="text-xs font-medium text-foreground uppercase tracking-wider hover:no-underline py-3">
            Geography
            {filters.geography.length > 0 && (
              <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {filters.geography.length}
              </span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
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
          </AccordionContent>
        </AccordionItem>

        {/* Compliance */}
        <AccordionItem value="compliance" className="border-border">
          <AccordionTrigger className="text-xs font-medium text-foreground uppercase tracking-wider hover:no-underline py-3">
            Min Compliance: {filters.compliance}%
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <Slider
                value={[filters.compliance]}
                onValueChange={([v]) => onChange({ ...filters, compliance: v })}
                min={0}
                max={100}
                step={5}
                className="py-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
