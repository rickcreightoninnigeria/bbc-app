import { ScrollView, Text, View } from 'react-native';

export default function Give() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Give Joyfully & Sacrificially
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        No card payments — giving happens by bank transfer or in person, so this screen is
        informational and for personal planning rather than a checkout flow.
      </Text>

      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Bank transfer details
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Draft placeholder — real account details go here once confirmed.
        </Text>
      </View>

      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Giving teaching
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Draft placeholder — short teaching content on biblical giving.
        </Text>
      </View>

      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          My giving plan
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Draft placeholder — a personal record of what a member intends to give and when, with
          optional reminders. No payment is collected in-app.
        </Text>
      </View>
    </ScrollView>
  );
}
