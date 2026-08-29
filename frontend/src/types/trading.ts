export type Signal = "BUY" | "SELL" | "HOLD";

export type Stock = {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change_percent: number;
  volume: number;
};

export type Prediction = {
  symbol: string;
  signal: Signal;
  confidence: number;
  model_version: string;
  reasons: string[];
  created_at: string;
};

export type NewsItem = {
  symbol: string;
  title: string;
  source: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  impact_score: number;
  published_at: string;
};

export type PortfolioSummary = {
  equity: number;
  cash: number;
  daily_profit: number;
  monthly_profit: number;
  win_rate: number;
  sharpe_ratio: number;
  max_drawdown: number;
  risk_exposure: number;
};

export type DecisionResponse = {
  symbol: string;
  decision: "BUY" | "SELL" | "HOLD" | "WAIT";
  confidence: number;
  risk_approved: boolean;
  position_size: number;
  max_loss: number;
  take_profit: number;
  stop_loss: number;
  reasons: string[];
};

