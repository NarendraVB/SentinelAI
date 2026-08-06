import IncidentsTable from "./IncidentsTable";

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Incidents
        </h1>

        <p className="text-zinc-400">
          Investigate grouped AI security incidents.
        </p>
      </div>

      <IncidentsTable />
    </div>
  );
}