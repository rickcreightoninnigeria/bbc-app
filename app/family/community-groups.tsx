import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
      <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        {heading}
      </Text>
      <View className="mt-2 gap-2">{children}</View>
    </View>
  );
}

function Role({ name, description }: { name: string; description: string }) {
  return (
    <View className="mb-2">
      <Text className="text-sm font-semibold text-ink dark:text-ink-dark">{name}</Text>
      <Text className="mt-0.5 text-sm text-ink-soft dark:text-ink-soft-dark">{description}</Text>
    </View>
  );
}

export default function CommunityGroups() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Community Groups' }} />
      <Text className="text-2xl font-bold text-disciples dark:text-disciples-dark">
        Community Groups
      </Text>
      <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
        Some people from church who live in your neighbourhood, so you can get to know one
        another, love one another, and serve one another.
      </Text>

      <Section heading="The basics">
        <Text className="text-sm text-ink dark:text-ink-dark">
          10 to 30 people, including children — adults and children, married and single, from
          different backgrounds and life stages.
        </Text>
        <Text className="text-sm text-ink dark:text-ink-dark">
          Members live close enough to each other to be neighbourly.
        </Text>
      </Section>

      <Section heading="What's expected">
        <Text className="text-sm text-ink dark:text-ink-dark">
          Members commit to love one another, and the group meets at least once a month for a
          meal together — you're encouraged to see each other more often than that too.
        </Text>
        <Text className="text-sm text-ink dark:text-ink-dark">
          The group looks out for needs among its members and tries to help meet them.
        </Text>
        <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">
          There's no expectation of formal Bible teaching or organized outreach — that's not the
          point of a Community Group, though either might happen sometimes.
        </Text>
      </Section>

      <Section heading="Roles in a group">
        <Role
          name="Host"
          description="Has a home suitable for the group and is glad to offer it — not responsible for cooking for everyone."
        />
        <Role
          name="Coordinator"
          description="Keeps everyone informed of dates, organizes who brings what for meals, and makes space for a simple time of prayer together."
        />
        <Role
          name="Pastoral Contact"
          description="The group's first line of pastoral support — helps with ordinary struggles directly, and refers anything bigger to BBC's central pastoral team."
        />
      </Section>

      <Section heading="Joining a group">
        <Text className="text-sm text-ink dark:text-ink-dark">
          You're not limited to only knowing people in your own Community Group — but this is the
          main way BBC helps everyone actually get known, as the church grows.
        </Text>
        <Text className="mt-1 text-sm text-ink dark:text-ink-dark">
          To join a group, contact [community groups contact].
        </Text>
      </Section>
    </ScrollView>
  );
}
