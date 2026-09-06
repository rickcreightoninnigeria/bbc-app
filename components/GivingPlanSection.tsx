import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { TextLink } from './TextLink';
import { daysSince, formatDate, formatNaira } from '../lib/givingFormat';
import { useGivingPlan } from '../lib/useGivingPlan';

export function GivingPlanSection() {
  const { plan, history, loading, removePlan, markGivenToday } = useGivingPlan();

  if (loading) return null;

  if (!plan) {
    return (
      <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          My giving plan
        </Text>
        <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
          A private plan just for you — what you intend to give and when, with an optional
          reminder. Nothing here is shared with anyone at BBC, and no payment is collected.
        </Text>
        <Link href="/giving-plan" asChild>
          <Pressable className="mt-3 self-start rounded border border-make px-3 py-2 dark:border-make-dark active:opacity-60">
            <Text className="text-sm font-semibold text-make dark:text-make-dark">Set up a plan</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const stale = daysSince(plan.updatedAt) > 365;

  return (
    <View className="mt-6 border-t border-rule dark:border-rule-dark pt-4">
      <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
        My giving plan
      </Text>
      <Text className="mt-2 text-sm text-ink dark:text-ink-dark">
        {formatNaira(plan.amount)} {plan.frequency === 'one-off' ? 'as a one-off gift' : plan.frequency}
        {plan.designation && plan.designation !== 'General' ? ` — ${plan.designation}` : ''}
      </Text>
      {plan.remindersEnabled ? (
        <Text className="mt-1 text-xs text-ink-faint dark:text-ink-faint-dark">
          Reminder{plan.frequency === 'weekly' ? ' on Sundays' : ' on the 1st of each month'}
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
        <TextLink href="/giving-plan" className="px-4 py-2" underline={false}>
          Edit plan
        </TextLink>
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
