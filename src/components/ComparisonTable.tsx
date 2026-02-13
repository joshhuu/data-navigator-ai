import { Dataset } from "@/data/datasets";
import { formatNumber } from "@/utils/aiSimulation";

interface ComparisonTableProps {
  datasetA: Dataset | null;
  datasetB: Dataset | null;
  datasetC?: Dataset | null;
}

function MetricRow({
  label,
  valueA,
  valueB,
  valueC,
  higherIsBetter = true,
}: {
  label: string;
  valueA: string | number;
  valueB: string | number;
  valueC?: string | number;
  higherIsBetter?: boolean;
}) {
  const numA = typeof valueA === "number" ? valueA : parseFloat(valueA) || 0;
  const numB = typeof valueB === "number" ? valueB : parseFloat(valueB) || 0;
  const numC = valueC !== undefined ? (typeof valueC === "number" ? valueC : parseFloat(valueC) || 0) : null;
  
  // Find the best value
  const values = numC !== null ? [numA, numB, numC] : [numA, numB];
  const bestValue = higherIsBetter ? Math.max(...values) : Math.min(...values);
  
  const aWins = numA === bestValue;
  const bWins = numB === bestValue;
  const cWins = numC !== null && numC === bestValue;

  return (
    <tr className="border-b border-border/50">
      <td className="py-3 px-4 text-xs font-medium text-muted-foreground">{label}</td>
      <td className={`py-3 px-4 text-xs text-center font-semibold ${aWins ? "text-primary" : "text-foreground"}`}>
        {valueA}
        {aWins && <span className="ml-1 text-[10px]">★</span>}
      </td>
      <td className={`py-3 px-4 text-xs text-center font-semibold ${bWins ? "text-primary" : "text-foreground"}`}>
        {valueB}
        {bWins && <span className="ml-1 text-[10px]">★</span>}
      </td>
      {valueC !== undefined && (
        <td className={`py-3 px-4 text-xs text-center font-semibold ${cWins ? "text-primary" : "text-foreground"}`}>
          {valueC}
          {cWins && <span className="ml-1 text-[10px]">★</span>}
        </td>
      )}
    </tr>
  );
}

const priceTierValue: Record<string, number> = {
  Free: 1,
  Starter: 2,
  Professional: 3,
  Enterprise: 4,
};

export function ComparisonTable({ datasetA, datasetB, datasetC }: ComparisonTableProps) {
  if (!datasetA || !datasetB) {
    return (
      <div className="surface-card rounded-lg p-8 text-center">
        <p className="text-sm text-muted-foreground">Select at least two datasets above to compare them side by side.</p>
      </div>
    );
  }

  return (
    <div className="surface-card rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 px-4 text-xs font-medium text-muted-foreground text-left">Metric</th>
            <th className="py-3 px-4 text-xs font-semibold text-primary text-center">{datasetA.name}</th>
            <th className="py-3 px-4 text-xs font-semibold text-info text-center">{datasetB.name}</th>
            {datasetC && (
              <th className="py-3 px-4 text-xs font-semibold text-[hsl(280,65%,60%)] text-center">{datasetC.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <MetricRow 
            label="Records" 
            valueA={formatNumber(datasetA.records)} 
            valueB={formatNumber(datasetB.records)} 
            valueC={datasetC ? formatNumber(datasetC.records) : undefined}
          />
          <MetricRow 
            label="Accuracy" 
            valueA={`${datasetA.accuracy}%`} 
            valueB={`${datasetB.accuracy}%`}
            valueC={datasetC ? `${datasetC.accuracy}%` : undefined}
          />
          <MetricRow 
            label="Coverage" 
            valueA={datasetA.geography.join(", ")} 
            valueB={datasetB.geography.join(", ")}
            valueC={datasetC ? datasetC.geography.join(", ") : undefined}
          />
          <MetricRow 
            label="Compliance Score" 
            valueA={datasetA.complianceScore} 
            valueB={datasetB.complianceScore}
            valueC={datasetC ? datasetC.complianceScore : undefined}
          />
          <MetricRow
            label="Price Tier"
            valueA={datasetA.priceTier}
            valueB={datasetB.priceTier}
            valueC={datasetC ? datasetC.priceTier : undefined}
            higherIsBetter={false}
          />
          <MetricRow 
            label="Columns" 
            valueA={datasetA.columns.length} 
            valueB={datasetB.columns.length}
            valueC={datasetC ? datasetC.columns.length : undefined}
          />
          <MetricRow 
            label="Industries" 
            valueA={datasetA.industries.length} 
            valueB={datasetB.industries.length}
            valueC={datasetC ? datasetC.industries.length : undefined}
          />
        </tbody>
      </table>
    </div>
  );
}
