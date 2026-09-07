import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ExternalLink } from '../../components/ExternalLink';

export default function ServiceTimes() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Service Times' }} />
      <Text className="text-2xl font-bold text-disciples dark:text-disciples-dark">
        Service Times
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Sunday Service
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Every Sunday, 10:00am – 11:30am.
        </Text>
        <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">8 Wamba Road, Jos</Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Saturday Bible Study
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Every Saturday, 8:00am – 10:30am.
        </Text>
        <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">8 Wamba Road, Jos</Text>
        <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
          Exception: on the last Saturday of the month, it runs 10:30am – 12:00pm instead,
          because of the local government's monthly Sanitation exercise and travel
          restrictions.
        </Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          How to Find Us
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Both the Sunday Service and Saturday Bible Study are at the same address: 8 Wamba
          Road, Jos.
        </Text>
        <ExternalLink url="https://maps.app.goo.gl/6mkg6J6mopxa6vpW6" className="mt-2">
          Open in Google Maps
        </ExternalLink>
      </View>
    </ScrollView>
  );
}
