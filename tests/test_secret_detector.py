from datetime import datetime
from uuid import uuid4

from app.detection.secret_detector import SecretDetector
from app.models.event import Event, EventSeverity, EventType


def create_event(payload: dict) -> Event:
    return Event(
        agent_id=uuid4(),
        event_type=EventType.PROMPT,
        severity=EventSeverity.LOW,
        occurred_at=datetime.now(),
        event_data=payload,
    )


def test_detects_aws_key():
    detector = SecretDetector()

    event = create_event(
        {
            "prompt":
            "AKIA1234567890ABCDEF"
        }
    )

    findings = detector.detect(event)

    assert len(findings) == 1
    assert findings[0].title == "AWS Access Key"


def test_no_secret_detected():
    detector = SecretDetector()

    event = create_event(
        {
            "prompt":
            "Hello world"
        }
    )

    findings = detector.detect(event)

    assert findings == []