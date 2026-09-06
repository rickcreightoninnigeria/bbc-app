import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function ServeHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Serve' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Serve Joyfully & Sacrificially
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Serving isn't reserved for the especially gifted or the especially free — it's an
        ordinary part of belonging to BBC.
      </Text>

      <Card
        href="/serve/join-a-team"
        title="Join a Team"
        subtitle="Welcome, Tech/Sound, Kids Ministry, Coffee/Hospitality, Set Up/Pack Down"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/serve/spiritual-gifts"
        title="Spiritual Gifts Survey"
        subtitle="Find where your gifts fit our serving needs"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/serve/meal-train"
        title="Meal Train & Practical Needs"
        subtitle="See and meet practical needs within the church"
        accentClass="text-make dark:text-make-dark"
      />
      <Card
        href="/serve/mission-trips"
        title="Mission Trip Sign-ups"
        subtitle="Upcoming trips and how to join one"
        accentClass="text-make dark:text-make-dark"
      />
    </ScrollView>
  );
}
