"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FreeUpsell } from "@/lib/types";

interface Props {
  freeUpsell: FreeUpsell[];
}

export function FreeUpsellTable({ freeUpsell }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-zinc-800 hover:bg-transparent">
          <TableHead className="text-zinc-400">#</TableHead>
          <TableHead className="text-zinc-400">Name</TableHead>
          <TableHead className="text-right text-zinc-400">Total Actions</TableHead>
          <TableHead className="text-right text-zinc-400">Last 30d</TableHead>
          <TableHead className="text-right text-zinc-400">Posts</TableHead>
          <TableHead className="text-right text-zinc-400">Best Streak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {freeUpsell.map((m, i) => (
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
            <TableCell className="text-right text-zinc-300">
              {m.posts}
            </TableCell>
            <TableCell className="text-right text-zinc-300">
              {m.streak}d
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
