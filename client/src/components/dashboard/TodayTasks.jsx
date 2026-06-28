import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TodayTasks({ tasks, loading = false }) {
  const today = new Date().toISOString().split("T")[0];
  const todayTasks = tasks.filter((task) => task.dueDate === today);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <div className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
            Loading today&apos;s tasks...
          </div>
        )}

        {!loading && todayTasks.length === 0 && (
          <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            No tasks are due today.
          </div>
        )}

        {todayTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start justify-between gap-4 rounded-lg border bg-background p-3"
          >
            <div className="min-w-0">
              <p className="font-medium">{task.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>

            <Badge variant="outline" className="capitalize">
              {task.status.replace("-", " ")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
