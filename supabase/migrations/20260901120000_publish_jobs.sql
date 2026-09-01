-- Publish jobs: tracks every publish attempt per content item per platform.

create table if not exists public.publish_jobs (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id),
  platform text not null,            -- pinterest | instagram | tiktok | etc
  status text not null default 'pending',  -- pending | publishing | published | failed
  scheduled_for timestamptz,         -- when it should go live (null = immediate)
  published_at timestamptz,          -- when it actually went live
  external_id text,                  -- platform's pin/post/video id after publish
  external_url text,                -- link to the live content
  error_message text,               -- null on success
  attempt_count int not null default 0,
  last_attempt_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.publish_jobs enable row level security;

-- anon can read/write (single-tenant app)
drop policy if exists "anon read publish_jobs" on public.publish_jobs;
create policy "anon read publish_jobs"
  on public.publish_jobs for select using (true);

drop policy if exists "anon insert publish_jobs" on public.publish_jobs;
create policy "anon insert publish_jobs"
  on public.publish_jobs for insert with check (true);

drop policy if exists "anon update publish_jobs" on public.publish_jobs;
create policy "anon update publish_jobs"
  on public.publish_jobs for update using (true);

-- Indexes
create index if not exists idx_publish_jobs_content on public.publish_jobs(content_id);
create index if not exists idx_publish_jobs_status on public.publish_jobs(status);
create index if not exists idx_publish_jobs_platform on public.publish_jobs(platform);

-- updated_at trigger
create or replace function update_publish_jobs_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_publish_jobs_updated on public.publish_jobs;
create trigger trigger_publish_jobs_updated
  before update on public.publish_jobs
  for each row execute function update_publish_jobs_updated_at();
