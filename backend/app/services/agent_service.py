from uuid import UUID

from app.models.agent import Agent
from app.repositories.agent_repository import AgentRepository


class AgentService:
    """
    Handles business logic for Agent operations.
    """

    def __init__(self, repository: AgentRepository):
        self.repository = repository

    def create_agent(self, agent: Agent) -> Agent:
        """
        Register a new AI Agent.
        """

        existing = self.repository.get_by_external_id(agent.external_id)

        if existing:
            raise ValueError(
                f"Agent with external_id " f"'{agent.external_id}' already exists."
            )

        return self.repository.create(agent)

    def get_agent(self, agent_id: UUID) -> Agent | None:
        return self.repository.get_by_id(agent_id)

    def list_agents(self) -> list[Agent]:
        return self.repository.list()

    def delete_agent(self, agent_id: UUID) -> None:
        agent = self.repository.get_by_id(agent_id)

        if not agent:
            raise ValueError("Agent not found.")

        self.repository.delete(agent)
