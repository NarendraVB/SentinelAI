from __future__ import annotations

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class AgentVendor(str, enum.Enum):
    OPENAI = "OPENAI"
    ANTHROPIC = "ANTHROPIC"
    CURSOR = "CURSOR"
    GITHUB = "GITHUB"
    CUSTOM = "CUSTOM"


class AgentType(str, enum.Enum):
    ASSISTANT = "ASSISTANT"
    CODING = "CODING"
    INTERNAL = "INTERNAL"


class AgentStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    SUSPENDED = "SUSPENDED"


class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    vendor: Mapped[AgentVendor] = mapped_column(
        Enum(AgentVendor),
        nullable=False,
    )

    agent_type: Mapped[AgentType] = mapped_column(
        Enum(AgentType),
        nullable=False,
    )

    owner: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    status: Mapped[AgentStatus] = mapped_column(
        Enum(AgentStatus),
        default=AgentStatus.ACTIVE,
        nullable=False,
    )

    current_risk_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )