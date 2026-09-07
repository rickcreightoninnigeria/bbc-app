import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { TextLink } from '../../components/TextLink';

interface ValueEntry {
  slogan: string;
  explanation: string;
  href: string;
}

interface Group {
  word: string;
  values: ValueEntry[];
}

const GROUPS: Group[] = [
  {
    word: 'Make',
    values: [
      {
        slogan: 'Pray Always',
        explanation:
          "We depend on God through prayer as naturally as breathing — not just in a crisis, but as an ordinary rhythm of life together.",
        href: '/pray',
      },
      {
        slogan: 'Serve Joyfully & Sacrificially',
        explanation:
          'Every member has a part to play in serving the church and each other, gladly and at real cost to ourselves.',
        href: '/serve',
      },
    ],
  },
  {
    word: 'Many',
    values: [
      {
        slogan: 'Make Christ Known',
        explanation:
          "We want the people around us to hear and see the good news of Jesus — that's the whole reason a church exists.",
        href: '/(tabs)/many/reach',
      },
      {
        slogan: 'Plant More Churches',
        explanation: "Our vision doesn't stop at BBC — we want to see healthy new churches started elsewhere too.",
        href: '/(tabs)/many/plant',
      },
    ],
  },
  {
    word: 'Deep',
    values: [
      {
        slogan: 'Rooted in Scripture',
        explanation:
          'Everything we believe and do is anchored in the Bible, not in our own opinions or the trends around us.',
        href: '/scripture',
      },
      {
        slogan: 'Grow in Christ',
        explanation:
          'Following Jesus is a lifelong process of change, not a one-time decision — we want to keep growing, together.',
        href: '/(tabs)/deep/grow',
      },
      {
        slogan: 'Build the Next Generation',
        explanation:
          "Children and young people aren't the church of tomorrow — they're part of the church now, and we invest in them accordingly.",
        href: '/(tabs)/deep/next-gen',
      },
    ],
  },
  {
    word: 'Disciples',
    values: [
      {
        slogan: 'Be a Big, Warm Welcoming Family',
        explanation: "As BBC grows numerically, we work hard to make sure it still feels close and known, not anonymous.",
        href: '/family',
      },
      {
        slogan: 'Magnify God Together',
        explanation: 'Everything else exists to point back to this: gathering to worship God, together, as one church.',
        href: '/magnify',
      },
    ],
  },
];

export default function CoreValues() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Core Values' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Core Values</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        BBC's nine core values, grouped under the four words of "Make Many Deep Disciples" —
        which is also how this app itself is organized.
      </Text>

      {GROUPS.map((group) => (
        <View key={group.word} className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
          <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
            {group.word}
          </Text>
          {group.values.map((value) => (
            <View key={value.slogan} className="mt-3">
              <Text className="text-sm font-semibold text-ink dark:text-ink-dark">{value.slogan}</Text>
              <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{value.explanation}</Text>
              <TextLink href={value.href} className="mt-1" underline={false}>
                Go to {value.slogan}
              </TextLink>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
