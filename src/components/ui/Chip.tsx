import type { ReactNode } from 'react';

/**
 * Small label chip.
 * dark   — navy label ("Use case", "Azure") on white cards and light surfaces
 * light  — translucent white, for dark sections and imagery
 * soft   — pale canvas chip on white cards
 * accent — orange highlight (offers). Max 1–2 per screen.
 */
export function Chip({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light' | 'soft' | 'accent';
  className?: string;
}) {
  const toneClass = tone === 'dark' ? '' : `chip-${tone}`;
  return <span className={`chip ${toneClass} ${className}`}>{children}</span>;
}
