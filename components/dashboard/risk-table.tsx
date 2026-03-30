"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { RiskTableRow } from "@/lib/types";
import { formatCurrency } from "@/lib/data";

interface Props {
  riskTable: RiskTableRow[];
}

const TIER_STYLES: Record<string, string> = {
  CRITICAL: "bg-red-500/15 text-red-400 border-red-500/30 font-bold",
  HIGH: "bg-orange-500/15 text-orange-400 border-orange-500/30 font-semibold",
  MEDIUM: "bg-amber-500/15 text-amber-400 border-amber-500/30 font-medium",
  WATCH: "bg-blue-500/10 text-blue-400 border-blue-500/20 font-normal",
  LOW: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-normal",
  "N/A": "bg-transparent text-zinc-600 border-zinc-800 font-normal",
};

type SortKey = keyof RiskTableRow;

export function RiskTable({ riskTable }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("churn_pct");
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    return [...riskTable].sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      if (typeof av === "string" && typeof bv === "string") {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortAsc
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
  }, [riskTable, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <TableHead
      className="cursor-pointer select-none text-zinc-400 transition-colors hover:text-white"
      onClick={() => handleSort(field)}
    >
      {label}
      {sortKey === field && (
        <span className="ml-1 text-xs">{sortAsc ? "\u2191" : "\u2193"}</span>
      )}
    </TableHead>
  );

  return (
    <div className="max-h-[500px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <SortHeader label="Name" field="name" />
            <SortHeader label="Price" field="price" />
            <TableHead className="text-zinc-400">Risk</TableHead>
            <SortHeader label="Churn %" field="churn_pct" />
            <SortHeader label="Tenure" field="tenure" />
            <SortHeader label="Inactive" field="inactive_days" />
            <SortHeader label="7d Acts" field="week_actions" />
            <SortHeader label="30d Acts" field="actions_30d" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow
              key={row.name}
              className="border-zinc-800/50 transition-colors hover:bg-white/[0.03]"
            >
              <TableCell className="font-medium text-white">
                {row.name}
              </TableCell>
              <TableCell className="text-zinc-300">
                {formatCurrency(row.price)}
              </TableCell>
              <TableCell>
                <Badge
                  className={`border text-[10px] ${TIER_STYLES[row.risk_tier] || TIER_STYLES["N/A"]}`}
                >
                  {row.risk_tier}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-300">
                {row.churn_pct != null ? `${row.churn_pct}%` : "N/A"}
              </TableCell>
              <TableCell className="text-zinc-300">{row.tenure}d</TableCell>
              <TableCell
                className={
                  row.inactive_days >= 14
                    ? "font-bold text-red-400"
                    : row.inactive_days >= 7
                      ? "font-semibold text-amber-400"
                      : "text-zinc-400"
                }
              >
                {row.inactive_days}d
              </TableCell>
              <TableCell className="text-zinc-300">
                {row.week_actions}
              </TableCell>
              <TableCell className="text-zinc-300">
                {row.actions_30d}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
