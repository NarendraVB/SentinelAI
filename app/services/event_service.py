from app.detection.engine import DetectionEngine
from app.detection.registry import get_detectors
from app.models.event import Event
from app.repositories.event_repository import EventRepository
from app.security.pipeline import SecurityPipeline

class EventService:
    """
    Handles event ingestion and security analysis.
    """

    def __init__(
        self,
        repository: EventRepository,
        pipeline: SecurityPipeline,
    ):
        self.repository = repository
        self.pipeline = pipeline

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

        stored_event = self.repository.create(event)
        analysis = self.pipeline.process(
            stored_event
        )

        return stored_event, analysis

    def get_event(
        self,
        event_id,
    ):
        return self.repository.get_by_id(
            event_id
        )

    def list_events(self):
        return self.repository.list()