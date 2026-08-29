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
- Deployment gate checklist in the app (10 items, 9 required before rollout).

### Next / future
- Persist real data (Supabase is scaffolded but not fully wired).
- Real AI content generation per account brain.
- Real platform API connectors (Instagram/TikTok/Pinterest/LinkedIn publishing).
- Live deployment of this repo (the current live Bolt site still has no Pinterest).

## Granddad rule
When the road is blocked, stop, step aside, and change the point of view. The block shows
itself from the other angle.
