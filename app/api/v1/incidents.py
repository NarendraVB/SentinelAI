from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_incident_service
from app.services.incident_service import IncidentService

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)


@router.get("", summary="List all incidents")
def list_incidents(
    service: IncidentService = Depends(get_incident_service),
):
    return service.list_incidents()


@router.get("/{incident_id}", summary="Get an incident by ID")
def get_incident(
    incident_id: UUID,
    service: IncidentService = Depends(get_incident_service),
):

    incident = service.get_incident(incident_id)

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


@router.get("/{incident_id}/alerts", summary="Get alerts associated with an incident")
def get_incident_alerts(
    incident_id: UUID,
    service: IncidentService = Depends(get_incident_service),
):

    alerts = service.get_incident_alerts(incident_id)

    if alerts is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return alerts
