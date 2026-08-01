from app.detection.engine import DetectionEngine
from app.detection.registry import get_detectors
from app.models.event import Event
from app.repositories.event_repository import EventRepository
from app.security.pipeline import SecurityPipeline
from app.alerts.engine import AlertEngine
from app.services.alert_service import AlertService

class EventService:

    def __init__(
        self,
        repository: EventRepository,
        pipeline: SecurityPipeline,
        alert_engine: AlertEngine,
        alert_service: AlertService,
    ):
        self.repository = repository
        self.pipeline = pipeline
        self.alert_engine = alert_engine
        self.alert_service = alert_service

        

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
        alerts = self.alert_engine.generate(
    analysis
)
        for alert in alerts:
            self.alert_service.create_alert(
            event_id=stored_event.id,
            domain_alert=alert,
            risk_score=analysis.risk.score,
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