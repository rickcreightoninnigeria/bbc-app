import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

import { useAuth } from '../../lib/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    const result = await resetPassword(email.trim());
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setSent(true);
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Reset Password' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Reset Password</Text>
      <Text className="mt-2 text-sm text-ink-soft dark:text-ink-soft-dark">
        Enter the email you signed up with, and we'll send a link to reset your password.
      </Text>

      {sent ? (
        <Text className="mt-6 text-sm text-make dark:text-make-dark">
          If an account exists for that email, a reset link is on its way.
        </Text>
      ) : (
        <View className="mt-6">
          <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={placeholderColor}
            className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
          />

          {error ? <Text className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}

          <Pressable
            onPress={handleSubmit}
            disabled={submitting || !email}
            className={`mt-4 rounded px-4 py-3 active:opacity-60 ${email ? 'bg-make' : 'bg-rule dark:bg-rule-dark'}`}
          >
            <Text
              className={`text-center text-sm font-semibold ${email ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}
            >
              {submitting ? 'Sending…' : 'Send Reset Link'}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
