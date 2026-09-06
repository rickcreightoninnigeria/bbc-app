import * as Notifications from 'expo-notifications';

import type { GivingFrequency } from './givingStorage';

const REMINDER_HOUR = 9;
const REMINDER_MINUTE = 0;
const REMINDER_WEEKDAY = 1; // 1 = Sunday
const REMINDER_DAY_OF_MONTH = 1;

export async function requestNotificationPermission(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

/**
 * Cancels any previous giving reminder, then schedules a new one for
 * weekly/monthly plans. One-off plans get no recurring reminder — there's
 * nothing to repeat.
 */
export async function scheduleGivingReminder(
  frequency: GivingFrequency,
  previousId?: string
): Promise<string | undefined> {
  await cancelGivingReminder(previousId);
  if (frequency === 'one-off') return undefined;

  const content = {
    title: 'Giving reminder',
    body:
      frequency === 'weekly'
        ? "It's time for this week's giving — no rush, just a nudge."
        : "It's time for this month's giving — no rush, just a nudge.",
  };

  const trigger =
    frequency === 'weekly'
      ? {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY as const,
          weekday: REMINDER_WEEKDAY,
          hour: REMINDER_HOUR,
          minute: REMINDER_MINUTE,
        }
      : {
          type: Notifications.SchedulableTriggerInputTypes.MONTHLY as const,
          day: REMINDER_DAY_OF_MONTH,
          hour: REMINDER_HOUR,
          minute: REMINDER_MINUTE,
        };

  return Notifications.scheduleNotificationAsync({ content, trigger });
}

export async function cancelGivingReminder(id?: string): Promise<void> {
  if (!id) return;
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
}
