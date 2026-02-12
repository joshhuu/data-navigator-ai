import { AnalyticsData, formatAnalyticsNumber } from "@/utils/analytics";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, BarChart3, Globe, Target } from "lucide-react";

interface AnalyticsPanelProps {
  analytics: AnalyticsData;
}

const COLORS = [
  "hsl(174, 72%, 46%)",
  "hsl(199, 89%, 48%)",
  "hsl(152, 69%, 46%)",
  "hsl(38, 92%, 50%)",
  "hsl(262, 83%, 58%)",
  "hsl(0, 84%, 60%)",
  "hsl(174, 72%, 66%)",
  "hsl(199, 89%, 68%)",
];

export function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="surface-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <p className="text-xs text-muted-foreground uppercase">Total Records</p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatAnalyticsNumber(analytics.totalRecords)}
          </p>
        </div>
        <div className="surface-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <p className="text-xs text-muted-foreground uppercase">Avg Accuracy</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{analytics.avgAccuracy}%</p>
        </div>
        <div className="surface-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-primary" />
            <p className="text-xs text-muted-foreground uppercase">Total Datasets</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{analytics.totalDatasets}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Industry Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.industryDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="industry"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="hsl(174, 72%, 46%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geography Distribution */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Geography Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.geographyDistribution}
                dataKey="count"
                nameKey="geography"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ geography, percentage }) => `${geography.split(" ")[0]} ${percentage}%`}
              >
                {analytics.geographyDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Trend */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Growth Trend (Simulated)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.growthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={formatAnalyticsNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => formatAnalyticsNumber(value)}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Line
                type="monotone"
                dataKey="records"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth={2}
                name="Historical"
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="hsl(174, 72%, 46%)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Records vs Accuracy Radar */}
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Top Datasets - Accuracy Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={analytics.recordAccuracyData.slice(0, 6)}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Radar
                name="Accuracy %"
                dataKey="accuracy"
                stroke="hsl(174, 72%, 46%)"
                fill="hsl(174, 72%, 46%)"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
