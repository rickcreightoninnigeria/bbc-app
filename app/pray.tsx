import { ScrollView, Text, View } from 'react-native';

import { TextLink } from '../components/TextLink';

export default function Pray() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">Pray Always</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Prayer isn't reserved for those with a gift for it — it's how we depend on God together,
        as ordinarily as breathing.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Sunday Prayer Meeting
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Every Sunday at 4:30pm, we gather in person to pray together.
        </Text>
        <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
          No sign-up, no preparation needed — just come. Location: [prayer meeting location].
        </Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <TextLink href="/prayer-triplets">Prayer Triplets hub</TextLink>
      </View>
    </ScrollView>
  );
}
