from __future__ import annotations

from dataclasses import dataclass
from enum import Enum

from app.detection.result import DetectionResult
from app.policies.decision import PolicyDecision


class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


@dataclass(slots=True)
class RiskAssessment:
    score: int
    level: RiskLevel
    reasons: list[str]
    
class RiskEngine:
    """
    Calculates overall risk from findings and policy decisions.
    """

    MAX_SCORE = 100

    def calculate(
        self,
        findings: list[DetectionResult],
        decisions: list[PolicyDecision],
    ) -> RiskAssessment:

        score = sum(
            finding.risk_score
            for finding in findings
        )

        score = min(score, self.MAX_SCORE)

        if score >= 80:
            level = RiskLevel.CRITICAL
        elif score >= 50:
            level = RiskLevel.HIGH
        elif score >= 20:
            level = RiskLevel.MEDIUM
        else:
            level = RiskLevel.LOW

        reasons = [
            finding.title
            for finding in findings
        ]

        reasons.extend(
            decision.reason
            for decision in decisions
        )

        return RiskAssessment(
            score=score,
            level=level,
            reasons=reasons,
        )