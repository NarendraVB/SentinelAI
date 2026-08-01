from __future__ import annotations

from app.models.alert import (
    Alert,
    AlertSeverity,
    AlertStatus,
)
from app.repositories.alert_repository import AlertRepository
from app.alerts.model import Alert as DomainAlert


class AlertService:

    def __init__(
        self,
        repository: AlertRepository,
    ):
        self.repository = repository

    def create_alert(
        self,
        event_id,
        domain_alert: DomainAlert,
        risk_score: int,
    ) -> Alert:

        db_alert = Alert(
            event_id=event_id,
            title=domain_alert.title,
            severity=AlertSeverity(
                domain_alert.severity.value
            ),
            status=AlertStatus.OPEN,
            reason=domain_alert.reason,
            risk_score=risk_score,
        )

        return self.repository.create(db_alert)

    def list_alerts(self):
        return self.repository.get_all()