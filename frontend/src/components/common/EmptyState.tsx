import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900">

      <Inbox
        size={48}
        className="mb-4 text-zinc-600"
      />

      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        {description}
      </p>

    </div>
  );
}