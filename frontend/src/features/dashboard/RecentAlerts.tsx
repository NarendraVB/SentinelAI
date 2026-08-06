import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useAlerts } from "@/hooks/useAlerts";

import type { Alert } from "@/types/alert";

import SeverityBadge from "@/features/alerts/SeverityBadge";
import StatusBadge from "@/features/alerts/StatusBadge";
import AlertDrawer from "@/features/alerts/AlertDrawer";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

export default function RecentAlerts() {
  const { data, isLoading } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const alerts = useMemo(() => {
    if (!data) return [];

    return [...data]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 5);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500">
        {isLoading ? <PageLoader /> : <ErrorState title="Error" description="An error occurred while fetching alerts." />}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Status</th>
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