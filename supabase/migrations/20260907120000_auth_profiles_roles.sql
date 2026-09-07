-- Auth foundation: a profile row per signed-up user, plus a flexible
-- role-assignment system so one person can hold several roles at once
-- (e.g. Community Group Leader for one group AND Ministry Leader for
-- another), rather than a single fixed tier per user.

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Any signed-in member can browse the directory. Not available to anon —
-- you must have an account to see other members, even though most of the
-- rest of the app needs no login at all.
create policy "Authenticated users can view profiles"
  on profiles
  for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Keep updated_at honest on every edit.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on profiles
  for each row
  execute function set_updated_at();

-- Auto-create a profile row the moment someone signs up, pulling full_name
-- out of the signup metadata if it was provided.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function handle_new_user();

-- Flexible role system: any number of (role_type, scope_label) rows per
-- user. role_type is a free-form label ('community_group_leader',
-- 'ministry_leader', 'admin', ...) rather than a fixed enum, and
-- scope_label names what it applies to ("Sabon Gari Group", "Children's
-- Ministry") — deliberately a text label for now rather than a foreign key
-- to a groups/ministries table, since those don't exist yet as real data.
create table if not exists role_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role_type text not null,
  scope_label text,
  created_at timestamptz not null default now(),
  unique (user_id, role_type, scope_label)
);

alter table role_assignments enable row level security;

-- Members can see their own roles (e.g. to show "You lead: Sabon Gari
-- Group" somewhere). No one can see anyone else's roles yet, and no one
-- can assign themselves a role — that's an admin-only action for now, done
-- directly via the Supabase dashboard until there's an in-app admin view.
create policy "Users can view their own role assignments"
  on role_assignments
  for select
  to authenticated
  using (auth.uid() = user_id);
