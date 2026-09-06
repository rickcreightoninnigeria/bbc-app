import { isSupabaseConfigured, supabase } from './supabase';

export interface Gift {
  key: string;
  name: string;
  description: string;
  /** Names of Serve teams (from app/serve/join-a-team.tsx) this gift tends to fit well. */
  teamMatch?: string[];
}

export const GIFTS: Gift[] = [
  {
    key: 'leadership',
    name: 'Leadership',
    description: 'Casting vision and organizing people to move toward a shared goal.',
  },
  {
    key: 'teaching',
    name: 'Teaching',
    description: 'Explaining Scripture and truth clearly so others understand and grow.',
    teamMatch: ['Kids Ministry'],
  },
  {
    key: 'encouragement',
    name: 'Encouragement',
    description: 'Coming alongside people with words and presence that strengthen their faith.',
    teamMatch: ['Welcome Team'],
  },
  {
    key: 'giving',
    name: 'Giving',
    description: 'Generously and cheerfully contributing resources to meet needs.',
  },
  {
    key: 'mercy',
    name: 'Mercy',
    description: 'Feeling and acting on compassion for those who are suffering or struggling.',
    teamMatch: ['Coffee / Hospitality', 'Welcome Team'],
  },
  {
    key: 'serving',
    name: 'Serving',
    description: 'Noticing practical needs and quietly meeting them, whatever the task.',
    teamMatch: ['Set Up / Pack Down', 'Welcome Team'],
  },
  {
    key: 'administration',
    name: 'Administration',
    description: 'Organizing people, plans, and logistics so things run smoothly.',
    teamMatch: ['Tech / Sound', 'Set Up / Pack Down'],
  },
  {
    key: 'hospitality',
    name: 'Hospitality',
    description: 'Making people feel warmly welcomed, especially in your home or at church.',
    teamMatch: ['Coffee / Hospitality'],
  },
  {
    key: 'evangelism',
    name: 'Evangelism',
    description: "Naturally and effectively explaining the gospel to those who don't yet believe.",
    teamMatch: ['Welcome Team'],
  },
  {
    key: 'shepherding',
    name: 'Shepherding',
    description: 'Caring for the ongoing spiritual wellbeing of a person or group over time.',
    teamMatch: ['Kids Ministry'],
  },
  {
    key: 'wisdom',
    name: 'Wisdom',
    description: 'Applying biblical truth helpfully to real, complicated situations.',
  },
  {
    key: 'discernment',
    name: 'Discernment',
    description: 'Recognizing what is true, wise, or spiritually significant in a situation.',
  },
];

export interface Statement {
  gift: string;
  text: string;
}

export const STATEMENTS: Statement[] = [
  { gift: 'leadership', text: 'People often look to me to help decide what a group should do next.' },
  { gift: 'leadership', text: 'I feel energized organizing others toward a shared goal.' },
  { gift: 'leadership', text: "I'm comfortable taking responsibility when a group needs direction." },

  { gift: 'teaching', text: 'I enjoy explaining a Bible passage so it makes sense to someone else.' },
  { gift: 'teaching', text: 'People tell me I helped them understand something in Scripture more clearly.' },
  { gift: 'teaching', text: 'I like preparing material to teach, even for a small group.' },

  { gift: 'encouragement', text: 'I notice when someone needs a word of encouragement, and I offer it.' },
  { gift: 'encouragement', text: 'People say my words or notes have strengthened their faith.' },
  { gift: 'encouragement', text: "I'm drawn to comfort people who are discouraged." },

  { gift: 'giving', text: "I look for opportunities to give generously, beyond what's expected." },
  { gift: 'giving', text: 'I feel joy, not reluctance, when I give financially.' },
  { gift: 'giving', text: "I'd rather give more than keep more for myself." },

  { gift: 'mercy', text: "I feel others' pain deeply and want to help ease it." },
  { gift: 'mercy', text: "I'm drawn toward people who are suffering, sick, or struggling." },
  { gift: 'mercy', text: 'I find it natural to sit with someone in a hard season, without trying to fix it.' },

  { gift: 'serving', text: 'I notice practical jobs that need doing and just do them.' },
  { gift: 'serving', text: "I'd rather help behind the scenes than be noticed for it." },
  { gift: 'serving', text: 'I feel satisfied doing ordinary practical tasks for the church.' },

  { gift: 'administration', text: 'I enjoy organizing details so an event or project runs smoothly.' },
  { gift: 'administration', text: 'People ask me to help coordinate logistics.' },
  { gift: 'administration', text: 'I naturally think in terms of plans, schedules, and lists.' },

  { gift: 'hospitality', text: 'I love having people into my home, even at short notice.' },
  { gift: 'hospitality', text: 'I want visitors and newcomers to feel instantly welcome.' },
  { gift: 'hospitality', text: "I notice who's standing alone and go out of my way to include them." },

  { gift: 'evangelism', text: "I look for natural opportunities to talk about Jesus with people who don't believe." },
  { gift: 'evangelism', text: "I feel a particular burden for people who don't yet know Christ." },
  { gift: 'evangelism', text: 'Conversations about the gospel come naturally to me.' },

  { gift: 'shepherding', text: 'I like walking with the same person or group over a long period of time.' },
  { gift: 'shepherding', text: 'People come to me for ongoing spiritual guidance.' },
  { gift: 'shepherding', text: 'I feel responsible for the spiritual wellbeing of people close to me.' },

  { gift: 'wisdom', text: "People come to me when they're facing a complicated decision." },
  { gift: 'wisdom', text: 'I can usually see the wise, biblical way through a messy situation.' },
  { gift: 'wisdom', text: 'I enjoy helping someone think a hard problem through from Scripture.' },

  { gift: 'discernment', text: "I can often tell when something feels spiritually 'off,' even if I can't explain why at first." },
  { gift: 'discernment', text: 'People trust my read on whether a teaching or situation lines up with Scripture.' },
  { gift: 'discernment', text: 'I notice motives and character, not just words and actions.' },
];

export const RATING_LABELS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

export function topGiftsFromScores(scores: Record<string, number>, count = 3): string[] {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => key);
}

export function giftByKey(key: string): Gift | undefined {
  return GIFTS.find((g) => g.key === key);
}

export type SurveyMode = 'quick' | 'in-depth';

export interface SubmitGiftSurveyInput {
  name: string;
  contact?: string;
  mode: SurveyMode;
  topGifts: string[];
  scores?: Record<string, number>;
}

export async function submitGiftSurveyResponse(
  input: SubmitGiftSurveyInput
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: 'not-configured' };
  }
  // Guarded above: isSupabaseConfigured is only true when supabase is non-null.
  const { error } = await supabase!.from('gift_survey_responses').insert({
    respondent_name: input.name,
    respondent_contact: input.contact || null,
    mode: input.mode,
    top_gifts: input.topGifts,
    scores: input.scores ?? null,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
