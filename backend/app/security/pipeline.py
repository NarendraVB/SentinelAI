from app.detection.engine import DetectionEngine
from app.models.event import Event
from app.policies.engine import PolicyEngine
from app.security.analysis import SecurityAnalysis
from app.security.risk import RiskEngine


class SecurityPipeline:
    """
    Coordinates all security analysis stages.
    """

    def __init__(
        self,
        detection_engine: DetectionEngine,
        policy_engine: PolicyEngine,
        risk_engine: RiskEngine,
    ):
        self.detection_engine = detection_engine
        self.policy_engine = policy_engine
        self.risk_engine = risk_engine

    def process(
        self,
        event: Event,
    ) -> SecurityAnalysis:

        findings = self.detection_engine.analyze(event)

        decisions = self.policy_engine.evaluate(findings)

        risk = self.risk_engine.calculate(
            findings,
            decisions,
        )

        return SecurityAnalysis(
            findings=findings,
            decisions=decisions,
            risk=risk,
        )
