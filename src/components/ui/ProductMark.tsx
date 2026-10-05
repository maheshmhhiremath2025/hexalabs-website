import { product, type ProductId } from '../../content/products';

type Props = {
  id: ProductId;
  /** 'chip' = small badge for cards (default); 'large' = bigger mark for headers. */
  size?: 'chip' | 'large';
  className?: string;
};

/**
 * A platform's official logo in a white pill, always followed by its name.
 */
export function ProductMark({ id, size = 'chip', className = '' }: Props) {
  const p = product(id);
  const big = size === 'large';
  const h = big ? 20 : 16;
  return (
    <span
      className={`relative inline-flex items-center gap-2 rounded-full bg-white font-medium text-ink-950 shadow-card ring-1 ring-slate-200 ${
        big ? 'h-9 px-3.5 text-sm' : 'h-7 px-2.5 text-xs'
      } ${className}`}
    >
      <img
        src={p.officialLogo}
        alt=""
        width={Math.round(h * p.logoAspect)}
        height={h}
        style={{ height: h, width: 'auto', maxWidth: big ? 120 : 96 }}
        className="flex-none object-contain"
        loading="lazy"
        decoding="async"
      />
      <span>{p.label}</span>
    </span>
  );
}
