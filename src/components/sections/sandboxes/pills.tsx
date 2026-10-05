import type { ReactNode } from 'react';
import { Accent } from '../../ui/Accent';

/**
 * Shared bits for the /sandboxes and /labs pages.
 *
 * PillScroller + pillClass: a white, rounded rail of pill buttons (provider tabs,
 * catalogue filters). Centred when it fits; on narrow screens the rail scrolls
 * sideways inside itself, so the page never scrolls horizontally.
 */
export function PillScroller({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative -mx-4 -mt-2 -mb-6 overflow-x-auto px-4 pt-2 pb-10 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
    </div>
  );
}

/** Classes for the rail itself (put role="tablist" / role="group" on it). */
export const pillRailClass = 'mx-auto flex w-max gap-1 rounded-full bg-white p-1.5 shadow-card';

/** Classes for one pill in the rail. */
export function pillClass(active: boolean) {
  return `relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-smooth)] ${
    active ? 'bg-ink-950 text-white shadow-btn' : 'text-slate-600 hover:bg-canvas hover:text-ink-950'
  }`;
}

/**
 * Render a heading from content copy with one gradient accent word.
 * Keeps the text in src/content; falls back to plain text if the word is missing.
 */
export function withAccent(text: string, accent: string): ReactNode {
  const i = text.indexOf(accent);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <Accent>{accent}</Accent>
      {text.slice(i + accent.length)}
    </>
  );
}
