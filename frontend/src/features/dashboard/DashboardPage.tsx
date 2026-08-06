import {
  Activity,
  Bot,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

import MetricCard from "@/components/common/MetricCard";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";
import { useMetrics } from "@/hooks/useMetrics";

export default function DashboardPage() {
  const { data, isLoading, isError } = useMetrics();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-zinc-400">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-96 items-center justify-center text-red-400">
        Unable to load dashboard metrics.
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Overview"
        description="Monitor AI runtime activity across your environment."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Agents"
          value={data.agents}
          icon={Bot}
        />

        <MetricCard
          title="Events"
          value={data.events}
          icon={Activity}
        />

        <MetricCard
          title="Open Alerts"
          value={data.alerts_open}
          icon={TriangleAlert}
        />

        <MetricCard
          title="Open Incidents"
          value={data.incidents_open}
          icon={ShieldAlert}
        />
      </div>

      <Section title="Recent Alerts">
        <div className="mt-4 flex h-72 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
          Alerts table coming next...
        </div>
      </Section>

      <Section title="Analytics">
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
            Alert Severity Chart
          </div>

          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
            Incident Overview Chart
          </div>
        </div>
      </Section>
    </>
  );
}