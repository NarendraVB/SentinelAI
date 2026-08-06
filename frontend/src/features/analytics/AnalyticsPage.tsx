import AnalyticsCharts from "./AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-zinc-400">
          Runtime security trends and insights.
        </p>
      </div>

      <AnalyticsCharts />
    </div>
  );
}