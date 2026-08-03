from app.detection.result import DetectionResult
from app.policies.base import BasePolicy
from app.policies.decision import PolicyDecision


class PolicyEngine:

    def __init__(
        self,
        policies: list[BasePolicy],
    ):
        self.policies = policies

    def evaluate(
        self,
        findings: list[DetectionResult],
    ) -> list[PolicyDecision]:

        decisions: list[PolicyDecision] = []

        for finding in findings:
            for policy in self.policies:
                decisions.extend(policy.evaluate(finding))

        return decisions
