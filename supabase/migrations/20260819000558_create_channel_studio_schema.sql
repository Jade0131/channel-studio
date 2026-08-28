/*
# Channel Studio — Initial Database Schema

## Purpose
Creates the full database for a social content workflow system that coordinates
Instagram, TikTok, Pinterest, and LinkedIn from one shared dashboard. The app has
no sign-in screen, so all tables are single-tenant with open CRUD for anon + authenticated.

## New Tables

1. **content_items** — Individual content pieces across all platforms
   - id (uuid, PK)
   - platform (text: instagram | tiktok | pinterest | linkedin)
   - format (text: reels | stories | posts | pins | short-form)
   - title (text)
   - stage (text: ideation | drafting | review | scheduled | published)
   - status (text: active | archived)
   - assignee (text)
   - input (jsonb — topic, audience, tone, keywords, references, CTA, brand guidelines)
   - output (jsonb — caption, hashtags, script, visual direction, thumbnail, posting time, reach)
   - created_at, updated_at (timestamps)

2. **workflow_runs** — Daily/weekly workflow execution records
   - id (uuid, PK)
   - date (date)
   - stage (text: trigger | topic-selection | brief-creation | draft-generation | asset-production | caption-variants | approval-checkpoint | scheduling | handoff)
   - status (text: pending | running | complete | failed)
   - items_processed (int)
   - items_generated (int)
   - duration (text)
   - created_at (timestamp)

3. **approval_batches** — Weekly approval review batches
   - id (uuid, PK)
   - week_label (text)
   - review_date (date)
   - status (text: open | closed)
   - created_at, updated_at (timestamps)

4. **approval_items** — Individual items within an approval batch
   - id (uuid, PK)
   - batch_id (uuid, FK → approval_batches)
   - content_id (uuid, FK → content_items)
   - title (text)
   - platform (text)
   - format (text)
   - decision (text: pending | approved | rejected | revisions)
   - reviewer (text)
   - notes (text)
   - created_at, updated_at (timestamps)

5. **test_results** — Test plan execution results
   - id (uuid, PK)
   - scenario_id (text)
   - status (text: not-run | running | passed | failed | warning)
   - duration (text)
   - notes (text)
   - checks_passed (int)
   - checks_total (int)
   - timestamp (timestamptz)

6. **test_issues** — Issues found during test validation
   - id (uuid, PK)
   - scenario_id (text)
   - severity (text: blocker | major | minor)
   - description (text)
   - affected_stage (text)
   - status (text: open | fixing | resolved)
   - must_fix_before_deploy (boolean)
   - created_at, updated_at (timestamps)

7. **deployment_checklist** — Deployment gate checklist items
   - id (uuid, PK)
   - label (text)
   - description (text)
   - category (text: core-tests | quality | process | readiness)
   - required (boolean)
   - checked (boolean)
   - created_at, updated_at (timestamps)

8. **rollout_steps** — Channel rollout phase tracking
   - id (uuid, PK)
   - platform_id (text)
   - phase (text)
   - step_order (int)
   - label (text)
   - status (text: locked | ready | in-progress | passed | blocked)
   - notes (text)
   - created_at, updated_at (timestamps)

9. **rollout_entry_criteria** — Entry criteria for each rollout step
   - id (uuid, PK)
   - step_id (uuid, FK → rollout_steps)
   - criterion_id (text)
   - label (text)
   - description (text)
   - met (boolean)

10. **rollout_checkpoints** — Activation checkpoints for each rollout step
    - id (uuid, PK)
    - step_id (uuid, FK → rollout_steps)
    - checkpoint_id (text)
    - label (text)
    - description (text)
    - passed (boolean)

## Security
- RLS enabled on every table.
- All tables use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because this is a single-tenant app with no sign-in — the data is intentionally shared.
- 4 policies per table (SELECT, INSERT, UPDATE, DELETE).
*/

