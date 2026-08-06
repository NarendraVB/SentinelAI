import AlertsTable from "./AlertsTable";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Alerts
        </h1>

        <p className="text-zinc-400">
          Monitor and investigate AI security alerts.
        </p>
      </div>

      <AlertsTable />
    </div>
  );
}