import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';

import { SocialAuthButtons } from '../../components/SocialAuthButtons';
import { TextLink } from '../../components/TextLink';
import { useAuth } from '../../lib/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { signInWithPassword, signInWithGoogle } = useAuth();
  const colorScheme = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#7D7566' : '#948D7D';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  const handleSignIn = async () => {
    setError('');
    setSubmitting(true);
    const result = await signInWithPassword(email.trim(), password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.back();
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
      <Stack.Screen options={{ title: 'Sign In' }} />
      <Text className="text-2xl font-bold text-ink dark:text-ink-dark">Sign In</Text>

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
        <Text className="mt-3 text-xs text-ink-faint dark:text-ink-faint-dark">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor={placeholderColor}
          className="mt-1 rounded border border-rule px-3 py-2 text-sm text-ink dark:border-rule-dark dark:text-ink-dark"
        />

        <TextLink href="/auth/forgot-password" className="mt-2" underline={false}>
          Forgot password?
        </TextLink>

        {error ? <Text className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</Text> : null}

        <Pressable
          onPress={handleSignIn}
          disabled={submitting || !email || !password}
          className={`mt-4 rounded px-4 py-3 active:opacity-60 ${email && password ? 'bg-make' : 'bg-rule dark:bg-rule-dark'}`}
        >
          <Text
            className={`text-center text-sm font-semibold ${email && password ? 'text-white' : 'text-ink-faint dark:text-ink-faint-dark'}`}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 border-t border-rule pt-6 dark:border-rule-dark">
        <SocialAuthButtons onGoogle={handleGoogle} googlePending={googlePending} />
      </View>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-sm text-ink-soft dark:text-ink-soft-dark">Don't have an account? </Text>
        <TextLink href="/auth/sign-up" underline={false}>
          Sign up
        </TextLink>
      </View>
    </ScrollView>
  );
}
