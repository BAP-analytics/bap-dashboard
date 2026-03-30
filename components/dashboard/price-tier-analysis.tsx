"use client";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import type { PriceTier } from "@/lib/types";

interface Props {
  priceAnalysis: Record<string, PriceTier>;
}

export function PriceTierAnalysis({ priceAnalysis }: Props) {
  const data = Object.entries(priceAnalysis).map(([label, tier]) => ({
    price: label,
    count: tier.count,
    rate: tier.rate,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="price"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
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
              if (name === "Churn Rate") return [`${value}%`, String(name)];
              return [value, String(name)];
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="count"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="Members"
            fillOpacity={0.6}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rate"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            name="Churn Rate"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
