import type { ReactNode } from 'react';
import { Linking, Pressable, Text } from 'react-native';

export function ExternalLink({
  url,
  children,
  className = '',
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Pressable onPress={() => Linking.openURL(url)} className="active:opacity-60">
      <Text className={`text-sm underline text-link dark:text-link-dark ${className}`}>{children}</Text>
    </Pressable>
  );
}
