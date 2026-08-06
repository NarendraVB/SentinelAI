import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { useAnalytics } from "@/hooks/useAnalytics";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";


const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
];

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default function AnalyticsCharts() {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Total Alerts
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {analytics.totalAlerts}
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Open Incidents
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {analytics.openIncidents}
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Average Risk
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {analytics.averageRisk}
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Active Agents
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {analytics.activeAgents}
          </h3>
        </div>
      </div>

      {/* Severity Distribution */}
      <Card title="Alert Severity Distribution">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={analytics.severityDistribution}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              label
            >
              {analytics.severityDistribution.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}