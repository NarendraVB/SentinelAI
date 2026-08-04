from fastapi import FastAPI

from app.api.v1.agents import router as agent_router
from app.api.v1.alerts import router as alert_router
from app.api.v1.events import router as event_router
from app.api.v1.health import router as health_router
from app.api.v1.incidents import router as incident_router
from app.api.v1.metrics import router as metrics_router
from app.core.exceptions import register_exception_handlers

app = FastAPI(
    title="SentinelAI",
    version="0.1.0",
)

register_exception_handlers(app)

app.include_router(agent_router)
app.include_router(event_router)
app.include_router(alert_router)
app.include_router(incident_router)
app.include_router(metrics_router)
app.include_router(health_router)
