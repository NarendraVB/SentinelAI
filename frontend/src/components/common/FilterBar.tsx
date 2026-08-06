import { Search } from "lucide-react";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;

  severity?: string;
  onSeverityChange?: (value: string) => void;

  status?: string;
  onStatusChange?: (value: string) => void;
}

export default function FilterBar({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
  status,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-zinc-800 p-4">

      <div className="relative">

        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="w-72 rounded-md border border-zinc-700 bg-zinc-950 py-2 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
        />

      </div>

      {onSeverityChange && (
        <select
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
        >
          <option value="">All Severities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      )}

      {onStatusChange && (
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="ACKNOWLEDGED">Acknowledged</option>
          <option value="CLOSED">Closed</option>
          <option value="ACTIVE">Active</option>
        </select>
      )}

    </div>
  );
}