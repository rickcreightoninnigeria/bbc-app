import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function ScriptureHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Rooted in Scripture' }} />
      <Text className="text-2xl font-bold text-deep dark:text-deep-dark">Rooted in Scripture</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Everything here starts with the Bible — not our opinions about it.
      </Text>

      <Card
        href="/scripture/sermons"
        title="Sermons"
        subtitle="Watch or listen on YouTube and Spotify"
        accentClass="text-deep dark:text-deep-dark"
      />
      <Card
        href="/scripture/reading-plan"
        title="Bible Reading Plan"
        subtitle="A plan to read through Scripture together"
        accentClass="text-deep dark:text-deep-dark"
      />
      <Card
        href="/scripture/verse-of-the-day"
        title="Verse of the Day"
        subtitle="A short daily verse"
        accentClass="text-deep dark:text-deep-dark"
      />
      <Card
        href="/scripture/statement-of-faith"
        title="Statement of Faith"
        subtitle="What BBC believes, and why"
        accentClass="text-deep dark:text-deep-dark"
      />
    </ScrollView>
  );
}
