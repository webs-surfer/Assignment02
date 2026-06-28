import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-700",
  warning: "bg-amber-500/15 text-amber-700",
  info: "bg-sky-500/10 text-sky-700",
};

export default function StatsCard({ title, value, icon: Icon, tone = "primary" }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{value}</h2>
        </div>
        {Icon && (
          <div className={cn("grid size-10 place-items-center rounded-lg", tones[tone])}>
            <Icon className="size-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
