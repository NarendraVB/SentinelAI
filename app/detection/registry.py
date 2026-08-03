from app.detection.base import BaseDetector
from app.detection.prompt_detector import PromptDetector
from app.detection.secret_detector import SecretDetector


def get_detectors() -> list[BaseDetector]:
    """
    Register all available detectors.

    Adding a new detector only requires
    registering it here.
    """
    return [
        PromptDetector(),
        SecretDetector(),
    ]
