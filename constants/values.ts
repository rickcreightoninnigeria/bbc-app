export type PillarSlug = 'make' | 'many' | 'deep' | 'disciples';

export interface CrossLink {
  label: string;
  href: string;
}

export interface ValueSection {
  slug: string;
  title: string;
  features: string[];
  /** Set when this value's canonical screen lives outside its pillar's own route (e.g. Give). */
  externalHref?: string;
  crossLinks?: CrossLink[];
}

export interface Pillar {
  slug: PillarSlug;
  label: string;
  gloss: string;
  values: ValueSection[];
}

export const PILLARS: Pillar[] = [
  {
    slug: 'make',
    label: 'Make',
    gloss: 'Pray · Serve · Give',
    values: [
      {
        slug: 'pray',
        title: 'Pray Always',
        features: [
          'Prayer request wall (public / group / leaders-only)',
          'Answered-prayer testimonies',
          'Prayer Triplets hub — matching, nudges, prompts',
          'Missionary & planter prayer calendar',
          'Daily verse / prayer notification',
        ],
        crossLinks: [{ label: 'Prayer Triplets hub', href: '/prayer-triplets' }],
      },
      {
        slug: 'serve',
        title: 'Serve Joyfully & Sacrificially',
        features: [
          'Volunteer & rota sign-up',
          'Spiritual gifts survey → serving matcher',
          'Meal train / practical needs board',
          'Mission trip sign-ups',
        ],
        externalHref: '/serve',
      },
      {
        slug: 'give',
        title: 'Give Joyfully & Sacrificially',
        features: [
          'Bank transfer details',
          'Giving teaching content',
          'Personal giving plan + reminders',
        ],
        externalHref: '/give',
      },
    ],
  },
  {
    slug: 'many',
    label: 'Many',
    gloss: 'Reach · Plant',
    values: [
      {
        slug: 'reach',
        title: 'Make Christ Known',
        features: [
          '"Invite a friend" share tool',
          'Outreach & evangelism event calendar',
          'Testimony library',
          'Gospel explainer / tract',
        ],
      },
      {
        slug: 'plant',
        title: 'Plant More Churches',
        features: [
          'Church-planting network map + updates',
          '"Interested in planting/sending" register',
          'Partner church directory',
        ],
      },
    ],
  },
  {
    slug: 'deep',
    label: 'Deep',
    gloss: 'Scripture · Grow · Next Gen',
    values: [
      {
        slug: 'scripture',
        title: 'Rooted in Scripture',
        features: [
          'Sermon archive, searchable by series',
          'Bible reading plan + tracker',
          'Verse of the day',
          'Statement of faith reference',
        ],
      },
      {
        slug: 'grow',
        title: 'Grow in Christ',
        features: [
          'Discipleship course library',
          'Mentoring match-up',
          'Baptism / membership class sign-up',
        ],
      },
      {
        slug: 'next-gen',
        title: 'Build the Next Generation',
        features: [
          'Kids & youth ministry info + check-in',
          'Parent resources, youth calendar',
          'Safeguarding contact info',
        ],
        crossLinks: [{ label: 'Safeguarding & Policies', href: '/safeguarding' }],
      },
    ],
  },
  {
    slug: 'disciples',
    label: 'Disciples',
    gloss: 'Family · Magnify',
    values: [
      {
        slug: 'family',
        title: 'Be a Big, Warm Welcoming Family',
        features: [
          'Community Group finder + join request',
          'Leader toolkit: WhatsApp link, meal rota, roles',
          'Newcomer / visitor welcome flow',
        ],
        crossLinks: [
          { label: 'Prayer Triplets hub', href: '/prayer-triplets' },
          { label: 'Member Directory', href: '/directory' },
        ],
      },
      {
        slug: 'magnify',
        title: 'Magnify God Together',
        features: [
          'Service times, locations, livestream',
          'Worship setlists / song requests',
          'All-church gatherings, baptism celebrations',
        ],
        crossLinks: [{ label: 'Calendar', href: '/calendar' }],
      },
    ],
  },
];

export function findPillar(slug: string | string[] | undefined): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

export function findValue(pillar: Pillar | undefined, slug: string | string[] | undefined) {
  return pillar?.values.find((v) => v.slug === slug);
}

export interface UtilityItem {
  label: string;
  description: string;
  href: string;
}

export const UTILITY_ITEMS: UtilityItem[] = [
  { label: 'Give', description: 'Shortcut straight to giving — also lives under Make.', href: '/give' },
  { label: 'Member Directory', description: 'Shortcut — also reachable from Disciples → Family.', href: '/directory' },
  { label: 'Calendar', description: 'Single shared calendar, filtered by tag wherever it appears.', href: '/calendar' },
  { label: 'Search', description: 'Across sermons, groups, events, people.', href: '/search' },
  { label: 'Safeguarding & Policies', description: 'Linked from here and from Deep → Next Generation.', href: '/safeguarding' },
];
