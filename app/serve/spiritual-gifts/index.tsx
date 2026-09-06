import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

import { isSupabaseConfigured } from '../../../lib/supabase';

export default function SpiritualGiftsIntro() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';
  const [name, setName] = useState('');

  const canStart = name.trim().length > 0;

  const goTo = (mode: 'quick' | 'in-depth') => {
    if (!canStart) return;
    router.push({ pathname: `/serve/spiritual-gifts/${mode}`, params: { name: name.trim() } });
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Spiritual Gifts Survey' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">
        Spiritual Gifts Survey
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        God has given every believer gifts to build up the church (1 Corinthians 12:7). This is a
        simple way to notice yours, and to help a team leader know where you might fit.
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Your results are sent to BBC's leadership so they can follow up — not visible to other
        members.
      </Text>

      {!isSupabaseConfigured ? (
        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">
          Note: submissions aren't connected yet — you can still try the survey, but results
          won't be saved until this is set up.
        </Text>
      ) : null}

      <Text className="mt-6 text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        Your name
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Ada Okafor"
        placeholderTextColor={placeholderColor}
        className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
      />

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-sm font-semibold text-ink dark:text-ink-dark">Quick Survey</Text>
        <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          Browse the gift list and pick the ones that resonate most. Takes about 2 minutes.
        </Text>
        <Pressable
          onPress={() => goTo('quick')}
          disabled={!canStart}
          className={`mt-3 self-start rounded px-4 py-2 active:opacity-60 ${canStart ? 'bg-make' : 'bg-rule dark:bg-rule-dark'}`}
        >
          <Text className={`text-sm font-semibold ${canStart ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}>
            Start Quick Survey
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-sm font-semibold text-ink dark:text-ink-dark">In-Depth Survey</Text>
        <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">
          36 short statements, rated honestly. Takes about 10 minutes, and gives a more
          considered result.
        </Text>
        <Pressable
          onPress={() => goTo('in-depth')}
          disabled={!canStart}
          className={`mt-3 self-start rounded border px-4 py-2 active:opacity-60 ${canStart ? 'border-make dark:border-make-dark' : 'border-rule dark:border-rule-dark'}`}
        >
          <Text className={`text-sm font-semibold ${canStart ? 'text-make dark:text-make-dark' : 'text-ink-faint dark:text-ink-faint-dark'}`}>
            Start In-Depth Survey
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
