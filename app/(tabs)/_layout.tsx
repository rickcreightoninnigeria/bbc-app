import { Tabs } from 'expo-router';

import { PILLAR_STYLES } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="make"
        options={{ title: 'Make', tabBarActiveTintColor: PILLAR_STYLES.make.tabActiveTint }}
      />
      <Tabs.Screen
        name="many"
        options={{ title: 'Many', tabBarActiveTintColor: PILLAR_STYLES.many.tabActiveTint }}
      />
      <Tabs.Screen
        name="deep"
        options={{ title: 'Deep', tabBarActiveTintColor: PILLAR_STYLES.deep.tabActiveTint }}
      />
      <Tabs.Screen
        name="disciples"
        options={{ title: 'Disciples', tabBarActiveTintColor: PILLAR_STYLES.disciples.tabActiveTint }}
      />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
    </Tabs>
  );
}
