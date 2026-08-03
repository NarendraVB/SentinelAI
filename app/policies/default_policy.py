from app.detection.result import DetectionCategory, DetectionResult
from app.policies.base import BasePolicy
from app.policies.decision import PolicyAction, PolicyDecision


class DefaultPolicy(BasePolicy):

    def evaluate(
        self,
        finding: DetectionResult,
    ) -> list[PolicyDecision]:

        decisions: list[PolicyDecision] = []

        if finding.category == DetectionCategory.SECRET:
            decisions.append(
                PolicyDecision(
                    policy_name="Secret Exposure Policy",
                    action=PolicyAction.ALERT,
                    reason="Sensitive secret detected.",
                )
            )

        if finding.category == DetectionCategory.PROMPT:
            decisions.append(
                PolicyDecision(
                    policy_name="Prompt Safety Policy",
                    action=PolicyAction.ALERT,
                    reason="Suspicious prompt detected.",
                )
            )

        return decisions
