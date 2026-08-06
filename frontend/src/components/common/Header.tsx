import { useHealth } from "@/hooks/useHealth";

export default function Header() {
  const { data } = useHealth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Security Operations Center
        </h2>

        <p className="text-xs text-zinc-500">
          AI Runtime Monitoring
        </p>
      </div>

      <div
        className={`text-sm font-medium ${
          data?.status === "healthy"
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        ● {data?.status ?? "Unknown"}
      </div>
    </header>
  );
}