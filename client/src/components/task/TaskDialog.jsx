import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const prioritySteps = ["low", "medium", "high"];
const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const emptyTask = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  category: "General",
  progress: 0,
  dueDate: "",
};

export default function TaskDialog({ open, setOpen, editingTask, onSave, saving = false }) {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    setForm(editingTask ?? emptyTask);
  }, [editingTask, open]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateStatus = (status) => {
    const progressByStatus = {
      pending: 0,
      "in-progress": 50,
      completed: 100,
    };

    setForm((current) => ({
      ...current,
      status,
      progress: progressByStatus[status],
    }));
  };

  const updatePriority = ([value]) => {
    updateField("priority", prioritySteps[value - 1]);
  };

  const updateProgress = ([value]) => {
    const status = value === 100 ? "completed" : value === 0 ? "pending" : "in-progress";

    setForm((current) => ({
      ...current,
      progress: value,
      status,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(form);
  };

  const priorityValue = prioritySteps.indexOf(form.priority) + 1;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit task" : "Create task"}</DialogTitle>
          <DialogDescription>
            Keep the title clear, set a due date, and choose a priority.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Design weekly report"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Add the details that matter"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="task-category">Category</Label>
              <Input
                id="task-category"
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                placeholder="Work"
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={updateStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent portal={false} position="popper" className="z-60">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="task-priority">Priority</Label>
                <span className="text-sm font-medium capitalize text-primary">
                  {priorityLabels[form.priority]}
                </span>
              </div>
              <Slider
                id="task-priority"
                min={1}
                max={3}
                step={1}
                value={[priorityValue]}
                onValueChange={updatePriority}
                aria-label="Task priority"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="task-due-date">Due date</Label>
              <Input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={(event) => updateField("dueDate", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2 rounded-lg border bg-background p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="task-progress">Progress</Label>
              <span className="text-sm font-medium text-primary">{form.progress}%</span>
            </div>
            <Slider
              id="task-progress"
              min={0}
              max={100}
              step={5}
              value={[form.progress]}
              onValueChange={updateProgress}
              aria-label="Task progress"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Not started</span>
              <span>In progress</span>
              <span>Done</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingTask ? "Save task" : "Add task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
