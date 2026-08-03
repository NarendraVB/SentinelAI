from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class PolicyAction(str, Enum):
    ALLOW = "ALLOW"
    ALERT = "ALERT"
    BLOCK = "BLOCK"
    INCIDENT = "INCIDENT"


@dataclass(slots=True)
class PolicyDecision:
    policy_name: str
    action: PolicyAction
    reason: str
