from fastapi import APIRouter

from app.risk.engine import risk_rules
from app.schemas.trading import DecisionRequest, Order, PaperOrderRequest
from app.services.decision_engine import evaluate_decision
from app.services.demo_data import get_market_overview, get_news, get_orders, get_portfolio_summary, get_predictions, get_stocks

router = APIRouter(prefix="/api")


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "mode": "paper-first"}


@router.get("/market/overview")
def market_overview() -> dict:
    return get_market_overview()


@router.get("/market/stocks")
def stocks() -> list:
    return get_stocks()


@router.get("/predictions/latest")
def predictions() -> list:
    return get_predictions()


@router.get("/news/latest")
def news() -> list:
    return get_news()


@router.post("/decisions/evaluate")
def decisions(request: DecisionRequest):
    return evaluate_decision(request)


@router.get("/portfolio/summary")
def portfolio_summary():
    return get_portfolio_summary()


@router.get("/orders")
def orders() -> list[Order]:
    return get_orders()


@router.post("/paper-trading/orders")
def paper_order(request: PaperOrderRequest) -> Order:
    return Order(symbol=request.symbol.upper(), side=request.side, quantity=request.quantity)


@router.get("/risk/rules")
def rules() -> list[dict]:
    return risk_rules()

