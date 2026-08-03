from __future__ import annotations

from uuid import UUID

from app.alerts.model import Alert as DomainAlert
from app.models.alert import Alert, AlertSeverity, AlertStatus
from app.repositories.alert_repository import AlertRepository


class AlertService:

    def __init__(
        self,
        repository: AlertRepository,
    ):
        self.repository = repository

    def get_alerts(self):
        return self.repository.get_all()

    def get_alert(
        self,
        alert_id: UUID,
    ):
        return self.repository.get_by_id(alert_id)

    def create_alert(
        self,
        event_id,
        domain_alert: DomainAlert,
        risk_score: int,
    ) -> Alert:

        db_alert = Alert(
            event_id=event_id,
            title=domain_alert.title,
            severity=AlertSeverity(domain_alert.severity.value),
            status=AlertStatus.OPEN,
            reason=domain_alert.reason,
            risk_score=risk_score,
        )

        return self.repository.create(db_alert)

    def list_alerts(self):
        return self.repository.get_all()

    def acknowledge_alert(
        self,
        alert_id: UUID,
    ):

        alert = self.repository.get_by_id(alert_id)

        if not alert:
            return None

        alert.status = AlertStatus.ACKNOWLEDGED

        return self.repository.update(alert)

    def close_alert(
        self,
        alert_id: UUID,
    ):

        alert = self.repository.get_by_id(alert_id)

        if not alert:
            return None

        alert.status = AlertStatus.CLOSED

        return self.repository.update(alert)
