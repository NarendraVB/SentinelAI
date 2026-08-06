import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

const severity = [
  { name: "Critical", value: 2 },
  { name: "High", value: 6 },
  { name: "Medium", value: 11 },
  { name: "Low", value: 3 },
];

const trend = [
  { day: "Mon", risk: 12 },
  { day: "Tue", risk: 24 },
  { day: "Wed", risk: 31 },
  { day: "Thu", risk: 28 },
  { day: "Fri", risk: 46 },
  { day: "Sat", risk: 40 },
  { day: "Sun", risk: 35 },
];

const incidents = [
  { month: "Jan", count: 4 },
  { month: "Feb", count: 8 },
  { month: "Mar", count: 5 },
  { month: "Apr", count: 10 },
  { month: "May", count: 7 },
  { month: "Jun", count: 9 },
];

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
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Total Alerts
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            22
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Open Incidents
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            4
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Average Risk
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            47
          </h3>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">
            Active Agents
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            8
          </h3>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Alert Severity Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={severity}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
              >
                {severity.map((_, index) => (
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

        <Card title="Risk Trend">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trend}>
              <CartesianGrid stroke="#27272a" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                dataKey="risk"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Monthly Incident Overview">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={incidents}>
            <CartesianGrid stroke="#27272a" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}