from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class AlertSeverity(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AlertStatus(str, Enum):
    OPEN = "OPEN"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    CLOSED = "CLOSED"


@dataclass(slots=True)
class Alert:
    title: str

    severity: AlertSeverity

    status: AlertStatus

    reason: str
