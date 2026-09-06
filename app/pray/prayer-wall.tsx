import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function PrayerWall() {
  return (
    <>
      <Stack.Screen options={{ title: 'Prayer Request Wall' }} />
      <PlaceholderScreen
        title="Prayer Request Wall"
        note="Draft placeholder. A place to post prayer requests, with a choice of visibility: public, your Community Group, or leaders-only."
      />
    </>
  );
}
