import { ScrollView, Text, View } from 'react-native';

import { Card } from './Card';
import { PILLAR_STYLES } from '../constants/theme';
import { findPillar, type PillarSlug } from '../constants/values';

export function PillarIndexScreen({ pillar }: { pillar: PillarSlug }) {
  const data = findPillar(pillar);
  const style = PILLAR_STYLES[pillar];
  if (!data) return null;

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className={`text-3xl font-bold ${style.text}`}>{data.label}</Text>
      <Text className="mt-1 text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        {data.gloss}
      </Text>
      <View className="mt-6">
        {data.values.map((value) => (
          <Card
            key={value.slug}
            href={value.externalHref ?? `/(tabs)/${pillar}/${value.slug}`}
            title={value.title}
            subtitle={`${value.features.length} features`}
            accentClass={style.text}
          />
        ))}
      </View>
    </ScrollView>
  );
}
