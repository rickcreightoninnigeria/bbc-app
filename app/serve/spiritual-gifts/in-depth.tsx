import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { RATING_LABELS, STATEMENTS, submitGiftSurveyResponse, topGiftsFromScores } from '../../../lib/giftsSurvey';

export default function InDepthSurvey() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const answeredCount = Object.keys(ratings).length;
  const allAnswered = answeredCount === STATEMENTS.length;

  const scores = useMemo(() => {
    const totals: Record<string, number> = {};
    STATEMENTS.forEach((statement, index) => {
      const rating = ratings[index] ?? 0;
      totals[statement.gift] = (totals[statement.gift] ?? 0) + rating;
    });
    return totals;
  }, [ratings]);

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    const topGifts = topGiftsFromScores(scores);
    await submitGiftSurveyResponse({ name, mode: 'in-depth', topGifts, scores });
    router.replace({
      pathname: '/serve/spiritual-gifts/result',
      params: { gifts: topGifts.join(',') },
    });
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'In-Depth Survey' }} />
      <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">
        Rate how true each statement is of you, honestly rather than aspirationally.
        ({answeredCount}/{STATEMENTS.length} answered)
      </Text>

      {STATEMENTS.map((statement, index) => (
        <View key={index} className="mt-5 border-b border-rule pb-4 dark:border-rule-dark">
          <Text className="text-sm text-ink dark:text-ink-dark">{statement.text}</Text>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {RATING_LABELS.map((label, value) => {
              const isSelected = ratings[index] === value;
              return (
                <Pressable
                  key={label}
                  onPress={() => setRatings((prev) => ({ ...prev, [index]: value }))}
                  className={`rounded-full border px-2.5 py-1 ${
                    isSelected ? 'border-make bg-make' : 'border-rule dark:border-rule-dark'
                  }`}
                >
                  <Text className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-ink-soft dark:text-ink-soft-dark'}`}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}

      <Pressable
        onPress={handleSubmit}
        disabled={!allAnswered || submitting}
        className={`mt-6 self-start rounded px-4 py-2 active:opacity-60 ${
          allAnswered ? 'bg-make' : 'bg-rule dark:bg-rule-dark'
        }`}
      >
        <Text className={`text-sm font-semibold ${allAnswered ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}>
          {submitting ? 'Submitting…' : 'See my results'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
