import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className }: Props) {
  return (
    <Card className={`border border-zinc-800 bg-zinc-900 ${className || ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-300">
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-xs text-zinc-500">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
