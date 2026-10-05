import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SmartLink } from './SmartLink';

type Props = {
  href: string;
  children?: ReactNode;
  className?: string;
  /** Stretch the hit area over the closest `relative` ancestor (whole card clickable). */
  stretched?: boolean;
  /** Visually hidden context for screen readers, e.g. the card title → "Know more about Official labs". */
  srContext?: string;
};

/** "Know more ↗" — underlined text link with a small up-right arrow that nudges on hover. */
export function LinkArrow({ href, children = 'Know more', className = '', stretched = false, srContext }: Props) {
  return (
    <SmartLink href={href} className={`link-arrow ${stretched ? 'link-stretched' : ''} ${className}`}>
      {children}
      {srContext ? <span className="sr-only"> about {srContext}</span> : null}
      <ArrowUpRight className="h-3.5 w-3.5 flex-none" strokeWidth={2} aria-hidden="true" />
    </SmartLink>
  );
}
