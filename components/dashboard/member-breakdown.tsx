"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS: Record<string, string> = {
  "Paying Active": "#10b981",
  "Free Active": "#3b82f6",
  "Cancelling": "#f59e0b",
  "Churned": "#ef4444",
  "Free Churned": "#71717a",
};

interface Props {
  breakdown: Record<string, number>;
}

export function MemberBreakdown({ breakdown }: Props) {
  const data = Object.entries(breakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="#09090b"
            strokeWidth={2}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name] || "#52525b"}
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
              `${Number(value)} (${((Number(value) / total) * 100).toFixed(1)}%)`,
              String(name),
            ]}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
