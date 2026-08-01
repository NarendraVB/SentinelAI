from app.detection.result import (
    DetectionCategory,
    DetectionResult,
    FindingSeverity,
)
from app.policies.default_policy import DefaultPolicy
from app.policies.engine import PolicyEngine


def test_secret_generates_alert():
    finding = DetectionResult(
        detector="SecretDetector",
        category=DetectionCategory.SECRET,
        severity=FindingSeverity.CRITICAL,
        confidence=0.99,
        risk_score=40,
        title="AWS Access Key",
        description="Detected",
        evidence={},
    )

    engine = PolicyEngine(
        [DefaultPolicy()]
    )

    decisions = engine.evaluate(
        [finding]
    )

    assert len(decisions) == 1
    assert decisions[0].action.value == "ALERT"