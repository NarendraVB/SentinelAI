from __future__ import annotations

from abc import ABC, abstractmethod

from app.detection.result import DetectionResult
from app.models.event import Event


class BaseDetector(ABC):
    """
    Base interface for all detection rules.
    """

    @abstractmethod
    def detect(self, event: Event) -> list[DetectionResult]:
        """
        Analyze an event and return findings.

        Empty list = no findings.
        """
        raise NotImplementedError
