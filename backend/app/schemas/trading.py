from datetime import datetime
from enum import StrEnum
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class Signal(StrEnum):
    buy = "BUY"
    sell = "SELL"
    hold = "HOLD"


class DecisionValue(StrEnum):
    buy = "BUY"
    sell = "SELL"
    hold = "HOLD"
    wait = "WAIT"


class OrderSide(StrEnum):
    buy = "BUY"
    sell = "SELL"


class Stock(BaseModel):
    symbol: str
    name: str
    exchange: str
    price: float
    change_percent: float
    volume: int


class Prediction(BaseModel):
    symbol: str
    signal: Signal
    confidence: float = Field(ge=0, le=1)
    model_version: str
    reasons: list[str]
    created_at: datetime


class NewsItem(BaseModel):
    symbol: str
    title: str
    source: str
    sentiment: str
    impact_score: int
    published_at: datetime


class DecisionRequest(BaseModel):
    symbol: str
    account_value: float = Field(gt=0)
    risk_percent: float = Field(default=1.0, gt=0, le=5)
    entry_price: float = Field(gt=0)
    stop_loss: float = Field(gt=0)


class DecisionResponse(BaseModel):
    symbol: str
    decision: DecisionValue
    confidence: float = Field(ge=0, le=1)
    risk_approved: bool
    position_size: int
    max_loss: float
    take_profit: float
    stop_loss: float
    reasons: list[str]


class PortfolioSummary(BaseModel):
    equity: float
    cash: float
    daily_profit: float
    monthly_profit: float
    win_rate: float
    sharpe_ratio: float
    max_drawdown: float
    risk_exposure: float


class Order(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    symbol: str
    side: OrderSide
    quantity: int = Field(gt=0)
    status: str = "paper_submitted"
    mode: str = "paper"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class PaperOrderRequest(BaseModel):
    symbol: str
    side: OrderSide
    quantity: int = Field(gt=0)

