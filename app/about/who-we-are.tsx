import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

interface Leader {
  name: string;
  role: string;
}

const LEADERS: Leader[] = [
  { name: 'Gwali Melton', role: 'Lead Pastor' },
  { name: 'Jessy Agal', role: 'Assistant Pastor' },
  { name: 'Sam Eju', role: 'Administrator' },
];

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <View className="border-b border-rule py-4 dark:border-rule-dark">
      <Text className="text-base font-semibold text-ink dark:text-ink-dark">{leader.name}</Text>
      <Text className="mt-0.5 text-sm text-ink-soft dark:text-ink-soft-dark">{leader.role}</Text>
    </View>
  );
}

export default function WhoWeAre() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Who We Are' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Who We Are</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        BBC's leadership team.
      </Text>

      <View className="mt-6 border-t border-rule pt-2 dark:border-rule-dark">
        {LEADERS.map((leader) => (
          <LeaderCard key={leader.name} leader={leader} />
        ))}
      </View>
    </ScrollView>
  );
}
