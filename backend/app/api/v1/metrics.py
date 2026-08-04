from fastapi import APIRouter, Depends

from app.core.dependencies import get_metrics_service
from app.services.metrics_service import MetricsService

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"],
)


@router.get("", summary="Get application metrics")
def metrics(
    service: MetricsService = Depends(get_metrics_service),
):
    return service.get_metrics()
