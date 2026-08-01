from app.security.analysis import SecurityAnalysis
from app.security.risk import RiskLevel
from app.policies.decision import PolicyAction
from app.alerts.model import (
    Alert,
    AlertSeverity,
    AlertStatus,
)


class AlertEngine:
    """
    Generates alerts from a completed security analysis.
    """

    def generate(
        self,
        analysis: SecurityAnalysis,
    ) -> list[Alert]:

        alerts: list[Alert] = []

        if analysis.risk.level == RiskLevel.CRITICAL:
            alerts.append(
                Alert(
                    title="Critical AI Security Incident",
                    severity=AlertSeverity.CRITICAL,
                    status=AlertStatus.OPEN,
                    reason="Overall risk reached CRITICAL.",
                )
            )

        elif analysis.risk.level == RiskLevel.HIGH:
            alerts.append(
                Alert(
                    title="High Risk AI Activity",
                    severity=AlertSeverity.HIGH,
                    status=AlertStatus.OPEN,
                    reason="Overall risk reached HIGH.",
                )
            )

        for decision in analysis.decisions:

            if decision.action == PolicyAction.ALERT:

                alerts.append(
                    Alert(
                        title=decision.policy_name,
                        severity=AlertSeverity.MEDIUM,
                        status=AlertStatus.OPEN,
                        reason=decision.reason,
                    )
                )

        return alerts