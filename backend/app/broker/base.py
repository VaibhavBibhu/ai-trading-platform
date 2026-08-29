from abc import ABC, abstractmethod

from app.schemas.trading import Order, PaperOrderRequest


class BrokerAdapter(ABC):
    @abstractmethod
    def submit_order(self, request: PaperOrderRequest) -> Order:
        """Submit an order to a broker or broker simulator."""

