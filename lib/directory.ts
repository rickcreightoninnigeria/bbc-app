import type { Profile } from './authTypes';
import { supabase } from './supabase';

export async function fetchDirectory(): Promise<Profile[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('profiles').select('*').order('full_name');
  if (error) throw new Error(error.message);
  return data as Profile[];
}
