import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function StatementOfFaith() {
  return (
    <>
      <Stack.Screen options={{ title: 'Statement of Faith' }} />
      <PlaceholderScreen
        title="Statement of Faith"
        note="Draft placeholder. BBC's full statement of faith goes here, once the real text is available — see also the shorter 'What We Believe' under About Us."
      />
    </>
  );
}
