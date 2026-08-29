from app.schemas.trading import DecisionRequest
from app.services.decision_engine import evaluate_decision


def test_decision_engine_caps_loss_to_risk_amount():
    result = evaluate_decision(
        DecisionRequest(symbol="AAPL", account_value=100000, risk_percent=1, entry_price=100, stop_loss=95)
    )

    assert result.risk_approved is True
    assert result.max_loss <= 1000
    assert result.position_size == 200

