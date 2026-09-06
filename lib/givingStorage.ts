import AsyncStorage from '@react-native-async-storage/async-storage';

export type GivingFrequency = 'weekly' | 'monthly' | 'one-off';

export interface GivingPlan {
  amount: number;
  frequency: GivingFrequency;
  designation: string;
  remindersEnabled: boolean;
  reminderNotificationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GivingHistoryEntry {
  id: string;
  date: string;
  amount: number;
  designation: string;
}

const PLAN_KEY = '@bbc/giving-plan';
const HISTORY_KEY = '@bbc/giving-history';
const MAX_HISTORY_ENTRIES = 100;

export async function getGivingPlan(): Promise<GivingPlan | null> {
  const raw = await AsyncStorage.getItem(PLAN_KEY);
  return raw ? (JSON.parse(raw) as GivingPlan) : null;
}

export async function saveGivingPlan(plan: GivingPlan): Promise<void> {
  await AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export async function clearGivingPlan(): Promise<void> {
  await AsyncStorage.removeItem(PLAN_KEY);
}

export async function getGivingHistory(): Promise<GivingHistoryEntry[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? (JSON.parse(raw) as GivingHistoryEntry[]) : [];
}

export async function addGivingHistoryEntry(entry: GivingHistoryEntry): Promise<GivingHistoryEntry[]> {
  const existing = await getGivingHistory();
  const updated = [entry, ...existing].slice(0, MAX_HISTORY_ENTRIES);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}
