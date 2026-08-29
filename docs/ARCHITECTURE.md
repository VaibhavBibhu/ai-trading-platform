# Architecture

## System overview

```text
Market Data Providers
        |
        v
Data Ingestion Workers
        |
        v
PostgreSQL / Time-Series Store
        |
        +--> Technical Indicators
        +--> News Sentiment
        +--> AI Prediction
        |
        v
Decision Engine
        |
        v
Risk Engine
        |
        +--> Paper Broker
        +--> Live Broker Adapter
        |
        v
Orders, Positions, Portfolio, Audit Logs
        |
        v
Dashboard / Admin Console
```

## Design principles

- Paper trading first, live execution later.
- Broker integrations use adapters so Alpaca, Interactive Brokers, Zerodha, or another regulated broker can be swapped.
- AI predictions are treated as probabilistic inputs, not guaranteed outcomes.
- The risk engine is the last mandatory approval gate.
- Audit logs must explain what the platform did and why.

## Recommended production stack

- Frontend: React, TypeScript, Vite, Tailwind or custom CSS, TanStack Query, Lightweight Charts.
- Backend: FastAPI, SQLAlchemy, Alembic, Pydantic, Celery or Dramatiq.
- Storage: PostgreSQL, with TimescaleDB when time-series volume grows.
- AI: PyTorch, scikit-learn baselines, MLflow for experiments.
- Infrastructure: Docker, managed PostgreSQL, object storage for model artifacts, Sentry, Prometheus/Grafana.

