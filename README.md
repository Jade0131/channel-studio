# Channel Studio

A coordinated social content workflow system for **Instagram**, **TikTok**, **Pinterest**, and **LinkedIn** — built around a single universal baseline workflow with phased channel rollout and a fallback safety line.

Built with React, TypeScript, Tailwind CSS, Vite, and Supabase.

---

## What It Does

Channel Studio runs all four social channels from one shared dashboard. Instead of building a separate workflow per platform, it uses a **universal baseline workflow** that generates content platform-neutral, then adds only the minimum channel-specific adjustments on top.

### Core Features

- **Shared Dashboard** — One frame for all channels, content formats, inputs, outputs, and handoff points
- **Universal Workflow** — A 9-stage daily/weekly content generation pipeline from topic selection to handoff
- **Weekly Approval** — Batch review of all generated content before it goes live
- **Extension Points** — Defined stages where channel-specific behavior can be injected without rewriting the baseline
- **Test Plan** — Repeatable test scenarios to validate the workflow before deployment
- **Deployment Gate** — A checklist-gated approval process before the workflow goes live
- **Fallback Path** — If a channel-specific flow breaks, the universal baseline takes over automatically
- **Channel Rollout** — A gated, phased path from the validated baseline into channel-specific setups, one channel at a time
- **Instagram Pilot** — The first real channel test, with entry criteria, baseline-reuse mapping, and reusable lessons

### Workflow Stages

```
Daily Trigger -> Topic Selection -> Content Brief -> Draft Creation ->
Supporting Assets -> Captions & Variations -> Weekly Approval ->
Scheduling -> Handoff
```

### Rollout Order

```
Validate Baseline -> Deploy Baseline -> Instagram (Pilot) ->
TikTok -> Pinterest -> LinkedIn
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Build | Vite |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/sophiasummers971-del/channel-studio.git
cd channel-studio
npm install
npm run dev
```

The dev server starts automatically. Open the URL shown in your terminal.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

---

## Project Structure

```
src/
|-- components/        # Shared UI components (Sidebar, TopBar, ContentCard, Modal)
|-- data/              # Static data definitions (platforms, workflow, test plan, etc.)
|-- hooks/             # React hooks for stateful view logic
|-- lib/               # Supabase client
|-- types/             # TypeScript type definitions
`-- views/             # Page-level views (Dashboard, Workflow, TestPlan, etc.)
```

---

## Database

The project uses Supabase (PostgreSQL) for data persistence. The schema includes tables for content items, workflow runs, approval batches, test results, deployment checklist, and rollout tracking.

Row-level security is enabled on every table with open access policies (single-tenant, no auth).

---

## Working Rule

> Roll out only at a pace that keeps the system smooth and manageable. Prefer steady expansion over fast expansion. Stop and simplify if a new channel introduces unnecessary pressure.

---

## License

MIT -- see [LICENSE](LICENSE)

---

Built with [Bolt](https://bolt.new)
