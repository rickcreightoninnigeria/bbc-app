import { isSupabaseConfigured, supabase } from './supabase';

export interface PrayerRequest {
  id: string;
  created_at: string;
  author_name: string | null;
  request_text: string;
  pray_count: number;
}

export async function fetchPrayerRequests(): Promise<PrayerRequest[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase!
    .from('prayer_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as PrayerRequest[];
}

export async function postPrayerRequest(input: { authorName: string; requestText: string }): Promise<void> {
  if (!isSupabaseConfigured) throw new Error('not-configured');
  const { error } = await supabase!.from('prayer_requests').insert({
    author_name: input.authorName.trim() || null,
    request_text: input.requestText.trim(),
  });
  if (error) throw new Error(error.message);
}

export async function incrementPrayCount(id: string): Promise<number> {
  if (!isSupabaseConfigured) throw new Error('not-configured');
  const { data, error } = await supabase!.rpc('increment_pray_count', { request_id: id });
  if (error) throw new Error(error.message);
  return data as number;
}

export function formatRequestDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });
}
