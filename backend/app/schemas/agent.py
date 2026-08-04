from __future__ import annotations

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.agent import AgentSource, AgentStatus, AgentType


class AgentCreate(BaseModel):
    external_id: str = Field(..., max_length=255)
    name: str = Field(..., max_length=255)
    description: str | None = None
    vendor: str = Field(..., max_length=100)
    source: AgentSource
    agent_type: AgentType
    owner: str = Field(..., max_length=255)


class AgentUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=255)
    description: str | None = None
    owner: str | None = Field(default=None, max_length=255)
    status: AgentStatus | None = None


class AgentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    external_id: str
    name: str
    description: str | None
    vendor: str
    source: AgentSource
    agent_type: AgentType
    owner: str
    status: AgentStatus
    current_risk_score: int
    last_seen: datetime | None
    created_at: datetime
    updated_at: datetime
