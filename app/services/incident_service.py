from __future__ import annotations

from app.models.incident import (
    Incident,
    IncidentSeverity,
    IncidentStatus,
)
from app.repositories.incident_repository import IncidentRepository
from app.models.alert import Alert

class IncidentService:

    def __init__(
        self,
        repository: IncidentRepository,
    ):
        self.repository = repository

    def create_incident(
        self,
        title: str,
        description: str,
        severity: IncidentSeverity,
        risk_score: int,
    ) -> Incident:

        incident = Incident(
            title=title,
            description=description,
            severity=severity,
            status=IncidentStatus.OPEN,
            risk_score=risk_score,
        )

        return self.repository.create(
            incident
        )

    def list_incidents(self):

        return self.repository.get_all()

    def get_incident(
        self,
        incident_id,
    ):

        return self.repository.get_by_id(
            incident_id
        )
        
    def create_from_alerts(
        self,
        alerts: list[Alert],
    ):
        if not alerts:
            return None

        highest_score = max(
            alert.risk_score
            for alert in alerts
        )

        severity = max(
            alerts,
            key=lambda a: a.risk_score,
        ).severity

        incident = Incident(
            title=f"{len(alerts)} Security Alerts",
            description="\n".join(
                alert.reason
                for alert in alerts
            ),
            severity=IncidentSeverity(
                severity.value
            ),
            status=IncidentStatus.OPEN,
            risk_score=highest_score,
        )

        return self.repository.create(
            incident
        )