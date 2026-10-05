import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Chip } from './Chip';
import { LinkArrow } from './LinkArrow';
import { LogoTile } from './LogoTile';
import type { ProductId } from '../../content/products';
import { Art, type ArtName } from './Art';

type Heading = 'h2' | 'h3' | 'h4';

type ArtCardProps = {
  /** One photo on top of the card (wins over `logos` and `icon`). */
  image?: ArtName;
  /** CSS object-position for the photo's focal point. */
  imageFocus?: string;
  /** Non-product cards: a line icon on a soft tile. */
  icon?: LucideIcon;
  /** Product cards: official logo(s) on a clean tile (wins over `icon`). */
  logos?: readonly ProductId[];
  /** 'named' when nothing else on the card names the product (alt text = product name). */
  logosAlt?: 'decorative' | 'named';
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
  className?: string;
};

/**
 * Reference-style card: one photo (or a product's official logo, or a line icon) on
 * top, white panel overlapping
 * the image's lower part, chip, title, short body and an underlined "Know more ↗".
 * The link is stretched over the panel.
 */
export function ArtCard({
  image,
  imageFocus,
  icon,
  logos,
  logosAlt = 'decorative',
  title,
  body,
  chip,
  href,
  linkLabel = 'Know more',
  action,
  children,
  as: H = 'h3',
  className = '',
}: ArtCardProps) {
  return (
    <article className={`art-card group ${className}`}>
      {image ? (
        <PhotoMedia image={image} focus={imageFocus} />
      ) : logos?.length ? (
        <LogoTile ids={logos} alt={logosAlt} overlap="4.5rem" className="art-card-media" />
      ) : icon ? (
        <IconTile icon={icon} />
      ) : null}
      {/* With no media on top, the panel is a plain card. */}
      <div className={`art-card-panel card ${image || logos?.length || icon ? '' : 'm-0!'}`}>
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

/** Card media: one photo that zooms slowly on hover, with a soft shade at the bottom. */
export function PhotoMedia({ image, focus, className = '' }: { image: ArtName; focus?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`art-card-media art-zoom photo-media ${className}`}>
      <Art name={image} position={focus} className="h-full w-full" />
    </div>
  );
}

/**
 * Card media: a transparent illustration (public/illustrations/<name>, built by
 * `npm run art` from brand-source/illustrations) centred on a clean white stage, above
 * the part the overlapping panel covers. Scales a little on hover.
 */
export function IllustrationMedia({
  name,
  overlap = '3.5rem',
  className = '',
}: {
  name: string;
  /** How much of the media the white panel overlaps (keeps the illustration clear of it). */
  overlap?: string;
  className?: string;
}) {
  const base = `/illustrations/${name}`;
  const sizes = '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw';
  return (
    <div aria-hidden="true" className={`art-card-media illus-stage ${className}`}>
      <div className="absolute inset-x-0 top-0 p-2 sm:p-3" style={{ bottom: overlap }}>
        <picture className="block h-full w-full">
          <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1280.avif 1280w`} sizes={sizes} />
          <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`} sizes={sizes} />
          <img src={`${base}.png`} alt="" width={640} height={533} loading="lazy" decoding="async" className="h-full w-full object-contain" />
        </picture>
      </div>
    </div>
  );
}

/** Media for non-product art cards: a line icon in a white badge on a soft stage. */
export function IconTile({ icon: Icon, overlap = '4.5rem' }: { icon?: LucideIcon; overlap?: string }) {
  return (
    <div aria-hidden="true" className="art-card-media ui-stage">
      <div className="absolute inset-x-0 top-0 grid place-items-center" style={{ bottom: overlap }}>
        {Icon ? (
          <span className="grid h-20 w-20 place-items-center rounded-[22px] bg-white text-blue-600 shadow-card ring-1 ring-slate-200 transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-105">
            <Icon className="h-9 w-9" strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
    </div>
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
