from __future__ import annotations

import enum
from dataclasses import dataclass
from typing import Any


class FindingSeverity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class DetectionCategory(str, enum.Enum):
    SECRET = "SECRET"
    PROMPT = "PROMPT"
    TOOL = "TOOL"
    API = "API"
    FILE = "FILE"
    MCP = "MCP"


@dataclass(slots=True)
class DetectionResult:
    detector: str
    category: DetectionCategory
    severity: FindingSeverity
    confidence: float
    risk_score: int
    title: str
    description: str
    evidence: dict[str, Any]