from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class EventType(str, enum.Enum):
    PROMPT = "PROMPT"
    TOOL = "TOOL"
    API = "API"
    FILE = "FILE"
    SECRET = "SECRET"
    MCP = "MCP"


class EventSeverity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Event(TimestampMixin, Base):
    __tablename__ = "events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    agent_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("agents.id"),
        nullable=False,
    )

    event_type: Mapped[EventType] = mapped_column(
        Enum(EventType, name="event_type_enum"),
        nullable=False,
    )

    severity: Mapped[EventSeverity] = mapped_column(
        Enum(EventSeverity, name="event_severity_enum"),
        nullable=False,
    )

    occurred_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    event_data: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
    )