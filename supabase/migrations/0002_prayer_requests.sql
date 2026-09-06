-- Prayer Request Wall — public tier only for now (no group/leaders-only
-- visibility yet, since that needs auth + Community Group membership,
-- neither of which exist in this app yet). Anyone can read and post;
-- nobody can edit or delete a request except via the Supabase dashboard.

create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author_name text,
  request_text text not null,
  pray_count integer not null default 0
);

alter table prayer_requests enable row level security;

create policy "Anyone can read prayer requests"
  on prayer_requests
  for select
  to anon, authenticated
  using (true);

create policy "Anyone can post a prayer request"
  on prayer_requests
  for insert
  to anon, authenticated
  with check (true);

-- No update/delete policy for anon/authenticated — requests can't be edited
-- or removed from the app once posted. The pray_count increment below goes
-- through a security-definer function instead, so it doesn't need its own
-- UPDATE grant (and can't be used to change anything else on the row).

create or replace function increment_pray_count(request_id uuid)
returns integer
language sql
security definer
set search_path = public
as $$
  update prayer_requests
  set pray_count = pray_count + 1
  where id = request_id
  returning pray_count;
$$;

grant execute on function increment_pray_count(uuid) to anon, authenticated;
