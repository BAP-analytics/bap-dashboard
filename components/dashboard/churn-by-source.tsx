"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import type { SourceStat } from "@/lib/types";

interface Props {
  churnBySource: Record<string, SourceStat>;
}

export function ChurnBySource({ churnBySource }: Props) {
  const data = Object.entries(churnBySource)
    .map(([source, stat]) => ({
      source,
      total: stat.total,
      churned: stat.churned,
      rate: stat.rate,
    }))
    .sort((a, b) => b.total - a.total);

  const getShade = (rate: number) => {
    if (rate >= 50) return "#ef4444";
    if (rate >= 30) return "#f59e0b";
    if (rate >= 15) return "#3b82f6";
    return "#10b981";
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="source"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
            width={150}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "12px",
            }}
            formatter={(value, name) => {
              if (name === "rate") return [`${value}%`, "Churn Rate"];
              return [value, name === "total" ? "Total" : "Churned"];
            }}
          />
          <Bar dataKey="total" radius={[0, 4, 4, 0]} name="Total">
            {data.map((entry, index) => (
              <Cell key={index} fill={getShade(entry.rate)} fillOpacity={0.7} />
            ))}
            <LabelList
              dataKey="rate"
              position="right"
              formatter={(v) => `${v}%`}
              style={{ fill: "#a1a1aa", fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
