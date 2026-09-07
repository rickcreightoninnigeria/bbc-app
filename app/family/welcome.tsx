import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ title: 'Newcomer & Visitor Welcome' }} />
      <PlaceholderScreen
        title="Newcomer & Visitor Welcome"
        note="Draft placeholder. What happens when someone new visits BBC — who greets them, what they're offered, how they're followed up with."
      />
    </>
  );
}
