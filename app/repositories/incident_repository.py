from __future__ import annotations

from uuid import UUID

from sqlalchemy.orm import Session

from app.models.incident import Incident


class IncidentRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        incident: Incident,
    ) -> Incident:

        self.db.add(incident)
        self.db.commit()
        self.db.refresh(incident)

        return incident

    def get_by_id(
        self,
        incident_id: UUID,
    ) -> Incident | None:

        return (
            self.db.query(Incident)
            .filter(
                Incident.id == incident_id
            )
            .first()
        )

    def get_all(self) -> list[Incident]:

        return (
            self.db.query(Incident)
            .order_by(
                Incident.created_at.desc()
            )
            .all()
        )

    def update(
        self,
        incident: Incident,
    ) -> Incident:

        self.db.commit()
        self.db.refresh(incident)

        return incident