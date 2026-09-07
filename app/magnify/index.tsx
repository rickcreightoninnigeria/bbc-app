import { Stack } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { Card } from '../../components/Card';

export default function MagnifyHub() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Magnify God Together' }} />
      <Text className="text-2xl font-bold text-disciples dark:text-disciples-dark">
        Magnify God Together
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        We're better together than alone — gathering as a whole church is one of the main ways we
        do that.
      </Text>

      <Card
        href="/magnify/service-times"
        title="Service Times"
        subtitle="Sunday Service & Saturday Bible Study"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/calendar"
        title="Calendar"
        subtitle="All-church events, in one place"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/magnify/worship"
        title="Worship Setlists & Song Requests"
        subtitle="What we're singing, and requests for what's next"
        accentClass="text-disciples dark:text-disciples-dark"
      />
      <Card
        href="/magnify/gatherings"
        title="All-Church Gatherings & Baptisms"
        subtitle="Special gatherings and baptism celebrations"
        accentClass="text-disciples dark:text-disciples-dark"
      />
    </ScrollView>
  );
}
