import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search tasks..." className="pl-9" />
      </div>
      <div className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
        RT
      </div>

    </header>
  );
}
