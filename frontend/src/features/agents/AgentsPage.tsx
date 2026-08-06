import AgentsTable from "./AgentsTable";

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Agents
        </h1>

        <p className="text-zinc-400">
          Monitor registered AI agents.
        </p>
      </div>

      <AgentsTable />
    </div>
  );
}