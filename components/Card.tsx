import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

export function Card({
  href,
  title,
  subtitle,
  accentClass,
}: {
  href: string;
  title: string;
  subtitle?: string;
  accentClass: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable className="border-b border-rule dark:border-rule-dark py-4 active:opacity-60">
        <Text className={`text-base font-semibold ${accentClass}`}>{title}</Text>
        {subtitle ? (
          <Text className="mt-1 text-sm text-ink-soft dark:text-ink-soft-dark">{subtitle}</Text>
        ) : null}
      </Pressable>
    </Link>
  );
}
