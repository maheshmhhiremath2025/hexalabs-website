import type { ReactNode } from 'react';
import { Accent } from '../../ui/Accent';

/**
 * Sets the `accent` words of a plain-string title in the gradient accent.
 * Keeps titles as plain strings in content (other pages read them too).
 */
export function accentTitle(title: string, accent?: string): ReactNode {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <Accent>{accent}</Accent>
      {title.slice(i + accent.length)}
    </>
  );
}
