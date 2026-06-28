import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TaskFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3">

      {/* Search */}
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-1/3"
      />

      {/* Filter */}
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="md:w-48">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}