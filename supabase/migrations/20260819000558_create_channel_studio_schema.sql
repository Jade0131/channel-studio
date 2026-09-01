-- Channel Studio — Full Database Schema (fixed ordering)

-- ── 1. content_items ──
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  format text NOT NULL,
  title text NOT NULL,
  stage text NOT NULL DEFAULT 'ideation',
  status text NOT NULL DEFAULT 'active',
  decision text NOT NULL DEFAULT 'pending',
  reviewer text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  input jsonb,
  output jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── 2. workflow_runs ──
CREATE TABLE IF NOT EXISTS workflow_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT current_date,
  stage text NOT NULL DEFAULT 'trigger',
  status text NOT NULL DEFAULT 'pending',
  items_processed int NOT NULL DEFAULT 0,
  items_generated int NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ── 3. approval_batches ──
CREATE TABLE IF NOT EXISTS approval_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_label text NOT NULL DEFAULT '',
  review_date date,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── 4. approval_items ──
CREATE TABLE IF NOT EXISTS approval_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES approval_batches(id),
  content_id uuid REFERENCES content_items(id),
  title text NOT NULL DEFAULT '',
  platform text NOT NULL DEFAULT '',
  format text NOT NULL DEFAULT '',
  decision text NOT NULL DEFAULT 'pending',
  reviewer text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── 5. test_results ──
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id text NOT NULL,
  status text NOT NULL DEFAULT 'not-run',
  duration text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  checks_passed int NOT NULL DEFAULT 0,
  checks_total int NOT NULL DEFAULT 0,
  timestamp timestamptz
);

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

-- ── 8. rollout_steps ──
CREATE TABLE IF NOT EXISTS rollout_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id text NOT NULL,
  phase text NOT NULL DEFAULT '',
  step_order int NOT NULL DEFAULT 0,
  label text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'locked',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── 9. rollout_entry_criteria ──
CREATE TABLE IF NOT EXISTS rollout_entry_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid REFERENCES rollout_steps(id),
  criterion_id text NOT NULL,
  label text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  met boolean NOT NULL DEFAULT false
);

-- ── 10. rollout_checkpoints ──
CREATE TABLE IF NOT EXISTS rollout_checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id uuid REFERENCES rollout_steps(id),
  checkpoint_id text NOT NULL,
  label text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  passed boolean NOT NULL DEFAULT false
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_content_items_platform ON content_items(platform);
CREATE INDEX IF NOT EXISTS idx_content_items_stage ON content_items(stage);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_date ON workflow_runs(date);
CREATE INDEX IF NOT EXISTS idx_approval_items_batch ON approval_items(batch_id);
CREATE INDEX IF NOT EXISTS idx_approval_items_content ON approval_items(content_id);
CREATE INDEX IF NOT EXISTS idx_test_results_scenario ON test_results(scenario_id);
CREATE INDEX IF NOT EXISTS idx_rollout_entry_criteria_step ON rollout_entry_criteria(step_id);
CREATE INDEX IF NOT EXISTS idx_rollout_checkpoints_step ON rollout_checkpoints(step_id);

-- ── RLS ──
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE rollout_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE rollout_entry_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE rollout_checkpoints ENABLE ROW LEVEL SECURITY;

-- ── RLS Policies (single-tenant, anon+authenticated) ──
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'content_items', 'workflow_runs', 'approval_batches', 'approval_items',
    'test_results', 'test_issues', 'deployment_checklist',
    'rollout_steps', 'rollout_entry_criteria', 'rollout_checkpoints'
  ]) LOOP
    EXECUTE format('DROP POLICY IF EXISTS "anon_select_%s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "anon_select_%s" ON %I FOR SELECT TO anon, authenticated USING (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "anon_insert_%s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "anon_insert_%s" ON %I FOR INSERT TO anon, authenticated WITH CHECK (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "anon_update_%s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "anon_update_%s" ON %I FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "anon_delete_%s" ON %I', tbl, tbl);
    EXECUTE format('CREATE POLICY "anon_delete_%s" ON %I FOR DELETE TO anon, authenticated USING (true)', tbl, tbl);
  END LOOP;
END $$;

-- ── updated_at trigger ──
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'content_items', 'approval_batches', 'approval_items',
    'test_issues', 'deployment_checklist', 'rollout_steps'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trigger_%s_updated ON %I', tbl, tbl);
    EXECUTE format('CREATE TRIGGER trigger_%s_updated BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', tbl, tbl);
  END LOOP;
END $$;
