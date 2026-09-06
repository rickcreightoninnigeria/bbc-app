import { useState } from 'react';
import { Pressable, Switch, Text, TextInput, useColorScheme, View } from 'react-native';

import type { GivingFrequency } from '../lib/givingStorage';
import { useGivingPlan } from '../lib/useGivingPlan';

const FREQUENCIES: { value: GivingFrequency; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'one-off', label: 'One-off' },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysSince(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
}

export function GivingPlanSection() {
  const { plan, history, loading, savePlan, removePlan, markGivenToday } = useGivingPlan();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';

  const [editing, setEditing] = useState(false);
  const [amountText, setAmountText] = useState('');
  const [designation, setDesignation] = useState('General');
  const [frequency, setFrequency] = useState<GivingFrequency>('monthly');
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const startEditing = () => {
    setAmountText(plan ? String(plan.amount) : '');
    setDesignation(plan?.designation ?? 'General');
    setFrequency(plan?.frequency ?? 'monthly');
    setRemindersEnabled(plan?.remindersEnabled ?? true);
    setEditing(true);
  };

  const handleSave = async () => {
    const amount = Number(amountText);
    if (!amount || amount <= 0) return;
    await savePlan({ amount, frequency, designation: designation.trim() || 'General', remindersEnabled });
    setEditing(false);
  };

  if (loading) return null;

  if (!plan && !editing) {
    return (
      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          My giving plan
        </Text>
        <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
          A private plan just for you — what you intend to give and when, with an optional
          reminder. Nothing here is shared with anyone at BBC, and no payment is collected.
        </Text>
        <Pressable
          onPress={startEditing}
          className="mt-3 self-start rounded border border-make px-3 py-2 dark:border-make-dark active:opacity-60"
        >
          <Text className="text-sm font-semibold text-make dark:text-make-dark">Set up a plan</Text>
        </Pressable>
      </View>
    );
  }

  if (editing) {
    return (
      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          My giving plan
        </Text>

        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">Amount (₦)</Text>
        <TextInput
          value={amountText}
          onChangeText={setAmountText}
          keyboardType="numeric"
          placeholder="e.g. 10000"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />

        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">How often</Text>
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

        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">
          Designation (optional)
        </Text>
        <TextInput
          value={designation}
          onChangeText={setDesignation}
          placeholder="General"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />

        {frequency !== 'one-off' ? (
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-sm text-ink dark:text-ink-dark">Remind me</Text>
            <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} />
          </View>
        ) : null}

        <View className="mt-4 flex-row gap-3">
          <Pressable onPress={handleSave} className="rounded bg-make px-4 py-2 active:opacity-60">
            <Text className="text-sm font-semibold text-white">Save plan</Text>
          </Pressable>
          <Pressable onPress={() => setEditing(false)} className="px-4 py-2 active:opacity-60">
            <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">Cancel</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const stale = daysSince(plan!.updatedAt) > 365;

  return (
    <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
      <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        My giving plan
      </Text>
      <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
        {formatNaira(plan!.amount)} {plan!.frequency === 'one-off' ? 'as a one-off gift' : plan!.frequency}
        {plan!.designation && plan!.designation !== 'General' ? ` — ${plan!.designation}` : ''}
      </Text>
      {plan!.remindersEnabled ? (
        <Text className="mt-1 text-xs text-ink-faint dark:text-ink-faint-dark">
          Reminder{plan!.frequency === 'weekly' ? ' on Sundays' : ' on the 1st of each month'}
        </Text>
      ) : null}

      {stale ? (
        <Text className="mt-2 text-xs text-ink-faint dark:text-ink-faint-dark">
          It's been over a year since you last reviewed this — worth a quick check?
        </Text>
      ) : null}

      <View className="mt-3 flex-row flex-wrap gap-3">
        <Pressable onPress={markGivenToday} className="rounded bg-make px-4 py-2 active:opacity-60">
          <Text className="text-sm font-semibold text-white">Mark as given today</Text>
        </Pressable>
        <Pressable onPress={startEditing} className="px-4 py-2 active:opacity-60">
          <Text className="text-sm text-link dark:text-link-dark">Edit plan</Text>
        </Pressable>
      </View>

      {history.length > 0 ? (
        <View className="mt-4">
          <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
            Recent
          </Text>
          {history.slice(0, 3).map((entry) => (
            <Text key={entry.id} className="mt-1 text-xs text-ink-soft dark:text-ink-soft-dark">
              {formatDate(entry.date)} — {formatNaira(entry.amount)}
            </Text>
          ))}
        </View>
      ) : null}

      <Pressable onPress={removePlan} className="mt-4 self-start active:opacity-60">
        <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">Clear plan</Text>
      </Pressable>
    </View>
  );
}
