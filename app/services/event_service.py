from app.detection.engine import DetectionEngine
from app.detection.registry import get_detectors
from app.models.event import Event
from app.repositories.event_repository import EventRepository


class EventService:
    """
    Handles event ingestion and security analysis.
    """

    def __init__(
        self,
        repository: EventRepository,
    ):
        self.repository = repository

        self.engine = DetectionEngine(
            get_detectors()
        )

    def ingest_event(
        self,
        event: Event,
    ):
        """
        Persist event then analyze it.
        """

        stored_event = self.repository.create(
            event
        )

        findings = self.engine.analyze(
            stored_event
        )

        return stored_event, findings

    def get_event(
        self,
        event_id,
    ):
        return self.repository.get_by_id(
            event_id
        )

    def list_events(self):
        return self.repository.list()