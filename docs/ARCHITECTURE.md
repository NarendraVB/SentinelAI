# SentinelAI Architecture

## Overview

SentinelAI follows a layered architecture inspired by modern backend systems.

Each layer has a single responsibility.

```
Client
   │
   ▼
FastAPI Router
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
PostgreSQL
```

---

# Project Structure

```
app/

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

# Layer Responsibilities

## API Layer

Responsible for:

- HTTP Endpoints
- Request Validation
- Response Formatting

Never contains business logic.

---

## Service Layer

Responsible for:

- Business Logic
- Workflow Coordination
- Security Processing

Services never execute SQL directly.

---

## Repository Layer

Responsible for:

- Database Queries
- CRUD Operations
- Persistence

Repositories never contain business rules.

---

## Models

SQLAlchemy ORM models representing:

- Agent
- Event
- Alert
- Incident

---

## Schemas

Pydantic request and response models.

Used only for API validation and serialization.

---

## Detection Engine

Responsible for executing all registered security detectors.

```
Event

↓

Prompt Detector

↓

Secret Detector

↓

Findings
```

The engine can be extended by adding new detectors without changing existing code.

---

## Policy Engine

Evaluates findings against security policies.

Example:

```
Prompt Injection

↓

Prompt Safety Policy

↓

ALERT
```

---

## Risk Engine

Combines:

- Detection Findings
- Policy Decisions

Produces:

- Risk Score
- Risk Level

---

## Security Pipeline

Coordinates the entire analysis process.

```
Incoming Event

↓

Detection

↓

Policy Evaluation

↓

Risk Calculation

↓

Security Analysis
```

---

## Alert Engine

Transforms security findings into analyst-facing alerts.

Alerts are persisted to PostgreSQL.

---

## Incident Engine

Groups related alerts into a single security incident.

```
Alert

↓

Incident

↓

Analyst Investigation
```

---

# Event Lifecycle

```
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

Create Incident

↓

Link Alerts to Incident

↓

Return Security Analysis
```

---

# Dependency Injection

SentinelAI uses FastAPI dependency injection.

```
Router

↓

Dependency Provider

↓

Service

↓

Repository

↓

Database
```

Advantages:

- Loose Coupling
- Easier Testing
- Better Maintainability

---

# Database Relationships

```
Agent

│

├──────────────┐

▼              │

Event          │

│              │

▼              │

Alert          │

│              │

▼              │

Incident ◄─────┘
```

One Agent

↓

Many Events

↓

Many Alerts

↓

One Incident

---

# Design Principles

- Separation of Concerns
- Single Responsibility Principle
- Repository Pattern
- Dependency Injection
- Modular Security Engines
- Extensible Detection Rules

---

# Future Architecture

Planned additions:

- OpenAI Agents SDK Connector
- LangGraph Connector
- CrewAI Connector
- AutoGen Connector
- WebSocket Streaming
- React Dashboard
- Authentication
- RBAC
- Multi-tenancy
- Background Workers