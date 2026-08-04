from __future__ import annotations

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.agent import Agent
from app.models.alert import Alert, AlertStatus
from app.models.event import Event
from app.models.incident import Incident, IncidentStatus


class MetricsService:

    def __init__(self, db: Session):
        self.db = db

    def get_metrics(self):

        return {
            "agents": self.db.query(func.count(Agent.id)).scalar(),
            "events": self.db.query(func.count(Event.id)).scalar(),
            "alerts_open": (
                self.db.query(func.count(Alert.id))
                .filter(Alert.status == AlertStatus.OPEN)
                .scalar()
            ),
            "alerts_closed": (
                self.db.query(func.count(Alert.id))
                .filter(Alert.status == AlertStatus.CLOSED)
                .scalar()
            ),
            "incidents_open": (
                self.db.query(func.count(Incident.id))
                .filter(Incident.status == IncidentStatus.OPEN)
                .scalar()
            ),
            "incidents_total": (self.db.query(func.count(Incident.id)).scalar()),
        }
