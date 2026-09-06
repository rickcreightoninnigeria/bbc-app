import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function MissionTrips() {
  return (
    <>
      <Stack.Screen options={{ title: 'Mission Trip Sign-ups' }} />
      <PlaceholderScreen
        title="Mission Trip Sign-ups"
        note="Draft placeholder. Upcoming mission trips and a way to register interest — pending real trip details."
      />
    </>
  );
}
