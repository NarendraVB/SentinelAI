from __future__ import annotations

from dataclasses import dataclass

from app.security.risk import RiskAssessment
from app.detection.result import DetectionResult
from app.policies.decision import PolicyDecision


@dataclass(slots=True)
class SecurityAnalysis:
    findings: list[DetectionResult]
    decisions: list[PolicyDecision]
    risk: RiskAssessment