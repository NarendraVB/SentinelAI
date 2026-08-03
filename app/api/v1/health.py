from fastapi import APIRouter
from sqlalchemy import text

from app.db.session import SessionLocal

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("", summary="Check the health of the application")
def health():

    return {"status": "healthy"}


@router.get("/ready", summary="Check if the application is ready")
def ready():

    try:

        db = SessionLocal()

        db.execute(text("SELECT 1"))

        db.close()

        return {
            "status": "ready",
            "database": "connected",
        }

    except Exception:

        return {
            "status": "not ready",
            "database": "disconnected",
        }
