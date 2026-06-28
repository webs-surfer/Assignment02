import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "../components/task/TaskCard";
import TaskDialog from "../components/task/TaskDialog";
import DeleteDialog from "../components/task/DeleteDialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useSearch } from "@/SearchContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  createTask,
  deleteTask,
  getTaskErrorMessage,
  getTasks,
  updateTask,
} from "@/services/task.service";

const PAGE_LIMIT = 10;

const sortOptions = [
  { label: "Due date", value: "dueDate" },
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
  { label: "Priority high first", value: "-priority" },
  { label: "Priority low first", value: "priority" },
  { label: "Progress high first", value: "-progress" },
  { label: "Progress low first", value: "progress" },
  { label: "Category A-Z", value: "category" },
];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("dueDate");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { search } = useSearch();
  const loadTasks = async () => {
    
    try {
      setError("");
      setLoading(true);
      const data = await getTasks({
        search,
        sort,
        limit: PAGE_LIMIT,
        offset,
        search,
        ...(category.trim() ? { category: category.trim() } : {}),
      });
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (err) {
      setError(getTaskErrorMessage(err, "Unable to load tasks."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search , sort, category, offset]);

  const handleSave = async (task) => {
    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        await updateTask(editingTask.id, task);
      } else {
        await createTask(task);
        setOffset(0);
      }

      setEditingTask(null);
      setOpen(false);
      await loadTasks();
    } catch (err) {
      setError(getTaskErrorMessage(err, "Unable to save task."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    try {
      setError("");
      await deleteTask(task.id);
      const nextTotal = Math.max(total - 1, 0);
      if (offset >= nextTotal && offset > 0) {
        setOffset(Math.max(offset - PAGE_LIMIT, 0));
      } else {
        await loadTasks();
      }
    } catch (err) {
      setError(getTaskErrorMessage(err, "Unable to delete task."));
    }
  };

  const handleCreate = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setOffset(0);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setOffset(0);
  };

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + PAGE_LIMIT, total);
  const canGoPrevious = offset > 0;
  const canGoNext = offset + PAGE_LIMIT < total;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Task board</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sort, filter, and page through tasks from MongoDB.
          </p>
        </div>

        <Button onClick={handleCreate}>
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      <div className="grid gap-3 rounded-xl border bg-card p-4 shadow-xs md:grid-cols-[1fr_220px]">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="category-filter">
            Category
          </label>
          <Input
            id="category-filter"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Filter by category, e.g. Work"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Sort by</label>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-3">
        {loading && (
          <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            Loading tasks from server...
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="rounded-lg border border-dashed bg-card p-6 text-sm text-muted-foreground">
            No tasks found for this page.
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={(item) => {
              setEditingTask(item);
              setOpen(true);
            }}
            onDelete={(item) => {
              setSelectedTask(item);
              setDeleteOpen(true);
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm text-muted-foreground sm:flex-row">
        <span>
          Showing {pageStart}-{pageEnd} of {total} tasks
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={!canGoPrevious || loading}
            onClick={() => setOffset((current) => Math.max(current - PAGE_LIMIT, 0))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!canGoNext || loading}
            onClick={() => setOffset((current) => current + PAGE_LIMIT)}
          >
            Next
          </Button>
        </div>
      </div>

      <TaskDialog
        open={open}
        setOpen={setOpen}
        editingTask={editingTask}
        onSave={handleSave}
        saving={saving}
      />

      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        task={selectedTask}
        onDelete={handleDelete}
      />
    </div>
  );
}
