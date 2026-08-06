import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useAlerts } from "@/hooks/useAlerts";

import type { Alert } from "@/types/alert";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";
import AlertDrawer from "./AlertDrawer";

export default function AlertsTable() {
  const { data, isLoading, isError } = useAlerts();

  const [search, setSearch] = useState("");

  const [selectedAlert, setSelectedAlert] = useState<string>();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const alerts = useMemo(() => {
    if (!data) return [];

    return data.filter((alert) => {
      const q = search.toLowerCase();

      return (
        alert.title.toLowerCase().includes(q) ||
        alert.reason.toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-500">
        Loading alerts...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-zinc-900 p-8 text-red-400">
        Failed to load alerts.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">

        <div className="border-b border-zinc-800 p-4">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts..."
            className="w-80 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />

        </div>

        <table className="w-full">

          <thead className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-400">

            <tr>

              <th className="px-5 py-3">Severity</th>

              <th className="px-5 py-3">Title</th>

              <th className="px-5 py-3">Status</th>

              <th className="px-5 py-3">Risk</th>

              <th className="px-5 py-3">Created</th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert: Alert) => (

              <tr
                key={alert.id}
                onClick={() => {
                  setSelectedAlert(alert.id);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-5 py-4">
                  <SeverityBadge severity={alert.severity} />
                </td>

                <td className="px-5 py-4 font-medium text-white">
                  {alert.title}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={alert.status} />
                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-28 rounded bg-zinc-800">

                      <div
                        className="h-2 rounded bg-red-500"
                        style={{
                          width: `${alert.risk_score}%`,
                        }}
                      />

                    </div>

                    <span className="text-white">
                      {alert.risk_score}
                    </span>

                  </div>

                </td>

                <td className="px-5 py-4 text-zinc-400">

                  {format(
                    new Date(alert.created_at),
                    "dd MMM HH:mm"
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <AlertDrawer
        open={drawerOpen}
        alertId={selectedAlert}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}