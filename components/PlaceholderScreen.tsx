import { ScrollView, Text } from 'react-native';

export function PlaceholderScreen({ title, note }: { title: string; note: string }) {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">{title}</Text>
      <Text className="mt-3 text-sm text-ink-soft dark:text-ink-soft-dark">{note}</Text>
    </ScrollView>
  );
}
