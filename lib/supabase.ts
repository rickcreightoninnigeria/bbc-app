import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env vars are missing — copy .env.example to .env and fill in your project URL and anon key.'
  );
}

/**
 * createClient() throws immediately if given an empty URL, so it's only
 * constructed when real credentials are present. Every call site must check
 * isSupabaseConfigured first — this is null otherwise.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        // PKCE (not the default 'implicit') is required for Google/Apple
        // sign-in, which exchange a `code` param for a session rather than
        // getting tokens directly in the redirect URL.
        flowType: 'pkce',
      },
    })
  : null;
