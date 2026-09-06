import type { PillarSlug } from './values';

/**
 * NativeWind scans source for literal className strings, so these must be
 * spelled out in full here rather than built with template strings.
 */
export const PILLAR_STYLES: Record<
  PillarSlug,
  { text: string; border: string; tabActiveTint: string }
> = {
  make: {
    text: 'text-make dark:text-make-dark',
    border: 'border-make dark:border-make-dark',
    tabActiveTint: '#A5761F',
  },
  many: {
    text: 'text-many dark:text-many-dark',
    border: 'border-many dark:border-many-dark',
    tabActiveTint: '#2F6B47',
  },
  deep: {
    text: 'text-deep dark:text-deep-dark',
    border: 'border-deep dark:border-deep-dark',
    tabActiveTint: '#8C5A38',
  },
  disciples: {
    text: 'text-disciples dark:text-disciples-dark',
    border: 'border-disciples dark:border-disciples-dark',
    tabActiveTint: '#34527C',
  },
};
