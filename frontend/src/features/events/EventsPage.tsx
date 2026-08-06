import EventsTable from "./EventsTable";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Runtime Events
        </h1>

        <p className="text-zinc-400">
          Inspect AI runtime events before they become alerts.
        </p>
      </div>

      <EventsTable />
    </div>
  );
}