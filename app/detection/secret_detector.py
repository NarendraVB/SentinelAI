import re

from app.detection.base import BaseDetector
from app.models.event import Event


AWS_KEY_PATTERN = re.compile(
    r"AKIA[0-9A-Z]{16}"
)


class SecretDetector(BaseDetector):
    def detect(self, event: Event) -> list[str]:
        findings: list[str] = []

        payload = str(event.event_data)

        if AWS_KEY_PATTERN.search(payload):
            findings.append(
                "AWS Access Key detected."
            )

        return findings