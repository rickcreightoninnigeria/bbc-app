import { ScrollView, Text, View } from 'react-native';

export default function Safeguarding() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Safeguarding & Policies</Text>
      <Text className="mt-2 text-xs text-ink-faint dark:text-ink-faint-dark">
        Generic placeholder text below — not yet reviewed or approved by BBC leadership. Replace
        with BBC's actual policy before relying on this screen.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Our commitment
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          BBC is committed to the safety and wellbeing of every child, young person, and
          vulnerable adult in our care. We take a zero-tolerance approach to abuse and neglect
          of any kind, and we cooperate fully with local authorities on any safeguarding matter.
        </Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          If you have a concern
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          If a child or vulnerable adult is in immediate danger, contact the local authorities
          right away.
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          For any other safeguarding concern, speak to a church leader directly, or contact:
          [safeguarding contact].
        </Text>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Full policy
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          BBC's full safeguarding policy will be added here once finalized.
        </Text>
      </View>
    </ScrollView>
  );
}
