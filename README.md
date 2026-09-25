# Promptarium

**Every prompt, ready when you are.**[cite: 2]

Promptarium is a full-stack AI prompt management dashboard — a place to save, organize, search, and enhance your AI prompts[cite: 2]. This repository contains the **frontend** (React + Vite), which talks to a companion FastAPI backend for authentication, persistence, and file storage[cite: 2].

🔗 **Live app:** [promptarium.netlify.app](https://promptarium.netlify.app/)[cite: 2]  
🔗 **Backend API repo:** [github.com/Chirag-DATA/promptarium-backend](https://github.com/Chirag-DATA/promptarium-backend)[cite: 2]

#### Overview

Managing a growing collection of AI prompts across ChatGPT, Gemini, Claude, and other tools quickly becomes messy — scattered across notes apps, chat histories, and sticky notes[cite: 2]. Promptarium solves this with a single, organized, multi-user workspace: create an account, categorize prompts, tag them, favorite the ones you use often, search instantly, and enhance them with AI before saving — all backed by a real database, so your data follows you across devices[cite: 2].

This project was built as a from-scratch, production-style application in two deliberate phases: first as a fully client-side app (local storage only), then rebuilt with a real FastAPI + PostgreSQL backend once the frontend architecture was solid — a sequencing that mirrors how many real products actually evolve[cite: 2].

#### Features

* **Real authentication** — signup with email OTP verification, password login, and persistent sessions via 7-day `httpOnly` refresh cookies[cite: 2]
* **Self-service account deletion** — secure Danger Zone in Settings requiring email OTP challenge before permanently wiping account and prompt data
* **User profiles** — custom username and uploaded profile photo[cite: 2]
* **Full CRUD** — create, edit, duplicate, delete, pin, favorite, and archive prompts, all scoped to your account[cite: 2]
* **Rich prompt metadata** — title, content, category, tags, description, and target AI model per prompt[cite: 2]
* **Instant search** — across title, content, category, and tags simultaneously[cite: 2]
* **Filtering & sorting** — by favorites, pinned, archived, category, and multiple sort orders[cite: 2]
* **Dashboard overview** — live stats, recent prompts, and a category breakdown chart[cite: 2]
* **Dedicated Favorites & Categories views**[cite: 2]
* **Dark mode** — persisted per device, respects system preference on first visit[cite: 2]
* **Export** — download your prompts as JSON, TXT, or a formatted PDF[cite: 2]
* **Import** — restore or merge prompts from a previously exported JSON file, with validation against malformed data and graceful handling of partial failures[cite: 2]
* **AI-powered prompt enhancement** — Improve, Rewrite, Summarize, or Optimize any prompt using Google's Gemini API (bring-your-own-key, stored only in your browser, scoped per account)[cite: 2]
* **Fully responsive** — desktop, tablet, and mobile, with feature parity across breakpoints[cite: 2]
* **Protected routing** — authenticated app routes, with guest preview mode and signup entry for new visitors[cite: 2, 3]

#### Tech Stack

| Layer | Technology |
| ------ | ------ |
| Framework | React 18 (Vite)[cite: 2] |
| Styling | Tailwind CSS v4[cite: 2] |
| Routing | React Router v6[cite: 2] |
| State management | React Context API + custom hooks[cite: 2] |
| Auth & Session | JWT Access Token + `httpOnly` secure refresh cookie (credentials included)[cite: 2] |
| Icons | Lucide React (`lucide-react`)[cite: 3] |
| PDF generation | jsPDF[cite: 2] |
| AI integration | Google Gemini API (direct client-side calls)[cite: 2] |
| Deployment | Netlify[cite: 2] |

This repo is the client only — all persistence, authentication, and file storage are handled by the [Promptarium backend](https://github.com/Chirag-DATA/promptarium-backend) (FastAPI + PostgreSQL), which must be running (or deployed) for the app to function beyond its UI shell[cite: 2].

#### Architecture

##### Key design principles
* **Single source of truth** — all prompt data lives in `PromptsContext`, backed by the real API; every page derives its view via `useMemo`, never duplicating state[cite: 2].
* **Container vs. presentational separation** — pages decide *what* actions mean; shared components like `PromptCard` and `PromptForm` only render and call back up through props[cite: 2].
* **Dedicated API client with token auto-refresh** — all HTTP calls go through `apiClient`, which injects the Bearer token, enforces `credentials: "include"` for cross-origin refresh cookies, and intercepts 401s to perform silent token rotation.
* **A translation layer at the data boundary** — `promptService.js` maps between the frontend's naming (`prompt`, `aiModel`) and the backend's (`prompt_text`, `ai_model`), keeping every component untouched by that difference[cite: 2].
* **Auth state reactive across the whole app** — switching accounts or deleting an account cleanly resets prompts, the Gemini key, and profile data; nothing lingers from a previous session[cite: 2].
* **Defensive by default** — validated imports, categorized API error handling, and visible inline error alerts instead of silent failures[cite: 2].

#### Getting Started

##### Prerequisites
* Node.js 18+ and npm[cite: 2]
* The [Promptarium backend](https://github.com/Chirag-DATA/promptarium-backend) running locally or deployed[cite: 2]

##### Installation

```bash
git clone [https://github.com/Chirag-DATA/Promptarium.git](https://github.com/Chirag-DATA/Promptarium.git)
cd Promptarium
npm install
```

##### Environment configuration
Create a `.env` file at the project root[cite: 2]:

```env
VITE_API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
```
Point this at wherever your backend is running — a local instance during development, or the deployed Render URL (`https://promptarium-backend.onrender.com`) for production[cite: 2].

##### Run it
```bash
npm run dev
```
The app will be running at `http://localhost:5173`[cite: 2].

##### Enabling AI Prompt Enhancement
The "Improve / Rewrite / Summarize / Optimize" features require a free Gemini API key[cite: 2]:
1. Get a key from [Google AI Studio](https://aistudio.google.com/apikey)[cite: 2]
2. Sign up / log in, then open **Settings**[cite: 2]
3. Paste your key — it's stored only in your browser's `localStorage`, scoped to your account, and sent directly to Google's API, never to the backend[cite: 2]

##### Building for production
```bash
npm run build
npm run preview
```

#### Deployment

Deployed on Netlify with client-side routing support and security headers configured via `netlify.toml`[cite: 2]:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_BASE_URL = "[https://promptarium-backend.onrender.com](https://promptarium-backend.onrender.com)"
```

Setting `VITE_API_BASE_URL` directly ensures the correct production backend URL is reliably baked into every Netlify build[cite: 2].

#### Related Repository
The backend — FastAPI, PostgreSQL, JWT auth, Brevo email OTP, file uploads — lives in a separate repository: [promptarium-backend](https://github.com/Chirag-DATA/promptarium-backend)[cite: 2].

#### Author
**Chirag Mittal**[cite: 2]
* GitHub: [@Chirag-DATA](https://github.com/Chirag-DATA)[cite: 2]
* LinkedIn: [mittal-chirag](https://linkedin.com/in/mittal-chirag)[cite: 2]

#### License
This project is open source and available under the [MIT License](https://github.com/Chirag-DATA/Promptarium/blob/main/LICENSE)[cite: 2].
