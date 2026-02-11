import { Dataset } from "@/data/datasets";
import { formatNumber } from "@/utils/aiSimulation";

interface ComparisonTableProps {
  datasetA: Dataset | null;
  datasetB: Dataset | null;
}

function MetricRow({
  label,
  valueA,
  valueB,
  higherIsBetter = true,
}: {
  label: string;
  valueA: string | number;
  valueB: string | number;
  higherIsBetter?: boolean;
}) {
  const numA = typeof valueA === "number" ? valueA : parseFloat(valueA) || 0;
  const numB = typeof valueB === "number" ? valueB : parseFloat(valueB) || 0;
  const aWins = higherIsBetter ? numA > numB : numA < numB;
  const bWins = higherIsBetter ? numB > numA : numB < numA;

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
    </tr>
  );
}

const priceTierValue: Record<string, number> = {
  Free: 1,
  Starter: 2,
  Professional: 3,
  Enterprise: 4,
};

export function ComparisonTable({ datasetA, datasetB }: ComparisonTableProps) {
  if (!datasetA || !datasetB) {
    return (
      <div className="surface-card rounded-lg p-8 text-center">
        <p className="text-sm text-muted-foreground">Select two datasets above to compare them side by side.</p>
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
          </tr>
        </thead>
        <tbody>
          <MetricRow label="Records" valueA={formatNumber(datasetA.records)} valueB={formatNumber(datasetB.records)} />
          <MetricRow label="Accuracy" valueA={`${datasetA.accuracy}%`} valueB={`${datasetB.accuracy}%`} />
          <MetricRow label="Coverage" valueA={datasetA.geography.join(", ")} valueB={datasetB.geography.join(", ")} />
          <MetricRow label="Compliance Score" valueA={datasetA.complianceScore} valueB={datasetB.complianceScore} />
          <MetricRow
            label="Price Tier"
            valueA={datasetA.priceTier}
            valueB={datasetB.priceTier}
            higherIsBetter={false}
          />
          <MetricRow label="Columns" valueA={datasetA.columns.length} valueB={datasetB.columns.length} />
          <MetricRow label="Industries" valueA={datasetA.industries.length} valueB={datasetB.industries.length} />
        </tbody>
      </table>
    </div>
  );
}
