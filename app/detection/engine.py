from app.detection.base import BaseDetector
from app.models.event import Event


class DetectionEngine:
    def __init__(
        self,
        detectors: list[BaseDetector],
    ):
        self.detectors = detectors

    def analyze(
        self,
        event: Event,
    ) -> list[str]:

        findings: list[str] = []

        for detector in self.detectors:
            findings.extend(detector.detect(event))

        return findings
