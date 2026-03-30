"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Cards } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/data";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
}

interface KPICardPropsInternal extends KPICardProps {
  accent?: string;
}

function KPICard({ title, value, subtitle, accent = "border-zinc-800" }: KPICardPropsInternal) {
  return (
    <Card className={`relative overflow-hidden border bg-zinc-900 transition-all duration-300 hover:scale-[1.02] ${accent}`}>
      <CardContent className="relative p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {title}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {value}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function KPICards({ cards }: { cards: Cards }) {
  const items: KPICardPropsInternal[] = [
    {
      title: "Real MRR",
      value: formatCurrency(cards.real_mrr),
      subtitle: `${cards.paying_active} paying members`,
      accent: "border-emerald-500/40",
    },
    {
      title: "At-Risk MRR",
      value: formatCurrency(cards.at_risk_mrr),
      subtitle: `${cards.cancelling} cancelling`,
      accent: "border-amber-500/40",
    },
    {
      title: "Lost MRR",
      value: formatCurrency(cards.lost_mrr),
      subtitle: `${cards.churned} churned`,
      accent: "border-red-500/40",
    },
    {
      title: "ARR",
      value: formatCurrency(cards.arr),
      subtitle: "Annualized",
      accent: "border-blue-500/40",
    },
    {
      title: "Paying Active",
      value: formatNumber(cards.paying_active),
      accent: "border-emerald-500/30",
    },
    {
      title: "Free Active",
      value: formatNumber(cards.free_active),
      accent: "border-zinc-700",
    },
    {
      title: "Cancelling",
      value: formatNumber(cards.cancelling),
      accent: "border-amber-500/30",
    },
    {
      title: "Churned",
      value: formatNumber(cards.churned),
      accent: "border-red-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {items.map((item) => (
        <KPICard key={item.title} {...item} />
      ))}
    </div>
  );
}
