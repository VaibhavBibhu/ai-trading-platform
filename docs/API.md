# API Design

Base path: `/api`

## Core endpoints

- `GET /health`
- `GET /market/overview`
- `GET /market/stocks`
- `GET /predictions/latest`
- `GET /news/latest`
- `POST /decisions/evaluate`
- `GET /portfolio/summary`
- `GET /orders`
- `POST /paper-trading/orders`
- `GET /risk/rules`

## Example decision response

```json
{
  "symbol": "AAPL",
  "decision": "BUY",
  "confidence": 0.83,
  "riskApproved": true,
  "positionSize": 250,
  "stopLoss": 184.2,
  "takeProfit": 195.8,
  "reasons": [
    "AI signal bullish",
    "RSI oversold",
    "news sentiment positive",
    "volume above average"
  ]
}
```

