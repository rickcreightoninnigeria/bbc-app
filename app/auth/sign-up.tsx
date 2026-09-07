import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

import { SocialAuthButtons } from '../../components/SocialAuthButtons';
import { TextLink } from '../../components/TextLink';
import { useAuth } from '../../lib/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const { signUpWithPassword, signInWithGoogle } = useAuth();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  const canSubmit = fullName.trim() && email.trim() && password.length >= 6;

  const handleSignUp = async () => {
    setError('');
    setMessage('');
    setSubmitting(true);
    const result = await signUpWithPassword(email.trim(), password, fullName.trim());
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage('Account created. Check your email to confirm it, then sign in.');
  };

  const handleGoogle = async () => {
    setError('');
    setGooglePending(true);
    const result = await signInWithGoogle();
    setGooglePending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-bg-dark" contentContainerClassName="px-5 pt-6 pb-12">
      <Stack.Screen options={{ title: 'Create Account' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Create Account</Text>

      <View className="mt-6">
        <Text className="text-xs text-ink-faint dark:text-ink-faint-dark">Full name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="e.g. Ada Okafor"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />
        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />
        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">
          Password (at least 6 characters)
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />

        {error ? <Text className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}
        {message ? (
          <Text className="mt-3 text-sm text-make dark:text-make-dark">{message}</Text>
        ) : null}

        <Pressable
          onPress={handleSignUp}
          disabled={submitting || !canSubmit}
          className={`mt-4 rounded px-4 py-3 active:opacity-60 ${canSubmit ? 'bg-make' : 'bg-rule dark:bg-rule-dark'}`}
        >
          <Text
            className={`text-center text-sm font-semibold ${canSubmit ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 border-t border-rule pt-6 dark:border-rule-dark">
        <SocialAuthButtons onGoogle={handleGoogle} googlePending={googlePending} />
      </View>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">Already have an account? </Text>
        <TextLink href="/auth/sign-in" underline={false}>
          Sign in
        </TextLink>
      </View>
    </ScrollView>
  );
}
