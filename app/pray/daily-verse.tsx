import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function DailyVerse() {
  return (
    <>
      <Stack.Screen options={{ title: 'Daily Verse & Prayer Notification' }} />
      <PlaceholderScreen
        title="Daily Verse & Prayer Notification"
        note="Draft placeholder. A short daily verse and prayer nudge, delivered as a notification — pending a decision on content source."
      />
    </>
  );
}
