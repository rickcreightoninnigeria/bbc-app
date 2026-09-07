import { Stack } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { TextLink } from '../../components/TextLink';

export default function WhatWeBelieve() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'What We Believe' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">What We Believe</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Draft placeholder. A short, plain-language summary of what BBC believes — a quick read
        for a newcomer, distinct from the fuller Statement of Faith below.
      </Text>

      <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
        <TextLink href="/scripture/statement-of-faith">
          Read the full Statement of Faith
        </TextLink>
      </View>
    </ScrollView>
  );
}
