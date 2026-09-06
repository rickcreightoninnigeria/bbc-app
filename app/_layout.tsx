import '../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../lib/queryClient';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="give" options={{ presentation: 'modal', title: 'Give' }} />
            <Stack.Screen name="serve" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen
              name="resourcing-vision"
              options={{ title: 'Resourcing our Church Vision with Money' }}
            />
            <Stack.Screen name="giving-plan" options={{ title: 'My Giving Plan' }} />
            <Stack.Screen name="directory" options={{ presentation: 'modal', title: 'Member Directory' }} />
            <Stack.Screen name="calendar" options={{ presentation: 'modal', title: 'Calendar' }} />
            <Stack.Screen name="prayer-triplets" options={{ presentation: 'modal', title: 'Prayer Triplets' }} />
            <Stack.Screen name="search" options={{ presentation: 'modal', title: 'Search' }} />
            <Stack.Screen name="safeguarding" options={{ presentation: 'modal', title: 'Safeguarding & Policies' }} />
            <Stack.Screen name="settings" options={{ presentation: 'modal', title: 'Profile & Settings' }} />
          </Stack>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
