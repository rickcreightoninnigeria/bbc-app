import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthSession, AuthUser } from '@supabase/supabase-js';

import type { Profile } from './authTypes';
import { isSupabaseConfigured, supabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

interface AuthResult {
  error?: string;
}

interface AuthContextValue {
  session: AuthSession | null;
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signUpWithPassword: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return (data as Profile) ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    fetchProfile(session.user.id).then(setProfile);
  }, [session?.user?.id]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,

      async signUpWithPassword(email, password, fullName) {
        if (!isSupabaseConfigured || !supabase) return { error: 'not-configured' };
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        return error ? { error: error.message } : {};
      },

      async signInWithPassword(email, password) {
        if (!isSupabaseConfigured || !supabase) return { error: 'not-configured' };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : {};
      },

      async signInWithGoogle() {
        if (!isSupabaseConfigured || !supabase) return { error: 'not-configured' };
        const redirectTo = Linking.createURL('/');
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo, skipBrowserRedirect: true },
        });
        if (error) return { error: error.message };
        if (!data.url) return { error: 'No auth URL returned' };

        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
        if (result.type !== 'success' || !result.url) {
          return result.type === 'cancel' ? {} : { error: 'Sign-in was not completed' };
        }

        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        if (!code) return { error: 'No auth code returned' };

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        return exchangeError ? { error: exchangeError.message } : {};
      },

      async resetPassword(email) {
        if (!isSupabaseConfigured || !supabase) return { error: 'not-configured' };
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        return error ? { error: error.message } : {};
      },

      async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [session, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
