import { NavLink } from "react-router-dom";
import { CheckSquare, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground md:min-h-screen md:w-64 md:border-r">
      <div className="flex items-center justify-between px-4 py-4 md:block md:p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sidebar-foreground/55">
            Workspace
          </p>
          <h1 className="mt-1 text-lg font-semibold">Task Tracker</h1>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:block md:space-y-1 md:overflow-visible md:px-5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition md:w-full",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )
              }
            >
              <Icon size={18} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
