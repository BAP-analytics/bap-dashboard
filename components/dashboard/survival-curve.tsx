"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { SurvivalData } from "@/lib/types";

interface Props {
  survival: SurvivalData;
}

export function SurvivalCurve({ survival }: Props) {
  const data = survival.checkpoints.map((cp, i) => ({
    day: `Day ${cp}`,
    survival: survival.survival[i],
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="survivalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
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
            formatter={(value) => [`${value}%`, "Survival"]}
          />
          <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "50% median", fill: "#ef4444", fontSize: 10 }} />
          <Area
            type="monotone"
            dataKey="survival"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#survivalGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
