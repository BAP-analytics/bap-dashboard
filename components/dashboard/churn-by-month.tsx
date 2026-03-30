"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  churnMonths: Record<string, number>;
}

export function ChurnByMonth({ churnMonths }: Props) {
  const data = Object.entries(churnMonths).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#71717a", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} name="Churned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
