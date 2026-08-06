import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex h-80 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="flex items-center gap-3 text-zinc-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}