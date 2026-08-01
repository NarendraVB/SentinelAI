from __future__ import annotations

import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class AgentSource(str, enum.Enum):
    CONNECTOR = "CONNECTOR"
    SDK = "SDK"
    API = "API"
    SIMULATOR = "SIMULATOR"


class AgentType(str, enum.Enum):
    ASSISTANT = "ASSISTANT"
    CODING = "CODING"
    AUTONOMOUS = "AUTONOMOUS"
    WORKFLOW = "WORKFLOW"


class AgentStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    SUSPENDED = "SUSPENDED"


class Agent(TimestampMixin, Base):
    __tablename__ = "agents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    external_id: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    vendor: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    source: Mapped[AgentSource] = mapped_column(
        Enum(AgentSource, name="agent_source_enum"),
        nullable=False,
    )

    agent_type: Mapped[AgentType] = mapped_column(
        Enum(AgentType, name="agent_type_enum"),
        nullable=False,
    )

    owner: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    status: Mapped[AgentStatus] = mapped_column(
        Enum(AgentStatus, name="agent_status_enum"),
        default=AgentStatus.ACTIVE,
        nullable=False,
    )

    current_risk_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    last_seen: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )