import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { TextLink } from '../../components/TextLink';

export default function SundayPrayerMeeting() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Sunday Prayer Meeting' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Sunday Prayer Meeting
      </Text>
      <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
        Every Sunday at 4:30pm, we gather in person to pray together.
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        No sign-up, no preparation needed — just come.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Location
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">8 Wamba Road, Jos</Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <TextLink href="/prayer-triplets">Prayer Triplets hub</TextLink>
      </View>
    </ScrollView>
  );
}
