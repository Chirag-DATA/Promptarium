# Promptarium

**Every prompt, ready when you are.**

Promptarium is a full-stack AI prompt management dashboard — a place to save, organize, search, and enhance your AI prompts. This repository contains the **frontend** (React + Vite), which talks to a companion FastAPI backend for authentication, persistence, and file storage.

🔗 **Live app:** [promptarium.netlify.app](https://promptarium.netlify.app)
🔗 **Backend API repo:** [github.com/Chirag-DATA/promptarium-backend](https://github.com/Chirag-DATA/promptarium-backend)

---

## Overview

Managing a growing collection of AI prompts across ChatGPT, Gemini, Claude, and other tools quickly becomes messy — scattered across notes apps, chat histories, and sticky notes. Promptarium solves this with a single, organized, multi-user workspace: create an account, categorize prompts, tag them, favorite the ones you use often, search instantly, and enhance them with AI before saving — all backed by a real database, so your data follows you across devices.

This project was built as a from-scratch, production-style application in two deliberate phases: first as a fully client-side app (local storage only), then rebuilt with a real FastAPI + PostgreSQL backend once the frontend architecture was solid — a sequencing that mirrors how many real products actually evolve.

---

## Features

- **Real authentication** — signup, login, and persistent sessions via JWT
- **User profiles** — custom username and uploaded profile photo
- **Full CRUD** — create, edit, duplicate, delete, pin, favorite, and archive prompts, all scoped to your account
- **Rich prompt metadata** — title, content, category, tags, description, and target AI model per prompt
- **Instant search** — across title, content, category, and tags simultaneously
- **Filtering & sorting** — by favorites, pinned, archived, category, and multiple sort orders
- **Dashboard overview** — live stats, recent prompts, and a category breakdown chart
- **Dedicated Favorites & Categories views**
- **Dark mode** — persisted per device, respects system preference on first visit
- **Export** — download your prompts as JSON, TXT, or a formatted PDF
- **Import** — restore or merge prompts from a previously exported JSON file, with validation against malformed data and graceful handling of partial failures
- **AI-powered prompt enhancement** — Improve, Rewrite, Summarize, or Optimize any prompt using Google's Gemini API (bring-your-own-key, stored only in your browser, scoped per account)
- **Fully responsive** — desktop, tablet, and mobile, with feature parity across breakpoints
- **Protected routing** — authenticated app routes, with signup as the default entry point for new visitors

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State management | React Context API + custom hooks |
| Auth | JWT (issued by the backend), stored client-side |
| PDF generation | jsPDF |
| AI integration | Google Gemini API (direct client-side calls) |
| Deployment | Netlify |

This repo is the client only — all persistence, authentication, and file storage are handled by the [Promptarium backend](https://github.com/Chirag-DATA/promptarium-backend) (FastAPI + PostgreSQL), which must be running (or deployed) for the app to function beyond its UI shell.

---

## Architecture

```
src/
├── components/     → Reusable, presentational UI pieces (PromptCard, Modal, forms, ProfileSection, etc.)
├── pages/          → Route-level views (Dashboard, Prompts, Favorites, Categories, Settings, Login, Signup)
├── layouts/         → Shared page shells (DashboardLayout: Navbar + Sidebar + content)
├── context/         → Global state (ThemeContext, AuthContext, PromptsContext)
├── hooks/           → Encapsulated stateful logic (usePrompts, usePromptFilters, usePromptEditor, useAuth, useTheme, useApiKey)
├── services/         → Pure data/API functions (apiClient, promptService, exportService, importService, geminiService)
├── constants/          → Fixed reference data (categories, AI model list)
├── routes/              → Route definitions, including auth-protected routing
└── App.jsx
```

### Key design principles

- **Single source of truth** — all prompt data lives in `PromptsContext`, backed by the real API; every page derives its view via `useMemo`, never duplicating state.
- **Container vs. presentational separation** — pages decide *what* actions mean; shared components like `PromptCard` and `PromptForm` only render and call back up through props.
- **A thin, dedicated API client** — all HTTP calls (including auth token injection) go through one shared `apiClient`, so individual service files stay declarative.
- **A translation layer at the data boundary** — `promptService.js` maps between the frontend's naming (`prompt`, `aiModel`) and the backend's (`prompt_text`, `ai_model`), keeping every component untouched by that difference.
- **Auth state reactive across the whole app** — switching accounts correctly resets prompts, the Gemini key, and profile data; nothing lingers from a previous session.
- **Defensive by default** — validated imports, categorized API error handling, visible error states instead of silent failures.

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- The [Promptarium backend](https://github.com/Chirag-DATA/promptarium-backend) running locally or deployed

### Installation

```bash
git clone https://github.com/Chirag-DATA/promptarium.git
cd promptarium
npm install
```

### Environment configuration

Create a `.env` file at the project root:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Point this at wherever your backend is actually running — a local instance during development, or the deployed Render URL for production.

### Run it

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

### Enabling AI Prompt Enhancement

The "Improve / Rewrite / Summarize / Optimize" features require a free Gemini API key:

1. Get a key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign up / log in, then open **Settings**
3. Paste your key — it's stored only in your browser's `localStorage`, scoped to your account, and sent directly to Google's API, never to the backend

### Building for production

```bash
npm run build
npm run preview   # locally preview the production build
```

---

## Deployment

Deployed on Netlify with client-side routing support via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_BASE_URL = "https://your-backend-url.onrender.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Setting `VITE_API_BASE_URL` directly in `netlify.toml` (rather than only in Netlify's dashboard) ensures the correct backend URL is reliably baked into every build.

---

## Related Repository

The backend — FastAPI, PostgreSQL, JWT auth, file uploads — lives in a separate repository: [promptarium-backend](https://github.com/Chirag-DATA/promptarium-backend).

---

## Author

**Chirag Mittal**
- GitHub: [@Chirag-DATA](https://github.com/Chirag-DATA)
- LinkedIn: [mittal-chirag](https://linkedin.com/in/mittal-chirag)

---

## License

This project is open source and available under the [MIT License](LICENSE).
