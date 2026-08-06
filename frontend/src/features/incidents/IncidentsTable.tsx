import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useIncidents } from "@/hooks/useIncidents";

import type { Incident } from "@/services/incidents.service";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";
import IncidentDrawer from "./IncidentDrawer";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import FilterBar from "@/components/common/FilterBar";
import Pagination from "@/components/common/Pagination";

export default function IncidentsTable() {
  const { data, isLoading, isError } = useIncidents();

  const [search, setSearch] = useState("");

  const [selectedIncident, setSelectedIncident] = useState<string>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

const PAGE_SIZE = 10;

  const incidents = useMemo(() => {
    if (!data) return [];

    return data.filter((incident: Incident) => {
    const q = search.toLowerCase();

    const matchesSearch =
      incident.title.toLowerCase().includes(q);

    const matchesSeverity =
      !severity || incident.severity === severity;

    const matchesStatus =
      !status || incident.status === status;

    return (
      matchesSearch &&
      matchesSeverity &&
      matchesStatus
    );
  });
}, [data, search, severity, status]);
const paginatedIncidents = useMemo(() => {
  const start = (page - 1) * PAGE_SIZE;

  return incidents.slice(start, start + PAGE_SIZE);
}, [incidents, page]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-500">
        {isLoading ? <PageLoader /> : <ErrorState title="Error" description="An error occurred while fetching incidents." />}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-zinc-900 p-8 text-red-400">
        {isError ? <ErrorState title="Error" description="An error occurred while fetching incidents." /> : <PageLoader />}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">

        <FilterBar
    search={search}
    onSearchChange={setSearch}
    severity={severity}
    onSeverityChange={setSeverity}
    status={status}
    onStatusChange={setStatus}
/>

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

            {paginatedIncidents.map((incident) => (

              <tr
                key={incident.id}
                onClick={() => {
                  setSelectedIncident(incident.id);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer border-b border-zinc-800 hover:bg-zinc-800/40"
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
                  {format(new Date(incident.created_at), "dd MMM HH:mm")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
        <Pagination
  page={page}
  totalPages={Math.ceil(incidents.length / PAGE_SIZE)}
  onChange={setPage}
/>

      </div>

      <IncidentDrawer
        open={drawerOpen}
        incidentId={selectedIncident}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}