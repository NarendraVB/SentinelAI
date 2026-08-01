from pydantic import BaseModel

from app.security.risk import RiskLevel


class RiskResponse(BaseModel):
    score: int
    level: RiskLevel
    reasons: list[str]