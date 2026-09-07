import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ExternalLink } from '../../components/ExternalLink';

export default function BibleStudyReader() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Bible Study Reader App' }} />
      <Text className="text-2xl font-bold text-deep dark:text-deep-dark">
        Bible Study Reader App
      </Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        A separate app, built by one of our members, for reading and studying Scripture more
        closely on your own — a helpful companion to whatever you're reading or studying at BBC.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <ExternalLink url="https://play.google.com/store/apps/details?id=com.rickcreighton.bsr">
          Get it on Google Play
        </ExternalLink>
      </View>
    </ScrollView>
  );
}
