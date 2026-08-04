from app.alerts.engine import AlertEngine
from app.models.event import Event
from app.repositories.alert_repository import AlertRepository
from app.repositories.event_repository import EventRepository
from app.security.pipeline import SecurityPipeline
from app.services.alert_service import AlertService
from app.services.incident_service import IncidentService


class EventService:

    def __init__(
        self,
        repository: EventRepository,
        pipeline: SecurityPipeline,
        alert_engine: AlertEngine,
        alert_service: AlertService,
        incident_service: IncidentService,
        alert_repository: AlertRepository,
    ):
        self.repository = repository
        self.pipeline = pipeline
        self.alert_engine = alert_engine
        self.alert_service = alert_service
        self.incident_service = incident_service
        self.alert_repository = alert_repository

    def ingest_event(
        self,
        event: Event,
    ):
        """
        Persist event then analyze it.
        """
        # 1. Persist incoming event
        stored_event = self.repository.create(event)
        # 2. Analyze event
        analysis = self.pipeline.process(stored_event)
        # 3. Generate domain alerts
        alerts = self.alert_engine.generate(analysis)
        # 4. Persist alerts
        stored_alerts = []

        for alert in alerts:

            db_alert = self.alert_service.create_alert(
                event_id=stored_event.id,
                domain_alert=alert,
                risk_score=analysis.risk.score,
            )

            stored_alerts.append(db_alert)
        # 5. Create incident
        incident = self.incident_service.create_from_alerts(stored_alerts)
        # 6. Associate alerts with incident
        if incident:

            for alert in stored_alerts:
                alert.incident_id = incident.id
                self.alert_repository.update(alert)
        # 7. Return analysis
        return stored_event, analysis

    def get_event(
        self,
        event_id,
    ):
        return self.repository.get_by_id(event_id)

    def list_events(self):
        return self.repository.list()
