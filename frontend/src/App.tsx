import { Activity, Bell, BriefcaseBusiness, CandlestickChart, Gauge, Newspaper, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { evaluateDecision, getNews, getPortfolioSummary, getPredictions, getStocks } from "./services/api";
import type { DecisionResponse, NewsItem, PortfolioSummary, Prediction, Stock } from "./types/trading";

const equityCurve = [
  { day: "Mon", value: 98200 },
  { day: "Tue", value: 99140 },
  { day: "Wed", value: 98910 },
  { day: "Thu", value: 100820 },
  { day: "Fri", value: 100000 },
  { day: "Now", value: 101245 },
];

export function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [decision, setDecision] = useState<DecisionResponse | null>(null);

  useEffect(() => {
    Promise.all([getStocks(), getPredictions(), getNews(), getPortfolioSummary(), evaluateDecision()]).then(
      ([stockData, predictionData, newsData, portfolioData, decisionData]) => {
        setStocks(stockData);
        setPredictions(predictionData);
        setNews(newsData);
        setPortfolio(portfolioData);
        setDecision(decisionData);
      },
    );
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark">AT</div>
          <div>
            <strong>AI Trader</strong>
            <span>Paper mode</span>
          </div>
        </div>
        <nav>
          {[
            ["Dashboard", Gauge],
            ["Market", CandlestickChart],
            ["Portfolio", BriefcaseBusiness],
            ["Prediction", Activity],
            ["News", Newspaper],
            ["Risk", ShieldCheck],
            ["Settings", SlidersHorizontal],
          ].map(([label, Icon]) => (
            <a href="#" className={label === "Dashboard" ? "active" : ""} key={label as string}>
              <Icon size={18} aria-hidden="true" />
              <span>{label as string}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Trading command center</p>
            <h1>AI-assisted paper trading dashboard</h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="primary-button">Paper Trade</button>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Portfolio metrics">
          <Metric label="Equity" value={money(portfolio?.equity)} trend="+1.24%" />
          <Metric label="Daily P/L" value={money(portfolio?.daily_profit)} trend="+0.84%" positive />
          <Metric label="Win Rate" value={percent(portfolio?.win_rate)} trend="30 trades" />
          <Metric label="Risk Exposure" value={percent(portfolio?.risk_exposure)} trend="within policy" />
        </section>

        <section className="workspace-grid">
          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Portfolio</p>
                <h2>Equity curve</h2>
              </div>
              <span className="status-pill positive">Live demo</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={equityCurve}>
                <defs>
                  <linearGradient id="equity" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2f7d6d" stopOpacity={0.42} />
                    <stop offset="100%" stopColor="#2f7d6d" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide domain={["dataMin - 700", "dataMax + 700"]} />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Area dataKey="value" stroke="#2f7d6d" strokeWidth={3} fill="url(#equity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="panel decision-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Decision engine</p>
                <h2>{decision?.symbol ?? "AAPL"} signal</h2>
              </div>
              <span className={`status-pill ${decision?.decision === "BUY" ? "positive" : ""}`}>{decision?.decision ?? "WAIT"}</span>
            </div>
            <div className="decision-score">
              <strong>{percent(decision?.confidence)}</strong>
              <span>confidence</span>
            </div>
            <div className="risk-card">
              <span>Position size</span>
              <strong>{decision?.position_size ?? 0} shares</strong>
            </div>
            <div className="risk-card">
              <span>Max loss</span>
              <strong>{money(decision?.max_loss)}</strong>
            </div>
            <ul className="reason-list">
              {(decision?.reasons ?? []).map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="data-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Market watch</h2>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>
                        <strong>{stock.symbol}</strong>
                        <span>{stock.name}</span>
                      </td>
                      <td>{money(stock.price)}</td>
                      <td className={stock.change_percent >= 0 ? "green" : "red"}>{stock.change_percent.toFixed(2)}%</td>
                      <td>{compact(stock.volume)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>AI predictions</h2>
            </div>
            <div className="stack">
              {predictions.map((prediction) => (
                <article className="signal-card" key={prediction.symbol}>
                  <div>
                    <strong>{prediction.symbol}</strong>
                    <span>{prediction.model_version}</span>
                  </div>
                  <div className={`signal ${prediction.signal.toLowerCase()}`}>{prediction.signal}</div>
                  <small>{percent(prediction.confidence)} confidence</small>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>News sentiment</h2>
            </div>
            <div className="news-list">
              {news.map((item) => (
                <article key={`${item.symbol}-${item.title}`}>
                  <span className={item.sentiment === "POSITIVE" ? "green" : item.sentiment === "NEGATIVE" ? "red" : ""}>{item.symbol}</span>
                  <strong>{item.title}</strong>
                  <small>{item.source} · Impact {item.impact_score > 0 ? "+" : ""}{item.impact_score}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value, trend, positive = false }: { label: string; value: string; trend: string; positive?: boolean }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={positive ? "green" : ""}>{trend}</small>
    </article>
  );
}

function money(value?: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value ?? 0);
}

function percent(value?: number) {
  return `${Math.round((value ?? 0) * 100)}%`;
}

function compact(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

