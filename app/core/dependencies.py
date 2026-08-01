from fastapi import Depends
from sqlalchemy.orm import Session

from app.alerts.engine import AlertEngine
from app.security.pipeline import SecurityPipeline
from app.security.risk import RiskEngine
from app.db.session import get_db
from app.detection.engine import DetectionEngine
from app.detection.registry import get_detectors
from app.policies.default_policy import DefaultPolicy
from app.policies.engine import PolicyEngine
from app.repositories.event_repository import EventRepository
from app.services.event_service import EventService
from app.repositories.alert_repository import AlertRepository
from app.services.alert_service import AlertService


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
    repository: AlertRepository = Depends(
        get_alert_repository
    ),
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


def get_event_service(
    db: Session = Depends(get_db),
    alert_service: AlertService = Depends(get_alert_service)
) -> EventService:

    repository = EventRepository(db)

    pipeline = get_security_pipeline()
    
    return EventService(
    repository=repository,
    pipeline=pipeline,
    alert_engine=AlertEngine(),
    alert_service=alert_service,
)