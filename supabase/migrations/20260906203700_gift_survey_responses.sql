-- Spiritual Gifts Survey submissions.
-- Anyone (anon key) can INSERT their own response, but no SELECT policy is
-- granted to anon/authenticated — so a submission can't be read back by any
-- app user, only by a Supabase project admin (dashboard Table Editor, or the
-- service-role key). That's deliberate: this table exists so leadership can
-- see submissions, not so members can see each other's.

create table if not exists gift_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  respondent_name text not null,
  respondent_contact text,
  mode text not null check (mode in ('quick', 'in-depth')),
  top_gifts text[] not null,
  scores jsonb
);

alter table gift_survey_responses enable row level security;

create policy "Anyone can submit a gift survey response"
  on gift_survey_responses
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policy is created, so only an admin (via the
-- Supabase dashboard or service-role key) can read these responses.
