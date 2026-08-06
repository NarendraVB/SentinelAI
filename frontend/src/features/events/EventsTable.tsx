import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useEvents } from "@/hooks/useEvents";

import type { Event } from "@/services/events.service";

import EventDrawer from "./EventDrawer";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import FilterBar from "@/components/common/FilterBar";

export default function EventsTable() {
  const { data, isLoading, isError } = useEvents();

  const [search, setSearch] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<string>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  const events = useMemo(() => {
    if (!data) return [];

    return data.filter((event: Event) => {
      const q = search.toLowerCase();

      return (
        event.event_type.toLowerCase().includes(q) ||
        event.agent_id.toLowerCase().includes(q) ||
        event.prompt.toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-500">
        {isLoading ? <PageLoader /> : <ErrorState title="Error" description="An error occurred while fetching events." />}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-zinc-900 p-8 text-red-400">
        {isError ? <ErrorState title="Error" description="An error occurred while fetching events." /> : <PageLoader />}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">

        <FilterBar
    search={search}
    onSearchChange={setSearch}
/>

        <table className="w-full">

          <thead className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-400">

            <tr>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Risk</th>
              <th className="px-5 py-3">Created</th>
            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event.id);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-5 py-4 font-medium text-white">
                  {event.event_type}
                </td>

                <td className="px-5 py-4 text-zinc-300">
                  {event.agent_id}
                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-28 rounded bg-zinc-800">

                      <div
                        className="h-2 rounded bg-blue-500"
                        style={{
                          width: `${event.risk_score}%`,
                        }}
                      />

                    </div>

                    <span className="text-white">
                      {event.risk_score}
                    </span>

                  </div>

                </td>

                <td className="px-5 py-4 text-zinc-400">
                  {format(
                    new Date(event.created_at),
                    "dd MMM HH:mm"
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <EventDrawer
        open={drawerOpen}
        eventId={selectedEvent}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}