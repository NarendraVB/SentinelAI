from pydantic import BaseModel

from app.schemas.finding import FindingResponse
from app.schemas.policy import PolicyDecisionResponse
from app.schemas.risk import RiskResponse


class SecurityAnalysisResponse(BaseModel):
    findings: list[FindingResponse]
    policy_decisions: list[PolicyDecisionResponse]
    risk: RiskResponse
