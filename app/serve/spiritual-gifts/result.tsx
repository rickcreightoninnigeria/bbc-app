import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { giftByKey } from '../../../lib/giftsSurvey';
import { isSupabaseConfigured } from '../../../lib/supabase';

export default function GiftSurveyResult() {
  const { gifts } = useLocalSearchParams<{ gifts: string }>();
  const topGifts = (gifts ?? '').split(',').filter(Boolean).map(giftByKey).filter(Boolean);

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Your Results' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">Your top gifts</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        {isSupabaseConfigured
          ? "Thanks — this has been sent to BBC's leadership, who may follow up."
          : "This wasn't saved (submissions aren't connected yet), but here's what it would have shown."}
      </Text>

      <View className="mt-6">
        {topGifts.map((gift) => (
          <View key={gift!.key} className="mb-4 border-b border-rule pb-4 dark:border-rule-dark">
            <Text className="text-lg font-semibold text-make dark:text-make-dark">{gift!.name}</Text>
            <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{gift!.description}</Text>
            {gift!.teamMatch && gift!.teamMatch.length > 0 ? (
              <Text className="mt-2 text-xs text-ink-faint dark:text-ink-faint-dark">
                Might fit: {gift!.teamMatch.join(', ')}
              </Text>
            ) : null}
          </View>
        ))}
      </View>

      <Link href="/serve/join-a-team" className="mt-2 text-sm underline text-link dark:text-link-dark">
        See BBC's serving teams
      </Link>
    </ScrollView>
  );
}
