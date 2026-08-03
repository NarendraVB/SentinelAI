from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_alert_service
from app.models.alert import AlertStatus
from app.services.alert_service import AlertService

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)

@router.get("")
def list_alerts(
    service: AlertService = Depends(get_alert_service),
):
    return service.get_alerts()

@router.get("/{alert_id}")
def get_alert(
    alert_id: UUID,
    service: AlertService = Depends(get_alert_service),
):

    alert = service.get_alert(alert_id)

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return alert


@router.patch("/{alert_id}/acknowledge")
def acknowledge_alert(
    alert_id: UUID,
    service: AlertService = Depends(get_alert_service),
):

    alert = service.acknowledge_alert(alert_id)

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return alert
@router.patch("/{alert_id}/close")
def close_alert(
    alert_id: UUID,
    service: AlertService = Depends(get_alert_service),
):

    alert = service.close_alert(alert_id)

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found",
        )

    return alert