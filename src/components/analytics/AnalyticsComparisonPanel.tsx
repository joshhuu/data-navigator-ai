import { useMemo } from "react";
import { Dataset } from "@/data/datasets";
import { computeAnalytics, formatAnalyticsNumber } from "@/utils/analytics";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, BarChart3, Shield, Target } from "lucide-react";

interface AnalyticsComparisonPanelProps {
  datasetA: Dataset;
  datasetB: Dataset;
}

const COLORS_A = ["hsl(174, 72%, 46%)", "hsl(174, 72%, 56%)", "hsl(174, 72%, 66%)"];
const COLORS_B = ["hsl(199, 89%, 48%)", "hsl(199, 89%, 58%)", "hsl(199, 89%, 68%)"];

export function AnalyticsComparisonPanel({ datasetA, datasetB }: AnalyticsComparisonPanelProps) {
  const analyticsA = useMemo(() => computeAnalytics([datasetA]), [datasetA]);
  const analyticsB = useMemo(() => computeAnalytics([datasetB]), [datasetB]);

  // Merge industry data for side-by-side comparison
  const industryComparison = useMemo(() => {
    const allIndustries = new Set([
      ...analyticsA.industryDistribution.map((i) => i.industry),
      ...analyticsB.industryDistribution.map((i) => i.industry),
    ]);

    return Array.from(allIndustries).map((industry) => {
      const aData = analyticsA.industryDistribution.find((i) => i.industry === industry);
      const bData = analyticsB.industryDistribution.find((i) => i.industry === industry);
      return {
        industry,
        datasetA: aData?.count || 0,
        datasetB: bData?.count || 0,
      };
    }).slice(0, 8);
  }, [analyticsA, analyticsB]);

  // Merge geography data
  const geographyComparison = useMemo(() => {
    const allGeos = new Set([
      ...analyticsA.geographyDistribution.map((g) => g.geography),
      ...analyticsB.geographyDistribution.map((g) => g.geography),
    ]);

    return Array.from(allGeos).map((geography) => {
      const aData = analyticsA.geographyDistribution.find((g) => g.geography === geography);
      const bData = analyticsB.geographyDistribution.find((g) => g.geography === geography);
      return {
        geography,
        datasetA: aData?.count || 0,
        datasetB: bData?.count || 0,
      };
    });
  }, [analyticsA, analyticsB]);

  // Compliance comparison data
  const complianceData = [
    { name: datasetA.name.split(" ").slice(0, 2).join(" "), compliance: datasetA.complianceScore },
    { name: datasetB.name.split(" ").slice(0, 2).join(" "), compliance: datasetB.complianceScore },
  ];

  // Records & Accuracy comparison
  const recordsAccuracyData = [
    {
      name: "Dataset A",
      records: datasetA.records,
      accuracy: datasetA.accuracy,
      recordsMil: Math.round(datasetA.records / 1000000),
    },
    {
      name: "Dataset B",
      records: datasetB.records,
      accuracy: datasetB.accuracy,
      recordsMil: Math.round(datasetB.records / 1000000),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dataset A Summary */}
        <div className="surface-card rounded-lg p-4 border-l-4 border-primary">
          <h3 className="text-xs font-semibold text-primary mb-3">{datasetA.name}</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Target className="h-3 w-3 text-primary" />
                <p className="text-[10px] text-muted-foreground uppercase">Records</p>
              </div>
              <p className="text-lg font-bold text-foreground">
                {formatAnalyticsNumber(datasetA.records)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="h-3 w-3 text-primary" />
                <p className="text-[10px] text-muted-foreground uppercase">Accuracy</p>
              </div>
              <p className="text-lg font-bold text-foreground">{datasetA.accuracy}%</p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Shield className="h-3 w-3 text-primary" />
                <p className="text-[10px] text-muted-foreground uppercase">Compliance</p>
              </div>
              <p className="text-lg font-bold text-foreground">{datasetA.complianceScore}%</p>
            </div>
          </div>
        </div>

        {/* Dataset B Summary */}
        <div className="surface-card rounded-lg p-4 border-l-4 border-[hsl(199,89%,48%)]">
          <h3 className="text-xs font-semibold text-[hsl(199,89%,48%)] mb-3">{datasetB.name}</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Target className="h-3 w-3 text-[hsl(199,89%,48%)]" />
                <p className="text-[10px] text-muted-foreground uppercase">Records</p>
              </div>
              <p className="text-lg font-bold text-foreground">
                {formatAnalyticsNumber(datasetB.records)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="h-3 w-3 text-[hsl(199,89%,48%)]" />
                <p className="text-[10px] text-muted-foreground uppercase">Accuracy</p>
              </div>
              <p className="text-lg font-bold text-foreground">{datasetB.accuracy}%</p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Shield className="h-3 w-3 text-[hsl(199,89%,48%)]" />
                <p className="text-[10px] text-muted-foreground uppercase">Compliance</p>
              </div>
              <p className="text-lg font-bold text-foreground">{datasetB.complianceScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution Comparison */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Industry Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={industryComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="industry"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="datasetA" fill="hsl(174, 72%, 46%)" name="Dataset A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="datasetB" fill="hsl(199, 89%, 48%)" name="Dataset B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geography Distribution Comparison */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Geography Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={geographyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="geography"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="datasetA" fill="hsl(174, 72%, 46%)" name="Dataset A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="datasetB" fill="hsl(199, 89%, 48%)" name="Dataset B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Records vs Accuracy */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Records vs Accuracy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recordsAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatAnalyticsNumber}
                label={{ value: 'Records', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
                label={{ value: 'Accuracy %', angle: 90, position: 'insideRight', style: { fontSize: 10 } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "Records") return formatAnalyticsNumber(value);
                  return value;
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar yAxisId="left" dataKey="records" fill="hsl(174, 72%, 46%)" name="Records" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="accuracy" fill="hsl(199, 89%, 48%)" name="Accuracy %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Comparison */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Compliance Score Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="compliance" radius={[0, 4, 4, 0]}>
                <Cell fill="hsl(174, 72%, 46%)" />
                <Cell fill="hsl(199, 89%, 48%)" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
