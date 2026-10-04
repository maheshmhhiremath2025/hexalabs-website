import type { ReactNode } from 'react';

/** Instrument Serif italic — use for 1–2 words per headline at most. */
export function Accent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`serif-accent ${className}`}>{children}</span>;
}

export type AccentTitle = { before: string; accent: string; after: string };

export function AccentHeadline({ title, accentClass = '' }: { title: AccentTitle; accentClass?: string }) {
  return (
    <>
      {title.before}
      <Accent className={accentClass}>{title.accent}</Accent>
      {title.after}
    </>
  );
}
