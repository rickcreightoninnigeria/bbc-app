import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function SpiritualGifts() {
  return (
    <>
      <Stack.Screen options={{ title: 'Spiritual Gifts Survey' }} />
      <PlaceholderScreen
        title="Spiritual Gifts Survey"
        note="Draft placeholder. A short survey to help match someone's gifts to BBC's serving needs — pending design."
      />
    </>
  );
}
