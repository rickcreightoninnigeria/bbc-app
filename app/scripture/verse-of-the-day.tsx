import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function VerseOfTheDay() {
  return (
    <>
      <Stack.Screen options={{ title: 'Verse of the Day' }} />
      <PlaceholderScreen
        title="Verse of the Day"
        note="Draft placeholder. A short daily verse, shown here and as a notification — pending a decision on content source."
      />
    </>
  );
}
