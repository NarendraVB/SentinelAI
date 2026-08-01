from app.alerts.engine import AlertEngine
from app.alerts.model import AlertSeverity
from app.security.analysis import SecurityAnalysis
from app.security.risk import (
    RiskAssessment,
    RiskLevel,
)
from app.policies.decision import (
    PolicyAction,
    PolicyDecision,
)


def test_high_risk_generates_alert():
    analysis = SecurityAnalysis(
        findings=[],
        decisions=[
            PolicyDecision(
                policy_name="Prompt Policy",
                action=PolicyAction.ALERT,
                reason="Prompt detected",
            )
        ],
        risk=RiskAssessment(
            score=50,
            level=RiskLevel.HIGH,
            reasons=[],
        ),
    )

    engine = AlertEngine()

    alerts = engine.generate(
        analysis
    )

    assert len(alerts) >= 1
    assert alerts[0].severity == AlertSeverity.HIGH