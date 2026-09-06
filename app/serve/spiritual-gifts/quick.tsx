import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { GIFTS, submitGiftSurveyResponse } from '../../../lib/giftsSurvey';

const MAX_SELECTIONS = 3;

export default function QuickSurvey() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (key: string) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, key];
    });
  };

  const handleSubmit = async () => {
    if (selected.length === 0 || submitting) return;
    setSubmitting(true);
    await submitGiftSurveyResponse({ name, mode: 'quick', topGifts: selected });
    router.replace({
      pathname: '/serve/spiritual-gifts/result',
      params: { gifts: selected.join(',') },
    });
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Quick Survey' }} />
      <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">
        Pick up to {MAX_SELECTIONS} gifts that resonate most with you ({selected.length}/{MAX_SELECTIONS} selected).
      </Text>

      <View className="mt-4">
        {GIFTS.map((gift) => {
          const isSelected = selected.includes(gift.key);
          return (
            <Pressable
              key={gift.key}
              onPress={() => toggle(gift.key)}
              className={`mb-3 rounded border px-3 py-3 active:opacity-60 ${
                isSelected ? 'border-make bg-utility dark:border-make-dark dark:bg-utility-dark' : 'border-rule dark:border-rule-dark'
              }`}
            >
              <Text className={`text-sm font-semibold ${isSelected ? 'text-make dark:text-make-dark' : 'text-ink dark:text-ink-dark'}`}>
                {gift.name}
              </Text>
              <Text className="mt-1 text-xs text-ink-soft dark:text-ink-soft-dark">{gift.description}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={selected.length === 0 || submitting}
        className={`mt-2 self-start rounded px-4 py-2 active:opacity-60 ${
          selected.length > 0 ? 'bg-make' : 'bg-rule dark:bg-rule-dark'
        }`}
      >
        <Text className={`text-sm font-semibold ${selected.length > 0 ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}>
          {submitting ? 'Submitting…' : 'See my results'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
