import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="flex h-80 items-center justify-center rounded-xl border border-red-900 bg-zinc-900">
      <div className="flex flex-col items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-red-500" />

        <p className="text-red-400">
          {message}
        </p>
      </div>
    </div>
  );
}