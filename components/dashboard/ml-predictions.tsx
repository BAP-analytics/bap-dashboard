"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MLData } from "@/lib/types";
import { formatCurrency } from "@/lib/data";

const TIER_SHADES: Record<string, string> = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#eab308",
  WATCH: "#3b82f6",
  LOW: "#10b981",
};

interface Props {
  mlData: MLData;
}

export function MLPredictions({ mlData }: Props) {
  const tierData = Object.entries(mlData.tiers).map(([tier, data]) => ({
    name: tier,
    value: data.count,
    revenue: data.revenue,
  }));

  const featureData = mlData.feature_importance
    .slice(0, 10)
    .reverse()
    .map((f) => ({
      feature: f.feature.replace(/_/g, " "),
      importance: Math.round(f.value * 1000) / 10,
    }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Risk Tier Donut */}
      <Card className="border border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-zinc-300">
            Risk Tier Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#09090b"
                  strokeWidth={2}
                >
                  {tierData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={TIER_SHADES[entry.name] || "#52525b"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                  formatter={(value, name) => [
                    `${value} members`,
                    String(name),
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", color: "#a1a1aa" }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card className="border border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-zinc-300">
            Feature Importance (Top 10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureData}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={{ stroke: "#3f3f46" }}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  tick={{ fill: "#a1a1aa", fontSize: 10 }}
                  axisLine={{ stroke: "#3f3f46" }}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Importance"]}
                />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Model Stats */}
      <Card className="border border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-zinc-300">
            Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-zinc-800 bg-black/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Model AUC
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              {mlData.model_auc?.toFixed(3) || "N/A"}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
                style={{ width: `${(mlData.model_auc || 0) * 100}%` }}
              />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-black/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Expected Monthly Loss
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              {formatCurrency(mlData.expected_loss)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Probability-weighted revenue at risk
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(mlData.tiers).map(([tier, data]) => (
              <div key={tier} className="rounded-lg border border-zinc-800 bg-black/50 p-2 text-center">
                <p
                  className="text-xs font-semibold text-zinc-400"
                >
                  {tier}
                </p>
                <p className="text-sm font-bold text-white">{formatCurrency(data.revenue)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
