import json
import re

from app.detection.base import BaseDetector
from app.detection.result import DetectionCategory, DetectionResult, FindingSeverity
from app.models.event import Event

AWS_KEY_PATTERN = re.compile(r"AKIA[0-9A-Z]{16}")


class SecretDetector(BaseDetector):
    def detect(self, event: Event) -> list[DetectionResult]:
        findings: list[DetectionResult] = []

        payload = json.dumps(event.event_data)

        if AWS_KEY_PATTERN.search(payload):
            findings.append(
                DetectionResult(
                    detector=self.__class__.__name__,
                    category=DetectionCategory.SECRET,
                    severity=FindingSeverity.CRITICAL,
                    confidence=0.99,
                    risk_score=40,
                    title="AWS Access Key",
                    description="AWS Access Key detected.",
                    evidence={
                        "pattern": "AKIA...",
                    },
                )
            )

        return findings
