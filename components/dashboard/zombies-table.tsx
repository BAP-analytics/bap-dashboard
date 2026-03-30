"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Zombie } from "@/lib/types";
import { formatCurrency } from "@/lib/data";

interface Props {
  zombies: Zombie[];
}

export function ZombiesTable({ zombies }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-400">Name</TableHead>
          <TableHead className="text-right text-zinc-400">Price</TableHead>
          <TableHead className="text-right text-zinc-400">Inactive Days</TableHead>
          <TableHead className="text-right text-zinc-400">Total Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zombies.map((z) => (
          <TableRow
            key={z.name}
            className="border-zinc-800/50 transition-colors hover:bg-white/[0.03]"
          >
            <TableCell className="font-medium text-white">{z.name}</TableCell>
            <TableCell className="text-right text-zinc-300">
              {formatCurrency(z.price)}
            </TableCell>
            <TableCell className="text-right font-semibold text-red-400">
              {z.inactive_days}d
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {z.total_actions}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
