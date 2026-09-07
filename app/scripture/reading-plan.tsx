import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function ReadingPlan() {
  return (
    <>
      <Stack.Screen options={{ title: 'Bible Reading Plan' }} />
      <PlaceholderScreen
        title="Bible Reading Plan"
        note="Draft placeholder. A shared reading plan and personal tracker — pending a decision on which plan to follow."
      />
    </>
  );
}
