import { ScrollView, Text, View } from 'react-native';

export default function PrayerTriplets() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">Prayer Triplets</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        A small, honest group — not a Community Group, and not a Bible study. Just a few people
        who pray for each other and know what's really going on in each other's lives.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          What they look like
        </Text>
        <View className="mt-2 gap-2">
          <Text className="text-sm text-ink dark:text-ink-dark">
            Same sex, normally three or four people (though two, five, or six can work too).
          </Text>
          <Text className="text-sm text-ink dark:text-ink-dark">
            Built on friendship and trust — the point is to be open, honest, vulnerable, and
            accountable with each other.
          </Text>
          <Text className="text-sm text-ink dark:text-ink-dark">
            Meets anywhere from weekly to monthly, whatever the group can sustain.
          </Text>
        </View>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          They come and go — that's normal
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Some triplets last for years. Others run for a few months and quietly stop — that's
          fine, not a failure. The easiest way to start one is simple: one person gathers two or
          three others.
        </Text>
      </View>
    </ScrollView>
  );
}
