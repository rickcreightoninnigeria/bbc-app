import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { RequireAuth } from '../components/RequireAuth';
import { fetchDirectory } from '../lib/directory';

function DirectoryList() {
  const { data: profiles, isLoading, isError } = useQuery({
    queryKey: ['directory'],
    queryFn: fetchDirectory,
  });

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Member Directory</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Everyone who's signed in to the app appears here — this fills in as more members create
        an account.
      </Text>

      <View className="mt-6 border-t border-rule pt-2 dark:border-rule-dark">
        {isLoading ? (
          <ActivityIndicator className="mt-4" />
        ) : isError ? (
          <Text className="mt-4 text-sm text-ink-soft dark:text-ink-soft-dark">
            Couldn't load the directory. Pull down to try again.
          </Text>
        ) : profiles && profiles.length > 0 ? (
          profiles.map((person) => (
            <View key={person.id} className="border-b border-rule py-3 dark:border-rule-dark">
              <Text className="text-sm font-semibold text-ink dark:text-ink-dark">
                {person.full_name || 'Unnamed member'}
              </Text>
            </View>
          ))
        ) : (
          <Text className="mt-4 text-sm text-ink-soft dark:text-ink-soft-dark">
            No one else has signed in yet.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

export default function Directory() {
  return (
    <RequireAuth reason="The Member Directory shows who's part of BBC — sign in to browse it.">
      <DirectoryList />
    </RequireAuth>
  );
}
