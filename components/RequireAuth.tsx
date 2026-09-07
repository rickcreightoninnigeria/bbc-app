import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useAuth } from '../lib/AuthContext';

/**
 * Wrap a screen's content with this to require sign-in — most of the app
 * stays reachable with no login at all, this is only for the specific
 * screens/actions that genuinely need an identity (e.g. the Directory).
 */
export function RequireAuth({ children, reason }: { children: ReactNode; reason: string }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-bg px-8 dark:bg-bg-dark">
        <Text className="text-center text-base font-semibold text-ink dark:text-ink-dark">
          Sign in to continue
        </Text>
        <Text className="mt-2 text-center text-sm text-ink-soft dark:text-ink-soft-dark">
          {reason}
        </Text>
        <Link href="/auth/sign-in" asChild>
          <Pressable className="mt-4 rounded bg-make px-4 py-2 active:opacity-60">
            <Text className="text-sm font-semibold text-white">Sign In</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return <>{children}</>;
}
