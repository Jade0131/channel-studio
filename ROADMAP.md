# Channel Studio — Roadmap

## The core idea
One universal baseline (the "base brain") stays untouched as the failsafe. Every social
account plugs into it as its own **independent brain** — Instagram, TikTok, Pinterest,
LinkedIn each get their own setup, niche research, approval flow, and weekly publishing
loop. Adding a new account later never touches the base: just wire in one more brain.

## The 4 accounts
1. **Instagram** — pilot account, the first brain (already built, working as the pilot).
2. **TikTok** — own brain, own niche research and content pillars.
3. **Pinterest** — own brain, newly added (was the missing 4th).
4. **LinkedIn** — own brain, newest addition alongside Pinterest.

Rollout order: validate baseline → deploy gate → Instagram pilot → TikTok → Pinterest → LinkedIn.

## How one account brain works
1. **Niche research** — searches the best niche based on trends and fame since the start of
   the year, including a calculated prediction of how the niche will perform for the rest of
   the year. Each account searches its *own* niche — no shared master list.
2. **User approval** — the found niche is shown with rationale; nothing runs until approved.
3. **Week of faceless content** — once approved, the account gets one push per day for a
   full week (message, clip, poll, whatever fits). Every day's post is designed first and
   approved before it goes out.

## Status

### Done
- Repaired all files truncated/corrupted during the shizuku transfer
  (4KB splice corruption from two overlapping transfer fragments).
- Full build passes (`npm run build`).
- Fixed splice bugs hiding in `tsconfig.node.json` — the real validator is
  `npx tsc -p tsconfig.app.json --noEmit` (root `tsconfig.json` was NOT checking).
- Instagram pilot view, TikTok setup view, LinkedIn setup view working.
- **Pinterest setup view added** (niche options, content pillars, daily flow,
  weekly schedule, review rhythm, growth tests, monetization paths + sidebar/TopBar wiring).
- **Pinterest brain personalized** — niches now match the real account lane:
  Dark Fantasy & Magic, Ancient Wisdom & Symbols, Dark & Atmospheric Photography,
  Occult/Mystic/Succubus Aesthetics, Ritual & Altar Lifestyle.
- **Account Connections screen added** — one place to see and connect all platforms
  (Instagram, Facebook/Meta, TikTok, Pinterest, LinkedIn). Demo tick for now;
  real login buttons come per platform as connectors are wired.
- Deployment gate checklist in the app (10 items, 9 required before rollout).

### Database (live now)
- Supabase project is live and seeded: `content_items` (12 real rows across all 4
  platforms), `workflow_runs` (12 rows), `rollout_checkpoints`.
- `src/lib/supabase.ts` client wired to the live project via `.env`
  (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — anon is public by design, safe).
- **Content Pipeline now reads real rows from the database** (`useContentData` hook,
  mock fallback when DB is unreachable). Shows a "Saved to database" badge when live.
- **Account Connections now persists via database** (`useAccountConnections` hook) once
  the `account_connections` table exists — graceful fallback to device storage today.
- To enable cloud-saved connections, run the SQL in
  `supabase/migrations/20260829200000_account_connections.sql` in the Supabase dashboard
  SQL editor (2-minute job, no secrets needed).

### Next / future
- Run the account_connections migration to turn connections cloud-saved.
- Real AI content generation per account brain.
- Real platform API connectors (Instagram/TikTok/Pinterest/LinkedIn publishing).
- Live deployment of this repo (the current live Bolt site still has no Pinterest).

## Granddad rule
When the road is blocked, stop, step aside, and change the point of view. The block shows
itself from the other angle.

### Business model & workflow layer (added)
- `CROSS_PLATFORM_BUSINESS_MODELS.md` — the shared monetization models, reusable
  AI-agent workflows, ranked first tests, and the weekly/monthly decision framework
  that sits on top of the technical workflow.
- `src/data/businessModels.ts` — typed data feeding the above: `MONETIZATION_MODELS`,
  `FIRST_TESTS`, `AUTOMATION_WORKFLOWS`, and `WEEKLY_REPORT_TEMPLATE` (builds clean).

### Per-platform deep-dives (added)
- `TIKTOK_DEEP_DIVE.md` — best niches, viable video formats, automatable workflow parts, realistic monetization paths, weekly calendar, and key risks.
- `LINKEDIN_DEEP_DIVE.md` — best niches, viable posting formats, automatable workflow parts, realistic monetization paths, weekly calendar, and key risks.
- `PINTEREST_DEEP_DIVE.md` — best niches, viable pin formats, automatable workflow parts, realistic monetization paths, weekly calendar, and key risks.
- `src/data/platformDeepDives.ts` — typed data layer: per-platform automation tasks (full/semi/manual with daily minutes), format rankings, monetization tiers with revenue estimates, and automation safety boundaries. Builds clean.

### Instagram deep-dive (added)
- `INSTAGRAM_DEEP_DIVE.md` — best niches (AI productivity visuals, faceless automation showcases), viable formats (screen recording Reels, carousels, before/after), automatable workflow parts, realistic monetization paths, weekly calendar, and key risks.
- `src/data/instagramSetup.ts` — typed data: niche options, content pillars, daily flow, review rhythm, growth tests, weekly schedule, monetization paths. Builds clean.
- `src/data/platformDeepDives.ts` — Instagram entry added: 11 automation tasks (6 full, 2 semi, 3 manual = 25 min/day human time), 7 format rankings, 4 monetization tiers, 4 safety boundaries.
