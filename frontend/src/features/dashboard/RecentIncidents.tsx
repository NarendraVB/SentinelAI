import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useIncidents } from "@/hooks/useIncidents";

import SeverityBadge from "@/features/incidents/SeverityBadge";
import StatusBadge from "@/features/incidents/StatusBadge";
import IncidentDrawer from "@/features/incidents/IncidentDrawer";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

import type { Incident } from "@/services/incidents.service";

export default function RecentIncidents() {
  const { data, isLoading } = useIncidents();

  const [selectedIncident, setSelectedIncident] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const incidents = useMemo(() => {
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
        {isLoading ? <PageLoader /> : <ErrorState />}
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
            {incidents.map((incident: Incident) => (
              <tr
                key={incident.id}
                onClick={() => {
                  setSelectedIncident(incident.id);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="px-5 py-4">
                  <SeverityBadge severity={incident.severity} />
                </td>

                <td className="px-5 py-4 font-medium text-white">
                  {incident.title}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={incident.status} />
                </td>

                <td className="px-5 py-4 text-zinc-400">
                  {format(
                    new Date(incident.created_at),
                    "dd MMM HH:mm"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <IncidentDrawer
        open={drawerOpen}
        incidentId={selectedIncident}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}