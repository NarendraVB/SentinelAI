import { useMemo } from "react";

import { useAlerts } from "./useAlerts";
import { useAgents } from "./useAgents";
import { useIncidents } from "./useIncidents";

export function useAnalytics() {
  const alertsQuery = useAlerts();
  const incidentsQuery = useIncidents();
  const agentsQuery = useAgents();

  const analytics = useMemo(() => {
    const alerts = alertsQuery.data ?? [];
    const incidents = incidentsQuery.data ?? [];
    const agents = agentsQuery.data ?? [];

    const totalAlerts = alerts.length;

    const openIncidents = incidents.filter(
      (i) => i.status === "OPEN"
    ).length;

    const activeAgents = agents.filter(
      (a) => a.status === "ACTIVE"
    ).length;

    const averageRisk =
      alerts.length === 0
        ? 0
        : Math.round(
            alerts.reduce(
              (sum, alert) => sum + alert.risk_score,
              0
            ) / alerts.length
          );

    const severityDistribution = [
      {
        name: "Critical",
        value: alerts.filter(
          (a) => a.severity === "CRITICAL"
        ).length,
      },
      {
        name: "High",
        value: alerts.filter(
          (a) => a.severity === "HIGH"
        ).length,
      },
      {
        name: "Medium",
        value: alerts.filter(
          (a) => a.severity === "MEDIUM"
        ).length,
      },
      {
        name: "Low",
        value: alerts.filter(
          (a) => a.severity === "LOW"
        ).length,
      },
    ];

    return {
      totalAlerts,
      openIncidents,
      activeAgents,
      averageRisk,
      severityDistribution,
    };
  }, [
    alertsQuery.data,
    incidentsQuery.data,
    agentsQuery.data,
  ]);

  return {
    analytics,
    isLoading:
      alertsQuery.isLoading ||
      incidentsQuery.isLoading ||
      agentsQuery.isLoading,
  };
}