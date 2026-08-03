from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.event import Event


class EventRepository:
    """
    Handles all persistence operations for Event entities.
    """

    def __init__(self, db: Session):
        self.db = db

    def create(self, event: Event) -> Event:
        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)
        return event

    def get_by_id(self, event_id: UUID) -> Event | None:
        stmt = select(Event).where(Event.id == event_id)
        return self.db.scalar(stmt)

    def list(self) -> list[Event]:
        stmt = select(Event).order_by(Event.occurred_at.desc())
        return list(self.db.scalars(stmt).all())
