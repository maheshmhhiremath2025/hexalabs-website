import { Accent } from '../../ui/Accent';

/**
 * Render a plain content string as a heading with one gradient accent word.
 * `word` is the first match inside `text`; if it is not found the text is
 * returned unchanged, so editing the content never breaks the heading.
 */
export function accentWord(text: string, word: string) {
  const at = text.indexOf(word);
  if (!word || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Accent>{word}</Accent>
      {text.slice(at + word.length)}
    </>
  );
}
