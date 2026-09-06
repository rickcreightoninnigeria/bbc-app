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
