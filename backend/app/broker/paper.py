from app.broker.base import BrokerAdapter
from app.schemas.trading import Order, PaperOrderRequest


class PaperBroker(BrokerAdapter):
    def submit_order(self, request: PaperOrderRequest) -> Order:
        return Order(symbol=request.symbol.upper(), side=request.side, quantity=request.quantity)

