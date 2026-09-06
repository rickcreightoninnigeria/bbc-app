import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';

import type { GivingFrequency } from './givingStorage';

const REMINDER_HOUR = 9;
const REMINDER_MINUTE = 0;
const REMINDER_WEEKDAY = 1; // 1 = Sunday
const REMINDER_DAY_OF_MONTH = 1;

/**
 * Merely importing expo-notifications throws on Android inside Expo Go
 * (push notification support was dropped from Expo Go on Android in SDK 53) —
 * even though we only ever use local, non-push scheduling here. So this
 * module never statically imports it; it's lazily required only when we
 * know it's safe to load.
 */
function remindersUnsupported() {
  return Platform.OS === 'android' && isRunningInExpoGo();
}

/** Whether reminders can work at all in the current environment — used by the UI. */
export function remindersAvailable() {
  return !remindersUnsupported();
}

async function loadNotifications() {
  return (await import('expo-notifications')) as typeof import('expo-notifications');
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (remindersUnsupported()) return false;
  const Notifications = await loadNotifications();
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
  if (remindersUnsupported()) return undefined;

  await cancelGivingReminder(previousId);
  if (frequency === 'one-off') return undefined;

  const Notifications = await loadNotifications();

  const content = {
    title: 'Giving reminder',
    body:
      frequency === 'weekly'
        ? "It's time for this week's giving — no rush, just a nudge."
        : "It's time for this month's giving — no rush, just a nudge.",
  };

  const trigger =
    frequency === 'weekly'
      ? ({
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday: REMINDER_WEEKDAY,
          hour: REMINDER_HOUR,
          minute: REMINDER_MINUTE,
        } satisfies import('expo-notifications').WeeklyTriggerInput)
      : ({
          type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
          day: REMINDER_DAY_OF_MONTH,
          hour: REMINDER_HOUR,
          minute: REMINDER_MINUTE,
        } satisfies import('expo-notifications').MonthlyTriggerInput);

  return Notifications.scheduleNotificationAsync({ content, trigger });
}

export async function cancelGivingReminder(id?: string): Promise<void> {
  if (!id || remindersUnsupported()) return;
  const Notifications = await loadNotifications();
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
}
