from app.schemas.trading import DecisionRequest


def calculate_position_size(request: DecisionRequest) -> tuple[int, float]:
    risk_amount = request.account_value * (request.risk_percent / 100)
    per_share_risk = abs(request.entry_price - request.stop_loss)
    if per_share_risk == 0:
        return 0, 0
    quantity = int(risk_amount // per_share_risk)
    max_loss = round(quantity * per_share_risk, 2)
    return max(quantity, 0), max_loss


def risk_rules() -> list[dict]:
    return [
        {"name": "Max risk per trade", "value": "1% default, hard limit 5%"},
        {"name": "Daily trade limit", "value": "Configurable; recommended <= 10"},
        {"name": "Single-symbol exposure", "value": "Recommended <= 20% of account equity"},
        {"name": "Live trading", "value": "Disabled until a regulated broker adapter is configured"},
    ]

