from fastapi import FastAPI

from app.api.v1.agents import router as agent_router
from app.api.v1.events import router as event_router
from app.api.v1.alerts import router as alert_router

app = FastAPI(
    title="SentinelAI",
    version="0.1.0",
)

app.include_router(agent_router)
app.include_router(event_router)
app.include_router(alert_router)