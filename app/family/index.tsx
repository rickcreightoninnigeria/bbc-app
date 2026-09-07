import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function FamilyHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Family' }} />
      <Text className="text-2xl font-bold text-disciples dark:text-disciples-dark">
        Be a Big, Warm Welcoming Family
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        As BBC grows, staying warm and welcoming doesn't happen by accident — it takes real
        structure. Here's how we do that.
      </Text>

      <Card
        href="/family/community-groups"
        title="Community Groups"
        subtitle="Neighbourhood-based groups, 10-30 people"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/prayer-triplets"
        title="Prayer Triplets Hub"
        subtitle="Small, honest, praying groups of 3-4"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/directory"
        title="Member Directory"
        subtitle="Find and connect with people at BBC"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/family/welcome"
        title="Newcomer & Visitor Welcome"
        subtitle="What happens when someone new shows up"
        accentClass="text-disciples dark:text-disciples-dark"
      />
    </ScrollView>
  );
}
