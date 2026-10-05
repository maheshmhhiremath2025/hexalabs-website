import type { CSSProperties } from 'react';
import { product, productMark, type ProductId } from '../../content/products';

type Props = {
  /**
   * The products to show. One product shows its full official logo, large. Two or more
   * show one uniform row of equal square badges, each with the product's compact mark.
   */
  ids: readonly ProductId[];
  /**
   * 'decorative' (default): alt="" because the card's title or label already names the product.
   * 'named': each logo gets its product name as alt text.
   */
  alt?: 'decorative' | 'named';
  /** Space at the bottom hidden by an overlapping panel (art cards), so logos centre in the visible part. */
  overlap?: string;
  /** Logo scale: 'lg' for card media (default), 'sm' for small thumbnails. */
  size?: 'lg' | 'sm';
  /** Sizing and radius of the tile (aspect ratio, height, rounded-*). */
  className?: string;
  /** Eager-load (above the fold). Everything else lazy-loads. */
  priority?: boolean;
  /**
   * Largest badge size (CSS length) for tiles of 2+ logos. Give every tile in a row the
   * same value so their marks match in size whatever the count.
   */
  badge?: string;
};

/**
 * One logo, sized to a consistent optical box: at most 52% of the tile's height and 66%
 * of its width (76% for long wordmarks such as Oracle, so they read at tile width). Wider
 * logos give up a little height (aspect^0.2) so they carry similar visual weight.
 * Units are container-query units of the logo area, so the logo never overflows the tile.
 */
function singleBox(aspect: number, small: boolean): CSSProperties {
  const k = small ? 1.06 : 1;
  const h = (aspect <= 1 ? 52 : 52 / Math.pow(aspect, 0.2)) * k;
  const maxW = (aspect > 3 ? 76 : 66) * k;
  return { height: `min(${h.toFixed(1)}cqh, ${(maxW / aspect).toFixed(1)}cqw)`, width: 'auto' };
}

/** Largest badge (as % of the logo area's height) for a row of n badges. */
const ROW_CAP: Record<number, number> = { 2: 46, 3: 42, 4: 36 };

/**
 * Card media panel with genuine official logos on a white panel tinted with the brand
 * colour, never cropped or distorted. The logos scale to 1.05 when the surrounding
 * `.group` card is hovered or focused.
 */
export function LogoTile({ ids, alt = 'decorative', overlap, size = 'lg', className = '', priority = false, badge }: Props) {
  // A single product tints the tile in its own colour; mixed tiles stay neutral.
  const brand = ids.length === 1 ? product(ids[0]).brandHex : 'var(--blue-600)';
  const loading = priority ? 'eager' : 'lazy';
  return (
    <div className={`logo-tile ${className}`} style={{ '--brand': brand } as CSSProperties}>
      <div className="absolute inset-x-0 top-0 grid place-items-center [container-type:size]" style={{ bottom: overlap ?? 0 }}>
        {ids.length === 1 ? (
          <SingleLogo id={ids[0]} alt={alt} small={size === 'sm'} loading={loading} />
        ) : (
          <BadgeRow ids={ids} alt={alt} loading={loading} badge={badge} />
        )}
      </div>
    </div>
  );
}

function SingleLogo({ id, alt, small, loading }: { id: ProductId; alt: Props['alt']; small: boolean; loading: 'eager' | 'lazy' }) {
  const p = product(id);
  return (
    <img
      src={p.officialLogo}
      alt={alt === 'named' ? p.label : ''}
      width={Math.round(p.logoAspect * 120)}
      height={120}
      loading={loading}
      decoding="async"
      draggable={false}
      className="logo-img max-w-none object-contain"
      style={singleBox(p.logoAspect, small)}
    />
  );
}

/**
 * Equal square white badges, centred: one row for up to four marks, two even rows
 * (4 + 3, 3 + 3) for more. The badge size is the smallest of the cap and an even share
 * of the width and height (gaps included), so every mark fits with even padding.
 */
function BadgeRow({ ids, alt, loading, badge }: { ids: readonly ProductId[]; alt: Props['alt']; loading: 'eager' | 'lazy'; badge?: string }) {
  const n = ids.length;
  const gap = 0.24;
  const perRow = n > 4 ? Math.ceil(n / 2) : n;
  const rows = Math.ceil(n / perRow);
  const across = perRow + gap * (perRow - 1);
  const down = rows + gap * (rows - 1);
  const cap = badge ?? `${ROW_CAP[n] ?? 34}cqh`;
  const s = `min(${cap}, calc(84cqw / ${across.toFixed(2)}), calc(76cqh / ${down.toFixed(2)}))`;
  return (
    <ul
      aria-hidden={alt === 'named' ? undefined : true}
      className="flex flex-wrap items-center justify-center"
      style={{ '--s': s, gap: `calc(var(--s) * ${gap})`, width: `calc(var(--s) * ${(across + 0.02).toFixed(2)})` } as CSSProperties}
    >
      {ids.map((id) => {
        const m = productMark(id);
        // Marks fill 62% of the badge on their longer side.
        const w = m.aspect >= 1 ? 0.62 : 0.62 * m.aspect;
        return (
          <li key={id} className="logo-badge" style={{ width: 'var(--s)', height: 'var(--s)' }}>
            <img
              src={m.src}
              alt={alt === 'named' ? product(id).label : ''}
              width={Math.round(m.aspect * 64)}
              height={64}
              loading={loading}
              decoding="async"
              draggable={false}
              className="max-w-none object-contain"
              style={{ width: `calc(var(--s) * ${w.toFixed(3)})`, height: 'auto' }}
            />
          </li>
        );
      })}
    </ul>
  );
}
