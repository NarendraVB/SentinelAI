import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          {title}
        </span>

        <Icon size={18} className="text-blue-400" />
      </div>

      <div className="mt-5 text-3xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}