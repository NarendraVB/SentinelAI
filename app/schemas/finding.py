from __future__ import annotations

from typing import Any

from pydantic import BaseModel

from app.detection.result import (
    DetectionCategory,
    FindingSeverity,
)


class FindingResponse(BaseModel):
    detector: str
    category: DetectionCategory
    severity: FindingSeverity
    confidence: float
    risk_score: int
    title: str
    description: str
    evidence: dict[str, Any]