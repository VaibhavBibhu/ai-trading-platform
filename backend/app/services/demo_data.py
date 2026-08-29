from datetime import datetime, timedelta

from app.schemas.trading import NewsItem, Order, OrderSide, PortfolioSummary, Prediction, Signal, Stock


def get_market_overview() -> dict:
    return {
        "marketStatus": "demo_open",
        "indices": [
            {"name": "S&P 500", "value": 5483.21, "changePercent": 0.42},
            {"name": "NASDAQ", "value": 17721.59, "changePercent": 0.65},
            {"name": "Dow Jones", "value": 39284.11, "changePercent": -0.08},
        ],
        "watchlistMomentum": 72,
    }


def get_stocks() -> list[Stock]:
    return [
        Stock(symbol="AAPL", name="Apple Inc.", exchange="NASDAQ", price=193.42, change_percent=1.18, volume=57123880),
        Stock(symbol="MSFT", name="Microsoft Corp.", exchange="NASDAQ", price=447.67, change_percent=0.84, volume=22113820),
        Stock(symbol="NVDA", name="NVIDIA Corp.", exchange="NASDAQ", price=126.9, change_percent=2.31, volume=318921004),
        Stock(symbol="TSLA", name="Tesla Inc.", exchange="NASDAQ", price=183.01, change_percent=-1.47, volume=95448321),
    ]


def get_predictions() -> list[Prediction]:
    now = datetime.utcnow()
    return [
        Prediction(
            symbol="AAPL",
            signal=Signal.buy,
            confidence=0.83,
            model_version="baseline-demo-v1",
            reasons=["Trend strength rising", "News sentiment positive", "RSI recovering from neutral zone"],
            created_at=now,
        ),
        Prediction(
            symbol="MSFT",
            signal=Signal.hold,
            confidence=0.61,
            model_version="baseline-demo-v1",
            reasons=["Momentum is positive but valuation risk is elevated"],
            created_at=now - timedelta(minutes=8),
        ),
        Prediction(
            symbol="TSLA",
            signal=Signal.sell,
            confidence=0.68,
            model_version="baseline-demo-v1",
            reasons=["Volatility expansion", "Negative short-term sentiment", "Trend below 20 EMA"],
            created_at=now - timedelta(minutes=13),
        ),
    ]


def get_news() -> list[NewsItem]:
    now = datetime.utcnow()
    return [
        NewsItem(symbol="AAPL", title="Apple supplier outlook improves ahead of product cycle", source="Demo News", sentiment="POSITIVE", impact_score=12, published_at=now),
        NewsItem(symbol="NVDA", title="Chip demand remains strong across data center buyers", source="Demo News", sentiment="POSITIVE", impact_score=16, published_at=now - timedelta(minutes=21)),
        NewsItem(symbol="TSLA", title="EV pricing pressure weighs on analyst expectations", source="Demo News", sentiment="NEGATIVE", impact_score=-9, published_at=now - timedelta(minutes=35)),
    ]


def get_portfolio_summary() -> PortfolioSummary:
    return PortfolioSummary(
        equity=100000,
        cash=72450,
        daily_profit=843.27,
        monthly_profit=4218.63,
        win_rate=0.64,
        sharpe_ratio=1.41,
        max_drawdown=0.072,
        risk_exposure=0.38,
    )


def get_orders() -> list[Order]:
    return [
        Order(symbol="AAPL", side=OrderSide.buy, quantity=12, status="paper_filled"),
        Order(symbol="NVDA", side=OrderSide.buy, quantity=6, status="paper_filled"),
    ]

