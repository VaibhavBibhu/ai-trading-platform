import type { DecisionResponse, NewsItem, PortfolioSummary, Prediction, Stock } from "../types/trading";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } catch {
    return fallback;
  }
}

export async function getStocks() {
  return getJson<Stock[]>("/market/stocks", demoStocks);
}

export async function getPredictions() {
  return getJson<Prediction[]>("/predictions/latest", demoPredictions);
}

export async function getNews() {
  return getJson<NewsItem[]>("/news/latest", demoNews);
}

export async function getPortfolioSummary() {
  return getJson<PortfolioSummary>("/portfolio/summary", demoPortfolio);
}

export async function evaluateDecision(): Promise<DecisionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/decisions/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: "AAPL",
        account_value: 100000,
        risk_percent: 1,
        entry_price: 193.42,
        stop_loss: 188.5,
      }),
    });
    if (!response.ok) throw new Error("Decision request failed");
    return await response.json();
  } catch {
    return demoDecision;
  }
}

const demoStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", price: 193.42, change_percent: 1.18, volume: 57123880 },
  { symbol: "MSFT", name: "Microsoft Corp.", exchange: "NASDAQ", price: 447.67, change_percent: 0.84, volume: 22113820 },
  { symbol: "NVDA", name: "NVIDIA Corp.", exchange: "NASDAQ", price: 126.9, change_percent: 2.31, volume: 318921004 },
  { symbol: "TSLA", name: "Tesla Inc.", exchange: "NASDAQ", price: 183.01, change_percent: -1.47, volume: 95448321 },
];

const demoPredictions: Prediction[] = [
  { symbol: "AAPL", signal: "BUY", confidence: 0.83, model_version: "baseline-demo-v1", reasons: ["Trend strength rising", "News sentiment positive"], created_at: new Date().toISOString() },
  { symbol: "MSFT", signal: "HOLD", confidence: 0.61, model_version: "baseline-demo-v1", reasons: ["Good quality trend, but execution edge is modest"], created_at: new Date().toISOString() },
  { symbol: "TSLA", signal: "SELL", confidence: 0.68, model_version: "baseline-demo-v1", reasons: ["Volatility expanding", "Short-term sentiment weakening"], created_at: new Date().toISOString() },
];

const demoNews: NewsItem[] = [
  { symbol: "AAPL", title: "Apple supplier outlook improves ahead of product cycle", source: "Demo News", sentiment: "POSITIVE", impact_score: 12, published_at: new Date().toISOString() },
  { symbol: "NVDA", title: "Chip demand remains strong across data center buyers", source: "Demo News", sentiment: "POSITIVE", impact_score: 16, published_at: new Date().toISOString() },
  { symbol: "TSLA", title: "EV pricing pressure weighs on analyst expectations", source: "Demo News", sentiment: "NEGATIVE", impact_score: -9, published_at: new Date().toISOString() },
];

const demoPortfolio: PortfolioSummary = {
  equity: 100000,
  cash: 72450,
  daily_profit: 843.27,
  monthly_profit: 4218.63,
  win_rate: 0.64,
  sharpe_ratio: 1.41,
  max_drawdown: 0.072,
  risk_exposure: 0.38,
};

const demoDecision: DecisionResponse = {
  symbol: "AAPL",
  decision: "BUY",
  confidence: 0.83,
  risk_approved: true,
  position_size: 203,
  max_loss: 998.76,
  take_profit: 203.26,
  stop_loss: 188.5,
  reasons: ["Demo AI signal is bullish", "Risk engine approved position size", "Reward-to-risk target is 2:1"],
};
