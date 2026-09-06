import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

import {
  fetchPrayerRequests,
  formatRequestDate,
  incrementPrayCount,
  postPrayerRequest,
  type PrayerRequest,
} from '../../lib/prayerWall';
import { isSupabaseConfigured } from '../../lib/supabase';

function RequestCard({ request }: { request: PrayerRequest }) {
  const queryClient = useQueryClient();
  const prayMutation = useMutation({
    mutationFn: () => incrementPrayCount(request.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prayer-requests'] }),
  });

  return (
    <View className="border-b border-rule py-4 dark:border-rule-dark">
      <Text className="text-sm text-ink dark:text-ink-dark">{request.request_text}</Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">
          {request.author_name || 'Anonymous'} · {formatRequestDate(request.created_at)}
        </Text>
        <Pressable
          onPress={() => prayMutation.mutate()}
          disabled={prayMutation.isPending}
          className="rounded-full border border-make px-3 py-1 active:opacity-60 dark:border-make-dark"
        >
          <Text className="text-xs font-semibold text-make dark:text-make-dark">
            Praying ({request.pray_count})
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function PrayerWall() {
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';
  const queryClient = useQueryClient();

  const [authorName, setAuthorName] = useState('');
  const [requestText, setRequestText] = useState('');

  const { data: requests, isLoading, isError } = useQuery({
    queryKey: ['prayer-requests'],
    queryFn: fetchPrayerRequests,
    enabled: isSupabaseConfigured,
  });

  const postMutation = useMutation({
    mutationFn: postPrayerRequest,
    onSuccess: () => {
      setRequestText('');
      queryClient.invalidateQueries({ queryKey: ['prayer-requests'] });
    },
  });

  const canPost = requestText.trim().length > 0 && !postMutation.isPending;

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Prayer Request Wall' }} />
      <Text className="text-2xl font-bold text-make dark:text-make-dark">Prayer Request Wall</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Everything posted here is visible to anyone using the app. Group-only and leaders-only
        requests aren't available yet — that needs accounts and Community Group membership,
        which this app doesn't have yet. For anything private, speak to a leader directly.
      </Text>

      {!isSupabaseConfigured ? (
        <Text className="mt-4 text-xs text-ink-faint dark:text-ink-faint-dark">
          Not connected yet — the wall needs a Supabase project set up before it can save or show
          anything (see the README).
        </Text>
      ) : (
        <>
          <View className="mt-6 border-t border-rule pt-4 dark:border-rule-dark">
            <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">Your name (optional)</Text>
            <TextInput
              value={authorName}
              onChangeText={setAuthorName}
              placeholder="Anonymous"
              placeholderTextColor={placeholderColor}
              className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
            />
            <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">Your request</Text>
            <TextInput
              value={requestText}
              onChangeText={setRequestText}
              placeholder="What would you like the church to pray for?"
              placeholderTextColor={placeholderColor}
              multiline
              numberOfLines={3}
              className="mt-1 min-h-20 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
            />
            <Pressable
              onPress={() => postMutation.mutate({ authorName, requestText })}
              disabled={!canPost}
              className={`mt-3 self-start rounded px-4 py-2 active:opacity-60 ${canPost ? 'bg-make' : 'bg-rule dark:bg-rule-dark'}`}
            >
              <Text className={`text-sm font-semibold ${canPost ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}>
                {postMutation.isPending ? 'Posting…' : 'Post request'}
              </Text>
            </Pressable>
          </View>

          <View className="mt-6 border-t border-rule pt-2 dark:border-rule-dark">
            {isLoading ? (
              <ActivityIndicator className="mt-4" />
            ) : isError ? (
              <Text className="mt-4 text-sm text-ink-soft dark:text-ink-soft-dark">
                Couldn't load requests. Pull down to try again.
              </Text>
            ) : requests && requests.length > 0 ? (
              requests.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <Text className="mt-4 text-sm text-ink-soft dark:text-ink-soft-dark">
                No requests yet — be the first to post one.
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
