import { Pressable, Text, View } from 'react-native';

export function SocialAuthButtons({
  onGoogle,
  googlePending,
}: {
  onGoogle: () => void;
  googlePending: boolean;
}) {
  return (
    <View className="gap-3">
      <Pressable
        onPress={onGoogle}
        disabled={googlePending}
        className="rounded border border-rule px-4 py-3 active:opacity-60 dark:border-rule-dark"
      >
        <Text className="text-center text-sm font-semibold text-ink dark:text-ink-dark">
          {googlePending ? 'Opening Google…' : 'Continue with Google'}
        </Text>
      </Pressable>
      <Pressable disabled className="rounded border border-rule px-4 py-3 opacity-50 dark:border-rule-dark">
        <Text className="text-center text-sm font-semibold text-ink-faint dark:text-ink-faint-dark">
          Continue with Apple — coming soon
        </Text>
      </Pressable>
    </View>
  );
}
