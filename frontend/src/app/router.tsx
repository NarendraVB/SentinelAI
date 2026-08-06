import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/features/dashboard/DashboardPage";
import AlertsPage from "@/features/alerts/AlertsPage";
import IncidentsPage from "@/features/incidents/IncidentsPage";
import AgentsPage from "@/features/agents/AgentsPage";
import AnalyticsPage from "@/features/analytics/AnalyticsPage";
import { SettingsPage } from "@/features/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "alerts",
        element: <AlertsPage />,
      },
      {
        path: "incidents",
        element: <IncidentsPage />,
      },
      {
    path: "agents",
    element: <AgentsPage />,
      },
      {
    path: "analytics",
    element: <AnalyticsPage />,
      },
      {
    path: "settings",
    element: <SettingsPage />,
  },
    ],
  },
]);