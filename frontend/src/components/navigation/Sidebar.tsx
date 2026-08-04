import {
  Bot,
  ChartColumn,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    to: "/",
  },
  {
    label: "Alerts",
    icon: TriangleAlert,
    to: "/alerts",
  },
  {
    label: "Incidents",
    icon: ShieldAlert,
    to: "/incidents",
  },
  {
    label: "Agents",
    icon: Bot,
    to: "/agents",
  },
  {
    label: "Analytics",
    icon: ChartColumn,
    to: "/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <div>
    <h1 className="text-2xl font-bold tracking-tight text-white">
        SentinelAI
    </h1>

    <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
        Runtime Security Platform
    </p>
</div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}