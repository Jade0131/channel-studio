-- Account Connections table
-- Single-tenant (no sign-in), so anon can read/write its own connection state.

create table if not exists public.account_connections (
  id uuid primary key default gen_random_uuid(),
  provider text unique not null,          -- instagram | facebook | tiktok | pinterest | linkedin
  label text not null,
  connected boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.account_connections enable row level security;

-- Allow anon + authenticated read/write (single-tenant app)
drop policy if exists "anon read connections" on public.account_connections;
create policy "anon read connections"
  on public.account_connections for select using (true);

drop policy if exists "anon write connections" on public.account_connections;
create policy "anon write connections"
  on public.account_connections for insert with check (true);

drop policy if exists "anon update connections" on public.account_connections;
create policy "anon update connections"
  on public.account_connections for update using (true);

-- Seed the five platform rows
insert into public.account_connections (provider, label, connected) values
  ('instagram', 'Instagram', false),
  ('facebook', 'Facebook / Meta', false),
  ('tiktok', 'TikTok', false),
  ('pinterest', 'Pinterest', false),
  ('linkedin', 'LinkedIn', false)
on conflict (provider) do nothing;

-- Add account name + optional credential fields for real connects
alter table public.account_connections
  add column if not exists account_name text;
alter table public.account_connections
  add column if not exists access_token text;
alter table public.account_connections
  add column if not exists verified boolean not null default false;
