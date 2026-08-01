from app.security.risk import (
    RiskEngine,
    RiskLevel,
)
from app.detection.result import (
    DetectionCategory,
    DetectionResult,
    FindingSeverity,
)
from app.policies.decision import (
    PolicyAction,
    PolicyDecision,
)


def test_risk_calculation():
    findings = [
        DetectionResult(
            detector="PromptDetector",
            category=DetectionCategory.PROMPT,
            severity=FindingSeverity.MEDIUM,
            confidence=0.9,
            risk_score=10,
            title="Prompt",
            description="",
            evidence={},
        ),
        DetectionResult(
            detector="SecretDetector",
            category=DetectionCategory.SECRET,
            severity=FindingSeverity.CRITICAL,
            confidence=0.9,
            risk_score=40,
            title="AWS",
            description="",
            evidence={},
        ),
    ]

    decisions = [
        PolicyDecision(
            policy_name="Secret",
            action=PolicyAction.ALERT,
            reason="Secret detected",
        )
    ]

    engine = RiskEngine()

    risk = engine.calculate(
        findings,
        decisions,
    )

    assert risk.score == 50
    assert risk.level == RiskLevel.HIGH