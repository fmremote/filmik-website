create table if not exists public.website_leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('request-access', 'newsletter')),
  email text not null,
  name text,
  department text,
  marketing_opt_in boolean not null default false,
  source jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists website_leads_email_created_at_idx
  on public.website_leads (email, created_at desc);

alter table public.website_leads enable row level security;

-- Server-side Vercel requests use Supabase's service role; no browser role receives access.
grant insert on table public.website_leads to service_role;
grant select on table public.website_leads to service_role;
