import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function PrayHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Pray' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">Pray Always</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Prayer isn't reserved for those with a gift for it — it's how we depend on God together,
        as ordinarily as breathing.
      </Text>

      <Card
        href="/pray/sunday-meeting"
        title="Sunday Prayer Meeting"
        subtitle="4:30pm every Sunday, in person"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/pray/prayer-wall"
        title="Prayer Request Wall"
        subtitle="Public, group, or leaders-only requests"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/pray/testimonies"
        title="Answered-Prayer Testimonies"
        subtitle="Stories of prayers God has answered"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/prayer-triplets"
        title="Prayer Triplets Hub"
        subtitle="Small, honest, praying groups of 3-4"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/pray/missionary-calendar"
        title="Missionary & Planter Prayer Calendar"
        subtitle="Who to pray for, and when"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/pray/daily-verse"
        title="Daily Verse & Prayer Notification"
        subtitle="A short daily nudge to pray"
        accentClass="text-make dark:text-make-dark"
      />
    </ScrollView>
  );
}
