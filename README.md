# AI Trader

Production-oriented starter for an AI-assisted trading platform. The first version is intentionally paper-trading focused: it visualizes markets, produces explainable demo signals, runs risk checks, and keeps live broker execution behind a future adapter.

## Project layout

```text
frontend/   React + TypeScript trading dashboard
backend/    FastAPI API, domain services, risk and decision modules
database/   PostgreSQL schema
docs/       Product, architecture, API, and roadmap notes
docker/     Container support
tests/      Cross-project test notes
```

## Quick start

### Miniconda setup

Open **Anaconda Prompt** or **Miniconda Prompt**, then run:

```bash
cd C:\Users\earna\OneDrive\Desktop\1stweb
conda env create -f environment.yml
conda activate ai-trader
```

Install frontend packages:

```bash
cd frontend
npm install
```

Run the backend API in one terminal:

```bash
cd C:\Users\earna\OneDrive\Desktop\1stweb\backend
conda activate ai-trader
python -m uvicorn app.main:app --reload --port 8000
```

Run the frontend website in a second terminal:

```bash
cd C:\Users\earna\OneDrive\Desktop\1stweb\frontend
conda activate ai-trader
npm run dev
```

Open the website:

```text
http://localhost:5173
```

The API docs are available at:

```text
http://localhost:8000/docs
```

If `conda` is not available in normal PowerShell, use the included scripts from the project root:

```powershell
.\scripts\run-backend.ps1
```

Open a second PowerShell window:

```powershell
.\scripts\run-frontend.ps1
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend is connected to the backend through Vite's local API proxy:

```env
VITE_API_BASE_URL=/api
```

With both servers running:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Backend API docs: `http://localhost:8000/docs`

When the React app calls `/api/market/stocks`, Vite forwards it to `http://127.0.0.1:8000/api/market/stocks`.

## Safety posture

- Paper trading is the default mode.
- Live trading must be explicitly implemented through a broker adapter.
- Every decision should include reasons, confidence, and risk approval status.
- Risk checks are a final gate before any order leaves the system.
