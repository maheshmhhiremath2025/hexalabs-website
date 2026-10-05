import { product, type ProductId } from '../../content/products';
import { LogoTile } from './LogoTile';

type Props = {
  ids: readonly ProductId[];
  /** Accessible name for the list, e.g. "Platforms on this page". */
  label: string;
  /** Tiles per row (default: 2 for up to four logos, 4 for seven or eight, else 3). */
  columns?: number;
  className?: string;
};

/**
 * A grid of white tiles, each with one product's genuine official logo and its name
 * underneath. Used on the right of dark heroes in place of artwork. Short last rows
 * are centred.
 */
export function LogoCluster({ ids, label, columns, className = '' }: Props) {
  const cols = columns ?? (ids.length <= 4 ? 2 : ids.length === 7 || ids.length === 8 ? 4 : 3);
  const basis = `calc((100% - ${cols - 1} * 0.75rem) / ${cols})`;
  return (
    <ul aria-label={label} className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {ids.map((id) => (
        <li
          key={id}
          className="min-w-0 rounded-[18px] bg-white p-1.5 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)] ring-1 ring-white/10"
          style={{ flex: `0 0 ${basis}` }}
        >
          <LogoTile ids={[id]} priority className="aspect-[3/2] rounded-[13px]" />
          <p className="truncate px-1 pt-2 pb-1 text-center text-xs font-medium text-ink-950">{product(id).short ?? product(id).label}</p>
        </li>
      ))}
    </ul>
  );
}
