from app.detection.base import BaseDetector
from app.models.event import Event


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
    def detect(self, event: Event) -> list[str]:
        findings: list[str] = []

        if event.event_type.value != "PROMPT":
            return findings

        prompt = (
            event.event_data.get("prompt", "")
            .lower()
        )

        for keyword in SUSPICIOUS_KEYWORDS:
            if keyword in prompt:
                findings.append(
                    f"Suspicious keyword detected: {keyword}"
                )

        return findings