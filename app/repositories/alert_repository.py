from __future__ import annotations

from uuid import UUID

from sqlalchemy.orm import Session

from app.models.alert import Alert


class AlertRepository:
    """
    Handles persistence of Alert objects.
    """

    def __init__(self, db: Session):
        self.db = db

    def create(self, alert: Alert) -> Alert:
        self.db.add(alert)
        self.db.commit()
        self.db.refresh(alert)
        return alert

    def get_all(self) -> list[Alert]:
        return self.db.query(Alert).order_by(Alert.created_at.desc()).all()

    def get_by_id(self, alert_id: UUID):
        return self.db.query(Alert).filter(Alert.id == alert_id).first()

    def update(self, alert: Alert) -> Alert:
        self.db.commit()
        self.db.refresh(alert)
        return alert
