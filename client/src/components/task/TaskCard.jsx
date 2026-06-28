import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const priorityClasses = {
  high: "border-red-200 bg-red-50 text-red-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const progress = task.progress ?? 0;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {task.status.replace("-", " ")}
            </Badge>
            <Badge
              variant="outline"
              className={`capitalize ${priorityClasses[task.priority] ?? ""}`}
            >
              {task.priority}
            </Badge>
            <Badge variant="secondary">{task.dueDate}</Badge>
            <Badge variant="outline">{task.category || "General"}</Badge>
          </div>

          <div className="max-w-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:justify-end">
          <Button size="icon" variant="ghost" aria-label="Edit task" onClick={() => onEdit(task)}>
            <Pencil size={16} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            aria-label="Delete task"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(task)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
