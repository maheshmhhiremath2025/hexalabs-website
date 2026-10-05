import type { ReactNode } from 'react';

/**
 * Accent word(s) in a heading — 1–2 words per heading at most.
 * variant 'gradient' (default): brand-blue gradient text that adapts to light and dark surfaces.
 * variant 'serif': Instrument Serif italic (at most one per page).
 */
export type AccentVariant = 'gradient' | 'serif';

export function Accent({
  children,
  className = '',
  variant = 'gradient',
}: {
  children: ReactNode;
  className?: string;
  variant?: AccentVariant;
}) {
  return <span className={`${variant === 'serif' ? 'serif-accent' : 'text-accent'} ${className}`}>{children}</span>;
}

export type AccentTitle = { before: string; accent: string; after: string };

export function AccentHeadline({
  title,
  accentClass = '',
  variant = 'gradient',
}: {
  title: AccentTitle;
  /** Extra classes on the accent span. Colour classes have no effect on the gradient variant. */
  accentClass?: string;
  variant?: AccentVariant;
}) {
  return (
    <>
      {title.before}
      <Accent className={accentClass} variant={variant}>
        {title.accent}
      </Accent>
      {title.after}
    </>
  );
}
