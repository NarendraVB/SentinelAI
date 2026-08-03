from pydantic import BaseModel

from app.policies.decision import PolicyAction


class PolicyDecisionResponse(BaseModel):
    policy_name: str
    action: PolicyAction
    reason: str
