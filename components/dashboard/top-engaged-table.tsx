"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { TopEngaged } from "@/lib/types";
import { formatCurrency } from "@/lib/data";

interface Props {
  topEngaged: TopEngaged[];
}

export function TopEngagedTable({ topEngaged }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-400">#</TableHead>
          <TableHead className="text-zinc-400">Name</TableHead>
          <TableHead className="text-right text-zinc-400">Total Actions</TableHead>
          <TableHead className="text-right text-zinc-400">Last 30d</TableHead>
          <TableHead className="text-zinc-400">Status</TableHead>
          <TableHead className="text-right text-zinc-400">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topEngaged.map((m, i) => (
          <TableRow
            key={m.name}
            className="border-zinc-800/50 transition-colors hover:bg-white/[0.03]"
          >
            <TableCell className="text-zinc-500">{i + 1}</TableCell>
            <TableCell className="font-medium text-white">{m.name}</TableCell>
            <TableCell className="text-right text-zinc-300">
              {m.total_actions}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {m.last30d}
            </TableCell>
            <TableCell>
              <Badge
                className={
                  m.paying
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border border-zinc-700 bg-zinc-800 text-zinc-400"
                }
              >
                {m.paying ? "Paying" : "Free"}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {m.paying ? formatCurrency(m.price) : "--"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
