import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function Gatherings() {
  return (
    <>
      <Stack.Screen options={{ title: 'All-Church Gatherings & Baptisms' }} />
      <PlaceholderScreen
        title="All-Church Gatherings & Baptisms"
        note="Draft placeholder. Special all-church gatherings and baptism celebration announcements — pending real event data."
      />
    </>
  );
}
