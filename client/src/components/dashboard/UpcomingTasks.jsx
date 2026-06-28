import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const priorityClasses = {
  high: "border-red-200 bg-red-50 text-red-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function UpcomingTasks({ tasks, loading = false }) {
  const today = new Date();

  const upcoming = tasks
    .filter((task) => new Date(task.dueDate) > today)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <div className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
            Loading upcoming tasks...
          </div>
        )}

        {!loading && upcoming.length === 0 && (
          <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            Nothing scheduled after today.
          </div>
        )}

        {upcoming.map((task) => (
          <div
            key={task.id}
            className="flex items-start justify-between gap-4 rounded-lg border bg-background p-3"
          >
            <div className="min-w-0">
              <p className="font-medium">{task.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">Due {task.dueDate}</p>
            </div>

            <Badge
              variant="outline"
              className={`capitalize ${priorityClasses[task.priority] ?? ""}`}
            >
              {task.priority}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
