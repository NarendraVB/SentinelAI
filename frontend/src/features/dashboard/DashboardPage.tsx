import {
  Activity,
  Bot,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

import MetricCard from "@/components/common/MetricCard";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Monitor AI runtime activity across your environment."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Agents"
          value="0"
          icon={Bot}
        />

        <MetricCard
          title="Alerts"
          value="0"
          icon={TriangleAlert}
        />

        <MetricCard
          title="Incidents"
          value="0"
          icon={ShieldAlert}
        />

        <MetricCard
          title="Average Risk"
          value="0%"
          icon={Activity}
        />
      </div>

      <Section title="Recent Alerts">
        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
          Alerts table will appear here
        </div>
      </Section>

      <Section title="Risk Overview">
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
            Risk Distribution Chart
          </div>

          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900 text-zinc-500">
            Severity Breakdown
          </div>
        </div>
      </Section>
    </>
  );
}