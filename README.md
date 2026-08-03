# SentinelAI

> CrowdStrike for AI Agents

SentinelAI is an AI runtime security platform that monitors autonomous AI agents, detects unsafe behavior, applies security policies, calculates risk, generates alerts, and groups related alerts into security incidents.

---

## Why SentinelAI?

Modern AI agents interact with:

- APIs
- Databases
- Cloud resources
- Internal documents
- Customer information

Traditional endpoint security solutions cannot understand AI reasoning, prompts, tool usage, or secret exposure.

SentinelAI provides runtime visibility into AI agent activity.

---

## Features

- AI Event Ingestion
- Prompt Injection Detection
- Secret Detection
- Policy Evaluation
- Risk Scoring
- Alert Generation
- Incident Creation
- REST API
- PostgreSQL Persistence
- Swagger Documentation

---

## Architecture

```text
AI Agent
    │
    ▼
POST /events
    │
    ▼
Event Service
    │
    ▼
Security Pipeline
    │
    ├── Detection Engine
    ├── Policy Engine
    └── Risk Engine
    │
    ▼
Alert Engine
    │
    ▼
Incident Engine
    │
    ▼
PostgreSQL
```

---

## Project Structure

```text
app/
│
├── api/
├── alerts/
├── core/
├── db/
├── detection/
├── incidents/
├── models/
├── policies/
├── repositories/
├── schemas/
├── security/
├── services/
```

---

## Technology Stack

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- Pytest

---

## Detection Pipeline

```text
Incoming Event
      │
      ▼
Detection
      │
      ▼
Policy Evaluation
      │
      ▼
Risk Calculation
      │
      ▼
Alert Generation
      │
      ▼
Incident Creation
```

---

## API

### Agents

- POST /agents
- GET /agents

### Events

- POST /events

### Alerts

- GET /alerts
- GET /alerts/{id}
- PATCH /alerts/{id}/acknowledge
- PATCH /alerts/{id}/close

### Incidents

- GET /incidents
- GET /incidents/{id}
- GET /incidents/{id}/alerts

### Metrics

- GET /metrics

### Health

- GET /health
- GET /health/ready

---

## Running Locally

```bash
git clone <repo>

cd SentinelAI

python -m venv venv

pip install -r requirements.txt

alembic upgrade head

uvicorn main:app --reload
```

---

## Current Status

Backend MVP Complete

Implemented:

- Event Processing
- Detection Engine
- Policy Engine
- Risk Engine
- Alert Lifecycle
- Incident Management
- Dashboard Metrics
- Health Checks

---

## Roadmap

- React SOC Dashboard
- OpenAI Agents SDK Connector
- LangGraph Connector
- CrewAI Connector
- Real-time Event Streaming
- Authentication & RBAC
- Multi-tenant Support

---

## License

MIT License