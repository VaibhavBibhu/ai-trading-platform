from app.schemas.trading import Prediction, Signal


def baseline_signal(symbol: str, rsi: float, trend_score: float, sentiment_score: float) -> Prediction:
    confidence = min(max((trend_score + sentiment_score + (50 - abs(rsi - 50)) / 50) / 3, 0), 1)
    if confidence > 0.7 and sentiment_score >= 0:
        signal = Signal.buy
    elif confidence < 0.4 or sentiment_score < -0.4:
        signal = Signal.sell
    else:
        signal = Signal.hold

    from datetime import datetime

    return Prediction(
        symbol=symbol.upper(),
        signal=signal,
        confidence=round(confidence, 2),
        model_version="baseline-rule-v1",
        reasons=["Rule-based placeholder until trained ML model is connected"],
        created_at=datetime.utcnow(),
    )

