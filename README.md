# BBC App

A church app for Berean Bible Church, structured around the four-word discipleship
framework "Make Many Deep Disciples" — each word groups several of BBC's nine
Core Value slogans into a top-level navigation destination.

See the [reference doc](https://claude.ai/code/artifact/bb85d6d5-6a64-48e5-b04e-5cf14e537204)
for the full nav map, feature list, and design decisions this scaffold implements.

## Stack

- **Expo + React Native + TypeScript**, using **Expo Router** (file-based routing)
- **NativeWind** (Tailwind for React Native) for styling
- **TanStack Query** for server state
- **Supabase** (Postgres + Auth + Storage) as the backend — this app is the
  system of record; there's no existing ChMS to integrate against
- **EAS Build / EAS Update** for shipping to app stores and OTA updates

## Structure

```
app/
  _layout.tsx           Root Stack: (tabs) + canonical utility screens
  give.tsx               \
  directory.tsx            canonical routes, reachable from multiple
  calendar.tsx              places in (tabs) as well as directly
  prayer-triplets.tsx       (see constants/values.ts crossLinks)
  search.tsx
  safeguarding.tsx
  settings.tsx
  (tabs)/
    _layout.tsx          Tabs: Make / Many / Deep / Disciples / More
    make/                Pray Always, Serve, Give
    many/                Make Christ Known, Plant More Churches
    deep/                Rooted in Scripture, Grow in Christ, Next Generation
    disciples/           Family, Magnify God Together
    more/                Utility menu (shortcuts to canonical routes above)
components/
  PillarIndexScreen.tsx  Shared list screen for each pillar's index route
  ValueDetailScreen.tsx  Shared detail screen for each pillar's [value] route
  Card.tsx, FeatureList.tsx, PlaceholderScreen.tsx
constants/
  values.ts              Single source of truth: pillars, values, features, crosslinks
  theme.ts               Pillar accent colors as literal NativeWind class strings
lib/
  supabase.ts            Supabase client (reads EXPO_PUBLIC_SUPABASE_* env vars)
  queryClient.ts          TanStack Query client
  givingStorage.ts        AsyncStorage-backed giving plan + history (on-device, private)
  givingReminders.ts      expo-notifications scheduling for weekly/monthly reminders
  useGivingPlan.ts        Hook tying the above together for GivingPlanSection
  giftsSurvey.ts          Gift list, survey statements, scoring, Supabase submission
  prayerWall.ts           Prayer Request Wall: fetch/post/pray-count via Supabase + TanStack Query
supabase/
  migrations/             SQL to run in your Supabase project's SQL editor
```

Adding a new feature under an existing value means editing `constants/values.ts`
— the index and detail screens are data-driven, not hand-written per screen.

## Decisions already made

- **Give** is a UI-only split of "Serve Joyfully & Sacrificially" for navigation
  purposes — not one of BBC's nine published Core Values.
- **Giving has no payment processing.** BBC gives by bank transfer or in person
  (cash), not card — so `/give` is informational (bank details, teaching
  content) plus a personal giving-plan/reminder feature, never a checkout flow.
- **The giving plan is on-device only, not in Supabase.** It's stored in
  AsyncStorage and never leaves the phone — deliberately private (no admin
  visibility), matching the "give in secret" instinct. Reminders use local
  notifications (`expo-notifications`), which work in Expo Go without a dev
  build. There's no bank-transaction verification and no leaderboard/streaks —
  it's a self-reported journal, not a payment or accountability system.
- **Prayer Triplets** stay distinct from Community Groups (per the Small Group
  Strategy v2 doc), but are crosslinked from both Make → Pray Always and
  Disciples → Family.
- **Sermons** live on YouTube (`@BereanBibleChurch_NG`) and are also linked from
  Spotify via linktr.ee. Don't call the YouTube Data API from the client —
  a scheduled backend job should sync video metadata into Supabase instead, so
  no API key is exposed client-side and quota is controlled.
- **The Spiritual Gifts Survey is the opposite privacy model from the giving
  plan.** Its whole point is a "matcher" — results are submitted to Supabase
  (`gift_survey_responses`) so leadership can follow up, and there's
  deliberately no read access for the anon/authenticated roles (see
  `supabase/migrations/0001_gift_survey_responses.sql`), so one member can't
  see another's results — only a project admin, via the Supabase dashboard,
  can. There's no in-app admin view yet; that's the next real step once
  there's a live Supabase project (see below).
- **The Prayer Request Wall only implements the "public" visibility tier.**
  The original feature called for public/group/leaders-only requests, but
  group and leaders-only both need auth + Community Group membership, which
  this app doesn't have yet. Everything posted is visible to anyone using the
  app — the screen says so explicitly. Requests live in Supabase
  (`prayer_requests`, see `supabase/migrations/0002_prayer_requests.sql`);
  the "praying" counter increments through a security-definer Postgres
  function rather than a direct UPDATE grant, so posting can't be used to
  tamper with someone else's request text. Verified end-to-end against the
  live project: insert, read, the RPC increment, and that a direct tamper
  attempt on request_text is silently rejected by RLS.
- **Rooted in Scripture and Magnify God Together needed no backend at all.**
  `/scripture/sermons` just opens BBC's existing YouTube and Spotify links in
  the browser rather than embedding anything; `/magnify/service-times` is
  static real content (Sunday Service 10–11:30am, Saturday Bible Study
  8–10:30am, both at 8 Wamba Road, with the last-Saturday-of-the-month
  exception for the government's Sanitation exercise). Both are hubs
  matching Pray/Serve's shape, with the rest of their original features
  left as stubs.
- **Safeguarding & Policies has generic, unreviewed placeholder text** — a
  standard child-protection commitment statement and a report-a-concern
  section with `[safeguarding contact]` left as a placeholder. This is
  boilerplate, not BBC's actual reviewed policy — don't treat it as such.
- **Family is now a hub too**, with real Community Groups content pulled
  from the original "Community Groups overview (Leaders' Info)" doc — size,
  make-up, commitments, and the Host/Coordinator/Pastoral Contact roles.
  `[community groups contact]` is a placeholder for how someone actually
  joins one. Prayer Triplets also got its real content from the Small Group
  Strategy (v2) doc, replacing its placeholder.
- **App icon, splash screen, and Android adaptive icon now use BBC's real
  logo** — cropped from a WhatsApp group-icon screenshot (`#473483` purple,
  extracted programmatically). The adaptive icon's foreground is the mark
  only (no wordmark), transparent, sized within Android's ~66% safe zone,
  since a circular launcher mask would clip the "BEREAN BIBLE CHURCH" text
  if the full lockup were used there — the full lockup (mark + wordmark) is
  used for the main `icon.png` and the splash screen, where nothing crops
  it. **None of this is visible in Expo Go** — icon and splash customization
  only take effect in a real (EAS/standalone) build, not the shared Expo Go
  container app.

## Setting up Supabase (needed for the Gifts Survey and Prayer Wall to work)

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine to start).
2. In the project's SQL Editor, run everything in each file under `supabase/migrations/`, in order.
3. From Project Settings → API, copy the Project URL and the `anon` public key
   into your `.env` as `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
4. Restart `expo start` so the new env vars are picked up.

Until this is done, the Gifts Survey still works end-to-end but tells the
user results weren't saved, and the Prayer Wall shows a "not connected yet"
message instead of a composer/list — neither pretends to succeed. To read
submitted gift survey responses, use the Supabase dashboard's Table Editor
(there's no in-app admin view yet); prayer requests are visible in the app
itself, to anyone, since that tier needs no login.

## Getting started

```bash
cp .env.example .env   # fill in your Supabase project URL + anon key
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR
code with Expo Go on a physical device.

**Note:** `npm run web` currently crashes on load due to an unrelated bug in
Expo Router's bundled web dev-tooling (nativewind/nativewind#1489 — fixed only
in NativeWind's v5 preview, not yet in a stable release). This does not affect
iOS or Android, which is the actual target platform; a raw iOS bundle request
to Metro was verified to compile with no transform errors.
