import { Stack } from 'expo-router';

import { PlaceholderScreen } from '../../components/PlaceholderScreen';

export default function MissionaryCalendar() {
  return (
    <>
      <Stack.Screen options={{ title: 'Missionary & Planter Prayer Calendar' }} />
      <PlaceholderScreen
        title="Missionary & Planter Prayer Calendar"
        note="Draft placeholder. A rotating calendar of missionaries and church planters to pray for, pending real names and details."
      />
    </>
  );
}
