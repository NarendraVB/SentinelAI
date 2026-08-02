from __future__ import annotations

from app.alerts.model import Alert
from app.models.incident import (
    IncidentSeverity,
)


class IncidentEngine:
    """
    Converts a collection of alerts into a single incident.
    """

    def should_create_incident(
        self,
        alerts: list[Alert],
    ) -> bool:

        return len(alerts) > 0

    def determine_severity(
        self,
        alerts: list[Alert],
    ) -> IncidentSeverity:

        severities = {
            alert.severity.value
            for alert in alerts
        }

        if "CRITICAL" in severities:
            return IncidentSeverity.CRITICAL

        if "HIGH" in severities:
            return IncidentSeverity.HIGH

        if "MEDIUM" in severities:
            return IncidentSeverity.MEDIUM

        return IncidentSeverity.LOW

    def generate_title(
        self,
        alerts: list[Alert],
    ) -> str:

        if len(alerts) == 1:
            return alerts[0].title

        return f"{len(alerts)} Security Alerts Detected"

    def generate_description(
        self,
        alerts: list[Alert],
    ) -> str:

        return "\n".join(
            f"- {alert.reason}"
            for alert in alerts
        )