-- ── 1. content_items ──
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  format text NOT NULL,
  title text NOT NULL,
  stage text NOT NULL DEFAULT 'ideation',
  status text NOt NOT NULL,
  decision text NOT NULL DEFAULT 'pending',
  reviewer text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE approval_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_approval_items" ON approval_items;
CREATE POLICY "anon_select_approval_items" ON approval_items FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_approval_items" ON approval_items;
CREATE POLICY "anon_insert_approval_items" ON approval_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_approval_items" ON approval_items;
CREATE POLICY "anon_update_approval_items" ON approval_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_approval_items" ON approval_items;
CREATE POLICY "anon_delete_approval_items" ON approval_items FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_approval_items_batch ON approval_items(batch_id);

-- ── 5. test_results ──
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id text NOT NULL,
  status text NOT NULL DEFAULT 'not-run',
  duration text NOT NULL DEFAULT '—',
  notes text NOT NULL DEFAULT '',
  checks_passed int NOT NULL DEFAULT 0,
  checks_total int NOT NULL DEFAULT 0,
  timestamp timestamptz
);
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_test_results" ON test_results;
CREATE POLICY "anon_select_test_results" ON test_results FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_test_results" ON test_results;
CREATE POLICY "anon_insert_test_results" ON test_results FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_test_results" ON test_results;
CREATE POLICY "anon_update_test_results" ON test_results FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_test_results" ON test_results;
CREATE POLICY "anon_delete_test_results" ON test_results FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_test_results_scenario ON test_results(scenario_id);

-- ── 6. test_issues ──
CREATE TABLE IF NOT EXISTS test_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id text NOT NULL,
  severity text NOT NULL DEFAULT 'minor',
  description text NOT NULL,
  affected_stage text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'open',
  must_fix_before_deploy boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE test_issues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_test_issues" ON test_issues;
CREATE POLICY "anon_select_test_issues" ON test_issues FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_test_issues" ON test_issues;
CREATE POLICY "anon_insert_test_issues" ON test_issues FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_test_issues" ON test_issues;
CREATE POLICY "anon_update_test_issues" ON test_issues FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_test_issues" ON test_issues;
CREATE POLICY "anon_delete_test_issues" ON test_issues FOR DELETE
  TO anon, authenticated USING (true);

-- ── 7. deployment_checklist ──
CREATE TABLE IF NOT EXISTS deployment_checklist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'core-tests',
  required boolean NOT NULL DEFAULT true,
  checked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE deployment_checklist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_deployment_chollout_checkpoints" ON rollout_checkpoints;
CREATE POLICY "anon_insert_rollout_checkpoints" ON rollout_checkpoints FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_rollout_checkpoints" ON rollout_checkpoints;
CREATE POLICY "anon_update_rollout_checkpoints" ON rollout_checkpoints FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_rollout_checkpoints" ON rollout_checkpoints;
CREATE POLICY "anon_delete_rollout_checkpoints" ON rollout_checkpoints FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_rollout_checkpoints_step ON rollout_checkpoints(step_id);

-- ── updated_at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_content_items_updated ON content_items;
CREATE TRIGGER trigger_content_items_updated BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_approval_batches_updated ON approval_batches;
CREATE TRIGGER trigger_approval_batches_updated BEFORE UPDATE ON approval_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_approval_items_updated ON approval_items;
CREATE TRIGGER trigger_approval_items_updated BEFORE UPDATE ON approval_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_test_issues_updated ON test_issues;
CREATE TRIGGER trigger_test_issues_updated BEFORE UPDATE ON test_issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_deployment_checklist_updated ON deployment_checklist;
CREATE TRIGGER trigger_deployment_checklist_updated BEFORE UPDATE ON deployment_checklist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_rollout_steps_updated ON rollout_steps;
CREATE TRIGGER trigger_rollout_steps_updated BEFORE UPDATE ON rollout_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
