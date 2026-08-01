from datetime import datetime
from uuid import uuid4

from app.detection.prompt_detector import PromptDetector
from app.models.event import Event, EventSeverity, EventType


def create_prompt_event(prompt: str) -> Event:
    return Event(
        agent_id=uuid4(),
        event_type=EventType.PROMPT,
        severity=EventSeverity.LOW,
        occurred_at=datetime.now(),
        event_data={
            "prompt": prompt,
        },
    )


def test_prompt_detector_detects_keyword():
    detector = PromptDetector()

    event = create_prompt_event(
        "delete the production database"
    )

    findings = detector.detect(event)

    assert len(findings) == 1
    assert findings[0].title == "Suspicious Prompt"


def test_prompt_detector_ignores_safe_prompt():
    detector = PromptDetector()

    event = create_prompt_event(
        "Summarize today's meeting."
    )

    findings = detector.detect(event)

    assert findings == []