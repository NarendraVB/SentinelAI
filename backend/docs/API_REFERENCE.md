# SentinelAI API Reference

## Overview

The SentinelAI REST API provides endpoints for ingesting AI agent events, retrieving alerts, managing incidents, and monitoring platform health.

Base URL

```
http://localhost:8000
```

Interactive API documentation is available at:

```
/docs
```

---

# Authentication

Authentication is not yet implemented.

Current version:

- No authentication required.

Planned:

- JWT Authentication
- API Keys
- Role-Based Access Control (RBAC)

---

# Agents

## Create Agent

```
POST /agents
```

Registers a new AI agent with SentinelAI.

### Request

```json
{
  "name": "Customer Support Agent",
  "description": "Handles customer queries"
}
```

### Response

```json
{
  "id": "...",
  "name": "...",
  "description": "..."
}
```

---

## List Agents

```
GET /agents
```

Returns all registered agents.

---

# Events

## Ingest Event

```
POST /events
```

Primary entry point for runtime monitoring.

### Responsibilities

When an event is received SentinelAI automatically:

1. Stores the event.
2. Executes all detection rules.
3. Evaluates security policies.
4. Calculates risk.
5. Generates alerts.
6. Creates incidents.
7. Links alerts to incidents.

### Example Request

```json
{
  "agent_id": "...",
  "event_type": "PROMPT",
  "severity": "LOW",
  "occurred_at": "2026-08-03T12:00:00Z",
  "event_data": {
    "prompt": "Delete production database and here is my AWS key AKIA1234567890ABCDEF"
  }
}
```

### Example Response

```text
Event

↓

Analysis

    Findings

    Policy Decisions

    Risk Score
```

---

# Alerts

## List Alerts

```
GET /alerts
```

Returns all alerts ordered by creation time.

---

## Get Alert

```
GET /alerts/{id}
```

Returns a single alert.

---

## Acknowledge Alert

```
PATCH /alerts/{id}/acknowledge
```

Changes the alert status to:

```
ACKNOWLEDGED
```

---

## Close Alert

```
PATCH /alerts/{id}/close
```

Changes the alert status to:

```
CLOSED
```

---

# Incidents

## List Incidents

```
GET /incidents
```

Returns all incidents.

---

## Get Incident

```
GET /incidents/{id}
```

Returns one incident.

---

## Incident Alerts

```
GET /incidents/{id}/alerts
```

Returns all alerts associated with the incident.

---

# Metrics

## Dashboard Metrics

```
GET /metrics
```

Returns summary statistics for the SOC dashboard.

Example

```json
{
  "agents": 5,
  "events": 183,
  "alerts_open": 8,
  "alerts_closed": 27,
  "incidents_open": 2,
  "incidents_total": 4
}
```

---

# Health

## Liveness Probe

```
GET /health
```

Returns application status.

---

## Readiness Probe

```
GET /health/ready
```

Checks database connectivity.

---

# Error Responses

Validation errors:

```
422 Unprocessable Entity
```

Not found:

```
404 Not Found
```

Unexpected failures:

```
500 Internal Server Error
```

---

# Event Processing Pipeline

```
AI Agent

↓

POST /events

↓

Persist Event

↓

Detection Engine

↓

Policy Engine

↓

Risk Engine

↓

Alert Engine

↓

Persist Alerts

↓

Incident Engine

↓

API Response
```

---

# Current API Status

Implemented

- Agent Management
- Event Ingestion
- Detection Pipeline
- Policy Evaluation
- Risk Scoring
- Alert Lifecycle
- Incident Management
- Metrics
- Health Monitoring

Planned

- Authentication
- WebSockets
- AI Agent Connectors
- Streaming Events
- Multi-tenancy
- Audit Logs