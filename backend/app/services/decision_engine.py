from app.risk.engine import calculate_position_size
from app.schemas.trading import DecisionRequest, DecisionResponse, DecisionValue


def evaluate_decision(request: DecisionRequest) -> DecisionResponse:
    position_size, max_loss = calculate_position_size(request)
    risk_approved = position_size > 0 and max_loss <= request.account_value * (request.risk_percent / 100)
    confidence = 0.83 if request.symbol.upper() == "AAPL" else 0.62
    decision = DecisionValue.buy if risk_approved and confidence >= 0.7 else DecisionValue.wait
    take_profit = round(request.entry_price + (request.entry_price - request.stop_loss) * 2, 2)

    reasons = [
        "Demo AI signal is bullish" if confidence >= 0.7 else "Demo AI confidence is below execution threshold",
        "Risk engine approved position size" if risk_approved else "Risk engine rejected position size",
        "Reward-to-risk target is 2:1",
    ]

    return DecisionResponse(
        symbol=request.symbol.upper(),
        decision=decision,
        confidence=confidence,
        risk_approved=risk_approved,
        position_size=position_size,
        max_loss=max_loss,
        take_profit=take_profit,
        stop_loss=request.stop_loss,
        reasons=reasons,
    )

