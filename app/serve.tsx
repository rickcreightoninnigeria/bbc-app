import { ScrollView, Text, View } from 'react-native';

interface Team {
  name: string;
  description: string;
}

const TEAMS: Team[] = [
  {
    name: 'Welcome Team',
    description: 'Greet people at the door, help newcomers find a seat, and hand out bulletins.',
  },
  {
    name: 'Tech / Sound',
    description: 'Run the sound desk and mic checks, and handle any recording or livestream.',
  },
  {
    name: 'Kids Ministry',
    description: 'Care for and teach the children during the service, so parents can worship.',
  },
  {
    name: 'Coffee / Hospitality',
    description: 'Prepare refreshments and help the building feel warm before and after the service.',
  },
  {
    name: 'Set Up / Pack Down',
    description: 'Arrive early to set out chairs and equipment, and stay after to pack it all away.',
  },
];

function TeamCard({ team }: { team: Team }) {
  return (
    <View className="border-b border-rule py-3 dark:border-rule-dark">
      <Text className="text-sm font-semibold text-make dark:text-make-dark">{team.name}</Text>
      <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{team.description}</Text>
    </View>
  );
}

export default function Serve() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Serve Joyfully & Sacrificially
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Serving isn't reserved for the especially gifted or the especially free — it's an
        ordinary part of belonging to BBC. Here are the teams that keep our gatherings running.
      </Text>

      <View className="mt-6 border-t border-rule pt-2 dark:border-rule-dark">
        {TEAMS.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Interested in joining a team?
        </Text>
        <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
          Draft placeholder — there's no sign-up process yet. This needs a real contact route
          (an email, a WhatsApp number, or a named person per team) before this section is done.
        </Text>
      </View>
    </ScrollView>
  );
}
