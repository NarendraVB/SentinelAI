from __future__ import annotations

from abc import ABC, abstractmethod

from app.detection.result import DetectionResult
from app.policies.decision import PolicyDecision


class BasePolicy(ABC):

    @abstractmethod
    def evaluate(
        self,
        finding: DetectionResult,
    ) -> list[PolicyDecision]:
        raise NotImplementedError