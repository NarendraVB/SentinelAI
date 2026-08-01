from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.agent import Agent


class AgentRepository:
    """
    Handles all database operations for Agent entities.
    """

    def __init__(self, db: Session):
        self.db = db

    def create(self, agent: Agent) -> Agent:
        self.db.add(agent)
        self.db.commit()
        self.db.refresh(agent)
        return agent

    def get_by_id(self, agent_id: UUID) -> Agent | None:
        stmt = select(Agent).where(Agent.id == agent_id)
        return self.db.scalar(stmt)

    def get_by_external_id(self, external_id: str) -> Agent | None:
        stmt = select(Agent).where(
            Agent.external_id == external_id
        )
        return self.db.scalar(stmt)

    def list(self) -> list[Agent]:
        stmt = select(Agent).order_by(Agent.created_at.desc())
        return list(self.db.scalars(stmt).all())

    def delete(self, agent: Agent) -> None:
        self.db.delete(agent)
        self.db.commit()