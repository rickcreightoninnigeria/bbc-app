import { useCallback, useEffect, useState } from 'react';

import { cancelGivingReminder, requestNotificationPermission, scheduleGivingReminder } from './givingReminders';
import {
  addGivingHistoryEntry,
  clearGivingPlan,
  getGivingHistory,
  getGivingPlan,
  saveGivingPlan,
  type GivingFrequency,
  type GivingHistoryEntry,
  type GivingPlan,
} from './givingStorage';

export interface GivingPlanInput {
  amount: number;
  frequency: GivingFrequency;
  designation: string;
  remindersEnabled: boolean;
}

export function useGivingPlan() {
  const [plan, setPlan] = useState<GivingPlan | null>(null);
  const [history, setHistory] = useState<GivingHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [loadedPlan, loadedHistory] = await Promise.all([getGivingPlan(), getGivingHistory()]);
      setPlan(loadedPlan);
      setHistory(loadedHistory);
      setLoading(false);
    })();
  }, []);

  const savePlan = useCallback(
    async (input: GivingPlanInput) => {
      let reminderNotificationId: string | undefined;

      if (input.remindersEnabled) {
        const granted = await requestNotificationPermission();
        if (granted) {
          reminderNotificationId = await scheduleGivingReminder(input.frequency, plan?.reminderNotificationId);
        } else {
          await cancelGivingReminder(plan?.reminderNotificationId);
        }
      } else {
        await cancelGivingReminder(plan?.reminderNotificationId);
      }

      const now = new Date().toISOString();
      const nextPlan: GivingPlan = {
        amount: input.amount,
        frequency: input.frequency,
        designation: input.designation,
        remindersEnabled: input.remindersEnabled && Boolean(reminderNotificationId),
        reminderNotificationId,
        createdAt: plan?.createdAt ?? now,
        updatedAt: now,
      };

      await saveGivingPlan(nextPlan);
      setPlan(nextPlan);
      return nextPlan;
    },
    [plan]
  );

  const removePlan = useCallback(async () => {
    await cancelGivingReminder(plan?.reminderNotificationId);
    await clearGivingPlan();
    setPlan(null);
  }, [plan]);

  const markGivenToday = useCallback(async () => {
    if (!plan) return;
    const entry: GivingHistoryEntry = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      amount: plan.amount,
      designation: plan.designation,
    };
    const updated = await addGivingHistoryEntry(entry);
    setHistory(updated);
  }, [plan]);

  return { plan, history, loading, savePlan, removePlan, markGivenToday };
}
