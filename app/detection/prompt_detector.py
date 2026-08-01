from app.detection.base import BaseDetector
from app.detection.result import DetectionResult, DetectionCategory, FindingSeverity
from app.models.event import Event,EventType


SUSPICIOUS_KEYWORDS = {
    "password",
    "secret",
    "private key",
    "rm -rf",
    "drop table",
    "delete",
    "customer",
    "payroll",
}


class PromptDetector(BaseDetector):
    def detect(self, event: Event) -> list[DetectionResult]:
        findings: list[DetectionResult] = []

        if event.event_type.value != EventType.PROMPT:
            return findings

        prompt = (
            event.event_data.get("prompt", "")
            .lower()
        )

        for keyword in SUSPICIOUS_KEYWORDS:
            if keyword in prompt:
                findings.append(
                DetectionResult(
                    detector=self.__class__.__name__,
                    category=DetectionCategory.PROMPT,
                    severity=FindingSeverity.MEDIUM,
                    confidence=0.85,

                    title="Suspicious Prompt",

                    description=f"Keyword '{keyword}' detected.",

                    evidence={
                        "keyword": keyword
                    },
                )
                )

        return findings