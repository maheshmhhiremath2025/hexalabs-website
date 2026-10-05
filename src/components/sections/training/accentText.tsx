import type { ReactNode } from 'react';
import { Accent } from '../../ui/Accent';

/**
 * Renders a content string with one phrase as the gradient accent word, so the
 * copy stays in src/content/* while the heading gets its reference-style accent.
 * If the phrase is not found, the plain text is returned unchanged.
 */
export function accentText(text: string, accent: string): ReactNode {
  const at = text.indexOf(accent);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Accent>{accent}</Accent>
      {text.slice(at + accent.length)}
    </>
  );
}
