from fastapi import Depends
from sqlalchemy.orm import Session

from app.alerts.engine import AlertEngine
from app.db.session import get_db
from app.detection.engine import DetectionEngine
from app.detection.registry import get_detectors
from app.policies.default_policy import DefaultPolicy
from app.policies.engine import PolicyEngine
from app.repositories.alert_repository import AlertRepository
from app.repositories.event_repository import EventRepository
from app.repositories.incident_repository import IncidentRepository
from app.security.pipeline import SecurityPipeline
from app.security.risk import RiskEngine
from app.services.alert_service import AlertService
from app.services.event_service import EventService
from app.services.incident_service import IncidentService
from app.services.metrics_service import MetricsService


def get_detection_engine() -> DetectionEngine:
    return DetectionEngine(get_detectors())


def get_policy_engine() -> PolicyEngine:
    return PolicyEngine(
        [
            DefaultPolicy(),
        ]
    )


def get_alert_repository(
    db=Depends(get_db),
):
    return AlertRepository(db)


def get_alert_service(
    repository: AlertRepository = Depends(get_alert_repository),
):
    return AlertService(repository)


def get_risk_engine() -> RiskEngine:
    return RiskEngine()


def get_security_pipeline() -> SecurityPipeline:
    return SecurityPipeline(
        detection_engine=get_detection_engine(),
        policy_engine=get_policy_engine(),
        risk_engine=get_risk_engine(),
    )


def get_incident_repository(
    db: Session = Depends(get_db),
):

    return IncidentRepository(db)


def get_incident_service(
    repository: IncidentRepository = Depends(get_incident_repository),
):

    return IncidentService(repository)


def get_event_service(
    db: Session = Depends(get_db),
    alert_service: AlertService = Depends(get_alert_service),
    incident_service: IncidentService = Depends(get_incident_service),
) -> EventService:

    repository = EventRepository(db)

    pipeline = get_security_pipeline()
    alert_repository = AlertRepository(db)

    return EventService(
        repository=repository,
        pipeline=pipeline,
        alert_engine=AlertEngine(),
        alert_service=alert_service,
        incident_service=incident_service,
        alert_repository=alert_repository,
    )


def get_metrics_service(
    db: Session = Depends(get_db),
):

    return MetricsService(db)
