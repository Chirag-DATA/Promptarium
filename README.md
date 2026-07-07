# Promptarium

**Every prompt, ready when you are.**

Promptarium is a modern, full-featured AI prompt management dashboard — a place to save, organize, search, and enhance your AI prompts, built entirely as a client-side React application.

🔗 **Live demo:** [promptarium.netlify.app](https://promptarium.netlify.app)

---

## Overview

Managing a growing collection of AI prompts across ChatGPT, Gemini, Claude, and other tools quickly becomes messy — scattered across notes apps, chat histories, and sticky notes. Promptarium solves this with a single, organized workspace: categorize prompts, tag them, favorite the ones you use often, search instantly, and even enhance them with AI before saving.

This project was built as a from-scratch, production-style application — not a tutorial clone — with deliberate architectural decisions at every layer, from data persistence to component composition to state management.

---

## Features

- **Full CRUD** — create, edit, duplicate, delete, pin, favorite, and archive prompts
- **Rich prompt metadata** — title, content, category, tags, description, and target AI model per prompt
- **Instant search** — across title, content, category, and tags simultaneously
- **Filtering & sorting** — by favorites, pinned, archived, category, and multiple sort orders
- **Dashboard overview** — live stats, recent prompts, and a category breakdown chart
- **Dedicated Favorites & Categories views** — real, data-driven pages, not placeholders
- **Dark mode** — persisted across sessions, respects system preference on first visit
- **Export** — download your prompts as JSON, TXT, or a formatted PDF
- **Import** — restore or merge prompts from a previously exported JSON file, with validation against malformed data
- **AI-powered prompt enhancement** — Improve, Rewrite, Summarize, or Optimize any prompt using Google's Gemini API (bring-your-own-key, stored only in your browser)
- **Fully responsive** — desktop, tablet, and mobile, with feature parity across breakpoints
- **Client-side routing** — real, shareable URLs for every view via React Router

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State management | React Context API + custom hooks |
| Data persistence | Browser `localStorage` |
| AI integration | Google Gemini API (direct client-side calls) |
| PDF generation | jsPDF |
| Deployment | Netlify |

No backend server is used in this version — all data lives in the browser's `localStorage`, and the app is architected so that a future migration to a real API (Node/Express/MongoDB) would only require changes to the service layer, not the rest of the application.

---

## Architecture

Promptarium follows a deliberately layered structure to keep data, logic, and presentation cleanly separated:

```
src/
├── components/     → Reusable, presentational UI pieces (PromptCard, Modal, forms, etc.)
├── pages/          → Route-level views (Dashboard, Prompts, Favorites, Categories, Settings)
├── layouts/         → Shared page shells (DashboardLayout: Navbar + Sidebar + content)
├── context/         → Global state (ThemeContext)
├── hooks/           → Encapsulated stateful logic (usePrompts, usePromptFilters, usePromptEditor, useTheme, useApiKey)
├── services/         → Pure, React-free data/logic functions (localStorage I/O, export/import, Gemini API calls)
├── constants/        → Fixed reference data (categories, AI model list)
├── routes/           → Route definitions
└── App.jsx
```

### Key design principles

- **Single source of truth** — all prompt data lives in one hook (`usePrompts`); every page derives its view from it via `useMemo`, never duplicating state.
- **Container vs. presentational separation** — pages decide *what* actions mean; shared components like `PromptCard` and `PromptForm` only render and call back up through props.
- **Services know nothing about React** — storage, export/import, and API logic are plain, testable functions, isolated from any component or hook.
- **Defensive by default** — validated imports, categorized API error handling, and guarded localStorage access throughout.
- **Duplication tolerated until proven** — shared modal/edit/delete logic across pages was only extracted into `usePromptEditor` after the repetition became concrete across three separate pages.

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Chirag-DATA/promptarium.git
cd promptarium
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

### Enabling AI Prompt Enhancement

The "Improve / Rewrite / Summarize / Optimize" features require a free Gemini API key:

1. Get a key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Open the app's **Settings** page
3. Paste your key — it's stored only in your browser's `localStorage` and is sent directly to Google's API, never to any third-party server

### Building for production

```bash
npm run build
npm run preview   # locally preview the production build
```

---

## Deployment

This project is configured for Netlify with client-side routing support. If deploying your own copy, ensure a `netlify.toml` exists at the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures direct navigation to routes like `/prompts` or `/favorites` resolves correctly instead of returning a 404.

---

## Roadmap

- [ ] Backend migration (Node.js, Express, MongoDB) for true multi-device sync
- [ ] JWT-based authentication
- [ ] Individual prompt detail pages with shareable links
- [ ] Toast notification system to replace native browser alerts

---

## Author

**Chirag Mittal**
- GitHub: [@Chirag-DATA](https://github.com/Chirag-DATA)
- LinkedIn: [mittal-chirag](https://linkedin.com/in/mittal-chirag)

---

## License

This project is open source and available under the [MIT License](LICENSE).
