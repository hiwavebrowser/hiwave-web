-- Zen Browser License Schema
-- Run this in Supabase SQL Editor

-- Create enum for license tiers
create type license_tier as enum (
  'free',
  'starter',       -- $10 → 1 major version
  'supporter',     -- $15 → 3 major versions
  'believer',      -- $20 → 5 major versions
  'early_adopter'  -- Donation → 4 major versions (150 founders limit)
);

-- Create licenses table with tier support
create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  license_key text unique not null,

  -- Tier and entitlement tracking
  tier license_tier not null default 'free',
  purchased_major_version int not null default 1,
  versions_included int not null default 0,

  -- Stripe references
  stripe_session_id text unique,
  stripe_customer_id text,
  stripe_product_id text,
  amount_paid int,  -- In cents

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes for fast lookups
create index licenses_email_idx on public.licenses(email);
create index licenses_key_idx on public.licenses(license_key);
create index licenses_session_idx on public.licenses(stripe_session_id);
create index licenses_tier_idx on public.licenses(tier);

-- Comment for documentation
comment on table public.licenses is 'Stores Zen Browser license keys with tier entitlements';

-- Helper function to check Early Adopter availability
create or replace function get_early_adopter_slots_remaining()
returns int
language sql
stable
as $$
  select 150 - count(*)::int
  from public.licenses
  where tier = 'early_adopter';
$$;

-- Helper function to calculate entitled version
create or replace function get_entitled_through_version(
  p_purchased_major int,
  p_versions_included int
)
returns int
language sql
immutable
as $$
  select p_purchased_major + p_versions_included - 1;
$$;

-- Trigger to update updated_at timestamp
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger licenses_updated_at
  before update on public.licenses
  for each row
  execute function update_updated_at();

-- View for license statistics (useful for admin)
create or replace view license_stats as
select
  tier,
  count(*) as total_licenses,
  sum(amount_paid) / 100.0 as total_revenue,
  avg(amount_paid) / 100.0 as avg_amount
from public.licenses
where tier != 'free'
group by tier;

-- Grant access (Supabase uses RLS, but we're using service_role key)
-- These are optional if using service_role key exclusively
alter table public.licenses enable row level security;

-- Policy for service role (full access)
create policy "Service role has full access"
  on public.licenses
  for all
  using (true)
  with check (true);
