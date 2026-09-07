import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ExternalLink } from '../../components/ExternalLink';

export default function Sermons() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Sermons' }} />
      <Text className="text-2xl font-bold text-deep dark:text-deep-dark">Sermons</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Sermons aren't hosted in the app itself yet — these links open BBC's existing channels in
        your browser or the YouTube/Spotify app.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          YouTube
        </Text>
        <ExternalLink url="https://www.youtube.com/@BereanBibleChurch_NG/podcasts" className="mt-2">
          Watch on YouTube
        </ExternalLink>
      </View>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <Text className="text-xs uppercase tracking-wider text-ink-faint dark:text-ink-faint-dark">
          Spotify & other links
        </Text>
        <ExternalLink url="https://linktr.ee/bereanbiblechurch.ng" className="mt-2">
          Listen on Spotify
        </ExternalLink>
      </View>
    </ScrollView>
  );
}
