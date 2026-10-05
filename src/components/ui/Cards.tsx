import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Art, type ArtName } from './Art';
import { Chip } from './Chip';
import { LinkArrow } from './LinkArrow';

type Heading = 'h2' | 'h3' | 'h4';

type ArtCardProps = {
  art: ArtName;
  title: string;
  body?: ReactNode;
  /** Small dark label above the title, e.g. "Use case", "Azure". */
  chip?: string;
  href?: string;
  /** Link text, default "Know more". */
  linkLabel?: string;
  /** Replace the text link with your own action (e.g. a dark pill ButtonLink). */
  action?: ReactNode;
  /** Extra content between body and link (lists, meta). */
  children?: ReactNode;
  as?: Heading;
  /** `sizes` for the artwork; default suits a 3-up grid. */
  sizes?: string;
  className?: string;
};

/**
 * Reference-style card: artwork on top (zooms on hover), white panel overlapping
 * the image's lower part, chip, title, short body and an underlined "Know more ↗".
 * The link is stretched over the panel.
 */
export function ArtCard({
  art,
  title,
  body,
  chip,
  href,
  linkLabel = 'Know more',
  action,
  children,
  as: H = 'h3',
  sizes,
  className = '',
}: ArtCardProps) {
  return (
    <article className={`art-card group ${className}`}>
      <div className="art-card-media art-zoom">
        <Art name={art} sizes={sizes} className="h-full w-full" />
      </div>
      <div className="art-card-panel card">
        {chip ? (
          <p>
            <Chip>{chip}</Chip>
          </p>
        ) : null}
        <H className={`${chip ? 'mt-3' : ''} text-xl leading-snug font-medium tracking-tight`}>{title}</H>
        {body ? <p className="mt-2 text-sm leading-6 text-body">{body}</p> : null}
        {children}
        {action || href ? (
          <div className="mt-auto pt-5">
            {action ?? (href ? <LinkArrow href={href} stretched srContext={title}>{linkLabel}</LinkArrow> : null)}
          </div>
        ) : null}
      </div>
    </article>
  );
}

type IconCardProps = {
  /** A lucide-react icon. */
  icon: LucideIcon;
  title: string;
  body?: ReactNode;
  href?: string;
  linkLabel?: string;
  as?: Heading;
  /** Tighter padding and type below 640px (for 2-up grids on phones). */
  compact?: boolean;
  className?: string;
};

/** White card with an icon in a soft circle, a title, one line and "Know more ↗". */
export function IconCard({
  icon: Icon,
  title,
  body,
  href,
  linkLabel = 'Know more',
  as: H = 'h3',
  compact = false,
  className = '',
}: IconCardProps) {
  return (
    <article className={`card card-hover group flex h-full flex-col ${compact ? 'p-4' : 'p-5'} sm:p-6 ${className}`}>
      <span className={`icon-bubble ${compact ? 'h-9 w-9 sm:h-10 sm:w-10' : ''}`}>
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <H className={`${compact ? 'mt-3 text-base' : 'mt-4 text-lg'} leading-snug font-medium tracking-tight sm:mt-4 sm:text-lg`}>{title}</H>
      {body ? <p className={`mt-1.5 ${compact ? 'text-[0.8125rem] leading-5' : 'text-sm leading-6'} text-body sm:text-sm sm:leading-6`}>{body}</p> : null}
      {href ? (
        <div className="mt-auto pt-4">
          <LinkArrow href={href} stretched srContext={title}>
            {linkLabel}
          </LinkArrow>
        </div>
      ) : null}
    </article>
  );
}
