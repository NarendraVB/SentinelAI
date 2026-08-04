from __future__ import annotations

from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.event import EventSeverity, EventType
from app.schemas.analysis import SecurityAnalysisResponse


class EventCreate(BaseModel):
    agent_id: UUID
    event_type: EventType
    severity: EventSeverity
    occurred_at: datetime
    event_data: dict[str, Any] = Field(default_factory=dict)


class EventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    agent_id: UUID
    event_type: EventType
    severity: EventSeverity
    occurred_at: datetime
    event_data: dict[str, Any]
    created_at: datetime
    updated_at: datetime


class EventAnalysisResponse(BaseModel):
    event: EventResponse
    analysis: SecurityAnalysisResponse
