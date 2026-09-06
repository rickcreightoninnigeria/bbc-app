import { ScrollView, Text } from 'react-native';

import { Card } from '../../../components/Card';
import { UTILITY_ITEMS } from '../../../constants/values';

export default function MoreIndex() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-3xl font-bold text-ink dark:text-ink-dark">Utility Menu</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        One canonical destination per feature, always one tap away — no matter which pillar you're in.
      </Text>
      <Card
        href="/settings"
        title="Profile & Settings"
        subtitle="Login, notifications — not a value, so not nav-visible elsewhere."
        accentClass="text-ink dark:text-ink-dark"
      />
      {UTILITY_ITEMS.map((item) => (
        <Card
          key={item.href}
          href={item.href}
          title={item.label}
          subtitle={item.description}
          accentClass="text-ink dark:text-ink-dark"
        />
      ))}
    </ScrollView>
  );
}
