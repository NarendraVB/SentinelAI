from __future__ import annotations

from dataclasses import dataclass

from app.detection.result import DetectionResult
from app.policies.decision import PolicyDecision
from app.security.risk import RiskAssessment


@dataclass(slots=True)
class SecurityAnalysis:
    findings: list[DetectionResult]
    decisions: list[PolicyDecision]
    risk: RiskAssessment
