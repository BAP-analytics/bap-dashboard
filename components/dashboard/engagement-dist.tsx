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
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"];

interface Props {
  engagementDist: Record<string, number>;
}

export function EngagementDist({ engagementDist }: Props) {
  const data = Object.entries(engagementDist).map(([bucket, count]) => ({
    bucket: `${bucket} actions`,
    count,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="bucket"
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
          <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Members">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
