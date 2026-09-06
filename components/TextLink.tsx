import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Text } from 'react-native';

/**
 * expo-router's <Link> only applies `className` on web (see its own
 * useInteropClassName, which no-ops on native) — a bare
 * `<Link className="...">text</Link>` renders unstyled default text on a
 * phone. This wraps it with asChild + a styled <Text>, which is the pattern
 * that actually works cross-platform.
 */
export function TextLink({
  href,
  children,
  className = '',
  underline = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  underline?: boolean;
}) {
  return (
    <Link href={href} asChild>
      <Text className={`text-sm text-link dark:text-link-dark ${underline ? 'underline' : ''} ${className}`}>
        {children}
      </Text>
    </Link>
  );
}
