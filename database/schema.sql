CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'trader',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE stocks (
  id UUID PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  exchange TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD'
);

CREATE TABLE market_prices (
  id BIGSERIAL PRIMARY KEY,
  stock_id UUID NOT NULL REFERENCES stocks(id),
  ts TIMESTAMPTZ NOT NULL,
  open NUMERIC(14, 4) NOT NULL,
  high NUMERIC(14, 4) NOT NULL,
  low NUMERIC(14, 4) NOT NULL,
  close NUMERIC(14, 4) NOT NULL,
  volume BIGINT NOT NULL
);

CREATE TABLE technical_indicators (
  id BIGSERIAL PRIMARY KEY,
  stock_id UUID NOT NULL REFERENCES stocks(id),
  ts TIMESTAMPTZ NOT NULL,
  rsi NUMERIC(8, 4),
  macd NUMERIC(12, 6),
  ema NUMERIC(14, 4),
  sma NUMERIC(14, 4),
  vwap NUMERIC(14, 4),
  bollinger_upper NUMERIC(14, 4),
  bollinger_lower NUMERIC(14, 4)
);

CREATE TABLE predictions (
  id BIGSERIAL PRIMARY KEY,
  stock_id UUID NOT NULL REFERENCES stocks(id),
  signal TEXT NOT NULL CHECK (signal IN ('BUY', 'SELL', 'HOLD')),
  confidence NUMERIC(5, 4) NOT NULL,
  model_version TEXT NOT NULL,
  reasons JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE news_articles (
  id BIGSERIAL PRIMARY KEY,
  stock_id UUID REFERENCES stocks(id),
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  url TEXT,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('POSITIVE', 'NEGATIVE', 'NEUTRAL')),
  impact_score INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE decisions (
  id BIGSERIAL PRIMARY KEY,
  stock_id UUID NOT NULL REFERENCES stocks(id),
  decision TEXT NOT NULL CHECK (decision IN ('BUY', 'SELL', 'HOLD', 'WAIT')),
  confidence NUMERIC(5, 4) NOT NULL,
  risk_approved BOOLEAN NOT NULL,
  reasons JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  stock_id UUID NOT NULL REFERENCES stocks(id),
  side TEXT NOT NULL CHECK (side IN ('BUY', 'SELL')),
  quantity NUMERIC(18, 6) NOT NULL,
  order_type TEXT NOT NULL DEFAULT 'market',
  status TEXT NOT NULL DEFAULT 'pending',
  mode TEXT NOT NULL DEFAULT 'paper',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE positions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  stock_id UUID NOT NULL REFERENCES stocks(id),
  quantity NUMERIC(18, 6) NOT NULL,
  average_price NUMERIC(14, 4) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_market_prices_stock_ts ON market_prices(stock_id, ts DESC);
CREATE INDEX idx_indicators_stock_ts ON technical_indicators(stock_id, ts DESC);
CREATE INDEX idx_predictions_stock_created ON predictions(stock_id, created_at DESC);
