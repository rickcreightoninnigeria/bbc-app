import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function AboutHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'About Us' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">About BBC</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Who we are, what we believe, and who leads us.
      </Text>

      <Card
        href="/about/what-we-believe"
        title="What We Believe"
        subtitle="A short summary of BBC's core beliefs"
        accentClass="text-ink dark:text-ink-dark"
      />
      <Card
        href="/about/core-values"
        title="Core Values"
        subtitle="The slogans behind Make Many Deep Disciples"
        accentClass="text-ink dark:text-ink-dark"
      />
      <Card
        href="/about/who-we-are"
        title="Who We Are"
        subtitle="BBC's leadership team"
        accentClass="text-ink dark:text-ink-dark"
      />
      <Card
        href="/about/privacy-policy"
        title="Privacy Policy"
        subtitle="What the app collects, and who can see it"
        accentClass="text-ink dark:text-ink-dark"
      />
    </ScrollView>
  );
}
