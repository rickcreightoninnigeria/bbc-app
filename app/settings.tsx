import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useAuth } from '../lib/AuthContext';

export default function Settings() {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
        <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Profile & Settings</Text>
        <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
          Sign in to see your profile. Most of the app works fine without an account — this is
          only needed for things like the Member Directory.
        </Text>

        <Link href="/auth/sign-in" asChild>
          <Pressable className="mt-6 rounded bg-make px-4 py-3 active:opacity-60">
            <Text className="text-center text-sm font-semibold text-white">Sign In</Text>
          </Pressable>
        </Link>
        <Link href="/auth/sign-up" asChild>
          <Pressable className="mt-3 rounded border border-make px-4 py-3 active:opacity-60 dark:border-make-dark">
            <Text className="text-center text-sm font-semibold text-make dark:text-make-dark">
              Create Account
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Profile & Settings</Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Signed in as
        </Text>
        <Text className="mt-2 text-sm font-semibold text-ink dark:text-ink-dark">
          {profile?.full_name || user.email}
        </Text>
        {user.email ? (
          <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{user.email}</Text>
        ) : null}
      </View>

      <Pressable onPress={signOut} className="mt-6 self-start active:opacity-60">
        <Text className="text-sm text-ink-faint dark:text-ink-faint-dark">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
