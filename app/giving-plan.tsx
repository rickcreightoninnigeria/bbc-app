import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, useColorScheme, View } from 'react-native';

import { remindersAvailable } from '../lib/givingReminders';
import { FREQUENCIES } from '../lib/givingFormat';
import type { GivingFrequency } from '../lib/givingStorage';
import { useGivingPlan } from '../lib/useGivingPlan';

export default function GivingPlan() {
  const router = useRouter();
  const { plan, savePlan } = useGivingPlan();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';

  const [amountText, setAmountText] = useState(plan ? String(plan.amount) : '');
  const [designation, setDesignation] = useState(plan?.designation ?? 'General');
  const [frequency, setFrequency] = useState<GivingFrequency>(plan?.frequency ?? 'monthly');
  const [remindersEnabled, setRemindersEnabled] = useState(plan?.remindersEnabled ?? true);

  const handleSave = async () => {
    const amount = Number(amountText);
    if (!amount || amount <= 0) return;
    await savePlan({ amount, frequency, designation: designation.trim() || 'General', remindersEnabled });
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">Amount (₦)</Text>
      <TextInput
        value={amountText}
        onChangeText={setAmountText}
        keyboardType="numeric"
        placeholder="e.g. 10000"
        placeholderTextColor={placeholderColor}
        autoFocus
        className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
      />

      <Text className="mt-4 text-xs text-ink-faint dark:text-ink-faint-dark">How often</Text>
      <View className="mt-1 flex-row gap-2">
        {FREQUENCIES.map((f) => (
          <Pressable
            key={f.value}
            onPress={() => setFrequency(f.value)}
            className={`rounded-full border px-3 py-1.5 ${
              frequency === f.value ? 'border-make bg-make' : 'border-rule dark:border-rule-dark'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                frequency === f.value ? 'text-white' : 'text-ink-soft dark:text-ink-soft-dark'
              }`}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="mt-4 text-xs text-ink-faint dark:text-ink-faint-dark">Designation (optional)</Text>
      <TextInput
        value={designation}
        onChangeText={setDesignation}
        placeholder="General"
        placeholderTextColor={placeholderColor}
        className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
      />

      {frequency !== 'one-off' ? (
        remindersAvailable() ? (
          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-sm text-ink dark:text-ink-dark">Remind me</Text>
            <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} />
          </View>
        ) : (
          <Text className="mt-4 text-xs text-ink-faint dark:text-ink-faint-dark">
            Reminders aren't available in Expo Go on Android — they'll work once this is a
            standalone build.
          </Text>
        )
      ) : null}

      <View className="mt-6 flex-row gap-3">
        <Pressable onPress={handleSave} className="rounded bg-make px-4 py-2 active:opacity-60">
          <Text className="text-sm font-semibold text-white">Save plan</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="px-4 py-2 active:opacity-60">
          <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
