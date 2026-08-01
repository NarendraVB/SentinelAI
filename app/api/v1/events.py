from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.event import Event
from app.repositories.event_repository import EventRepository
from app.schemas.event import (
    EventAnalysisResponse,
    EventCreate,
    EventResponse,
    SecurityAnalysisResponse
    
)
from app.schemas.policy import PolicyDecisionResponse
from app.schemas.risk import RiskResponse
from app.schemas.finding import FindingResponse
from app.services.event_service import EventService
from app.core.dependencies import get_event_service

router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


service: EventService = Depends(
    get_event_service
)


@router.post(
    "",
    response_model=EventAnalysisResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_event(
    payload: EventCreate,
    service: EventService = Depends(get_event_service),
):
    event = Event(**payload.model_dump())

    stored_event, analysis = service.ingest_event(event)

    return EventAnalysisResponse(
    event=EventResponse.model_validate(stored_event),
    analysis=SecurityAnalysisResponse(
        findings=[
            FindingResponse.model_validate(
                finding,
                from_attributes=True,
            )
            for finding in analysis.findings
        ],
        policy_decisions=[
            PolicyDecisionResponse.model_validate(
                decision,
                from_attributes=True,
            )
            for decision in analysis.decisions
        ],
        risk=RiskResponse.model_validate(
            analysis.risk,
            from_attributes=True,
        ),
    ),
)


@router.get(
    "",
    response_model=list[EventResponse],
)
def list_events(
    service: EventService = Depends(get_event_service),
):
    return service.list_events()


@router.get(
    "/{event_id}",
    response_model=EventResponse,
)
def get_event(
    event_id: UUID,
    service: EventService = Depends(get_event_service),
):
    event = service.get_event(event_id)

    if event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found.",
        )

    return event