from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.agent import Agent
from app.repositories.agent_repository import AgentRepository
from app.schemas.agent import (
    AgentCreate,
    AgentResponse,
)
from app.services.agent_service import AgentService

router = APIRouter(
    prefix="/agents",
    tags=["Agents"],
)


def get_agent_service(db: Session = Depends(get_db)) -> AgentService:
    repository = AgentRepository(db)
    return AgentService(repository)


@router.post(
    "",
    response_model=AgentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_agent(
    payload: AgentCreate,
    service: AgentService = Depends(get_agent_service),
):
    try:
        agent = Agent(**payload.model_dump())
        return service.create_agent(agent)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )


@router.get(
    "",
    response_model=list[AgentResponse],
)
def list_agents(
    service: AgentService = Depends(get_agent_service),
):
    return service.list_agents()


@router.get(
    "/{agent_id}",
    response_model=AgentResponse,
)
def get_agent(
    agent_id: UUID,
    service: AgentService = Depends(get_agent_service),
):
    agent = service.get_agent(agent_id)

    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agent not found.",
        )

    return agent


@router.delete(
    "/{agent_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_agent(
    agent_id: UUID,
    service: AgentService = Depends(get_agent_service),
):
    try:
        service.delete_agent(agent_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )