import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useAgents } from "@/hooks/useAgents";
import type { Agent } from "@/services/agents.services";

import AgentDrawer from "./AgentDrawer";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import FilterBar from "@/components/common/FilterBar";
import Pagination from "@/components/common/Pagination";

export default function AgentsTable() {
  const { data, isLoading, isError } = useAgents();

  const [search, setSearch] = useState("");

  const [selectedAgent, setSelectedAgent] = useState<string>();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

const PAGE_SIZE = 10;

  const agents = useMemo(() => {
    if (!data) return [];

    return data.filter((agent: Agent) => {
    const q = search.toLowerCase();

    const matchesSearch =
      agent.name.toLowerCase().includes(q) ||
      agent.vendor.toLowerCase().includes(q) ||
      agent.owner.toLowerCase().includes(q);

    const matchesStatus =
      !status || agent.status === status;

    return (
      matchesSearch &&
      matchesStatus
    );
  });
  
}, [data, search, status]);


  const paginatedAgents = useMemo(() => {
  const start = (page - 1) * PAGE_SIZE;

  return agents.slice(start, start + PAGE_SIZE);
}, [agents, page]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-500">
        {isLoading ? <PageLoader /> : <ErrorState title="Agent not found" description="The requested agent could not be found." />}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-zinc-900 p-8 text-red-400">
        {isError ? <ErrorState title="Error" description="An error occurred while fetching agents."    /> : <PageLoader />}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        <table className="w-full">

          <thead className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-400">

            <tr>
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Risk</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created</th>
            </tr>

          </thead>

          <tbody>

            {paginatedAgents.map((agent) => (

              <tr
                key={agent.id}
                onClick={() => {
                  setSelectedAgent(agent.id);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >

                <td className="px-5 py-4 font-medium text-white">
                  {agent.name}
                </td>

                <td className="px-5 py-4">
                  {agent.vendor}
                </td>

                <td className="px-5 py-4">
                  {agent.owner}
                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-28 rounded bg-zinc-800">

                      <div
                        className="h-2 rounded bg-blue-500"
                        style={{
                          width: `${agent.current_risk_score}%`,
                        }}
                      />

                    </div>

                    <span className="text-white">
                      {agent.current_risk_score}
                    </span>

                  </div>

                </td>

                <td className="px-5 py-4">

                  <span className="rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {agent.status}
                  </span>

                </td>

                <td className="px-5 py-4 text-zinc-400">

                  {format(
                    new Date(agent.created_at),
                    "dd MMM HH:mm"
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        <Pagination
            page={page}
            totalPages={Math.ceil(agents.length / PAGE_SIZE)}
            onChange={setPage}
            />
      </div>

      <AgentDrawer
        open={drawerOpen}
        agentId={selectedAgent}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
