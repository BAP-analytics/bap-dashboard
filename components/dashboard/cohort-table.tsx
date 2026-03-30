"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Cohort } from "@/lib/types";

interface Props {
  cohorts: Cohort[];
}

function getRetentionStyle(retention: number): string {
  if (retention >= 90) return "text-emerald-400 font-bold bg-emerald-500/10";
  if (retention >= 70) return "text-blue-400 font-semibold bg-blue-500/10";
  if (retention >= 50) return "text-amber-400 font-medium bg-amber-500/10";
  return "text-red-400 font-normal bg-red-500/10";
}

export function CohortTable({ cohorts }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-400">Cohort</TableHead>
          <TableHead className="text-right text-zinc-400">Total</TableHead>
          <TableHead className="text-right text-zinc-400">Active</TableHead>
          <TableHead className="text-right text-zinc-400">Churned</TableHead>
          <TableHead className="text-right text-zinc-400">Retention</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cohorts.map((cohort) => (
          <TableRow
            key={cohort.month}
            className="border-zinc-800/50 transition-colors hover:bg-white/[0.03]"
          >
            <TableCell className="font-medium text-white">
              {cohort.month}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {cohort.total}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {cohort.active}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {cohort.churned}
            </TableCell>
            <TableCell className="text-right">
              <span
                className={`inline-flex rounded-md px-2 py-0.5 text-xs ${getRetentionStyle(cohort.retention)}`}
              >
                {cohort.retention}%
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
