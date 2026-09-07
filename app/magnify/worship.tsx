import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function Worship() {
  return (
    <>
      <Stack.Screen options={{ title: 'Worship Setlists & Song Requests' }} />
      <PlaceholderScreen
        title="Worship Setlists & Song Requests"
        note="Draft placeholder. What we're singing on a given Sunday, plus a way to request songs — pending real setlist data."
      />
    </>
  );
}
