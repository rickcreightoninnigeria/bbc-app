import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { FeatureList } from './FeatureList';
import { TextLink } from './TextLink';
import { PILLAR_STYLES } from '../constants/theme';
import { findPillar, findValue, type PillarSlug } from '../constants/values';

export function ValueDetailScreen({ pillar }: { pillar: PillarSlug }) {
  const { value: valueSlug } = useLocalSearchParams<{ value: string }>();
  const pillarData = findPillar(pillar);
  const value = findValue(pillarData, valueSlug);
  const style = PILLAR_STYLES[pillar];

  if (!value) {
    return (
      <View className="flex-1 items-center justify-center bg-bg dark:bg-bg-dark">
        <Text className="text-ink dark:text-ink-dark">Not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: value.title, headerShown: true }} />
      <Text className={`text-2xl font-bold ${style.text}`}>{value.title}</Text>
      <FeatureList features={value.features} accentClass={style.text} />

      {value.crossLinks && value.crossLinks.length > 0 ? (
        <View className="mt-8 border-t border-rule dark:border-rule-dark pt-4">
          <Text className="mb-2 text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
            Also see
          </Text>
          {value.crossLinks.map((link) => (
            <TextLink key={link.href} href={link.href} className="mb-2">
              {link.label}
            </TextLink>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}
