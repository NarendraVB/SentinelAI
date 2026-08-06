import EventsTable from "./EventsTable";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
        Events
        </h1>

        <p className="text-zinc-400">
          Monitor AI agent runtime events.
        </p>
      </div>

      <EventsTable />
    </div>
  );
}