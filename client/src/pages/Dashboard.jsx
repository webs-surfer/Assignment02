import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, ListTodo, Timer } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import TodayTasks from "../components/dashboard/TodayTasks";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import { getTaskErrorMessage, getAllTasks } from "@/services/task.service";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError("");
        const data = await getAllTasks({ sort: "dueDate", limit: 100, offset: 0 });
        setTasks(data.tasks);
      } catch (err) {
        setError(getTaskErrorMessage(err, "Unable to load tasks."));
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  const pending = tasks.filter((task) => task.status === "pending").length;
  const inProgress = tasks.filter((task) => task.status === "in-progress").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-5 shadow-xs sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Today overview</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Good morning
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading
              ? "Loading your live task data..."
              : `You have ${pending + inProgress} active tasks and ${completed} finished.`}
          </p>
        </div>
        <div className="rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          Focus on high-priority work first.
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Tasks" value={loading ? "..." : total} icon={ListTodo} tone="primary" />
        <StatsCard title="Completed" value={loading ? "..." : completed} icon={CheckCircle2} tone="success" />
        <StatsCard title="Pending" value={loading ? "..." : pending} icon={CircleDashed} tone="warning" />
        <StatsCard title="In Progress" value={loading ? "..." : inProgress} icon={Timer} tone="info" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TodayTasks tasks={tasks} loading={loading} />
        <UpcomingTasks tasks={tasks} loading={loading} />
      </div>
    </div>
  );
}
