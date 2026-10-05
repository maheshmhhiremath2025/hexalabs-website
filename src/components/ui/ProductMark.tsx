import { products, type ProductId } from '../../content/products';

type Props = {
  id: ProductId;
  /** 'chip' = small badge for cards (default); 'large' = bigger mark for headers. */
  size?: 'chip' | 'large';
  className?: string;
};

/**
 * A platform's official mark: its SVG logo plus name where the brand allows it,
 * otherwise the name in the brand colour (Microsoft, AWS, Oracle).
 */
export function ProductMark({ id, size = 'chip', className = '' }: Props) {
  const p = products[id];
  const logo = 'logo' in p ? p.logo : undefined;
  const big = size === 'large';
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white font-medium shadow-card ring-1 ring-slate-200 ${
        big ? 'px-3.5 py-2 text-sm' : 'px-2.5 py-1 text-xs'
      } ${className}`}
    >
      {logo ? (
        <img src={logo} alt="" width={big ? 20 : 16} height={big ? 20 : 16} className={big ? 'h-5 w-5' : 'h-4 w-4'} loading="lazy" decoding="async" />
      ) : (
        <span aria-hidden="true" className={`${big ? 'h-2.5 w-2.5' : 'h-2 w-2'} rounded-full`} style={{ backgroundColor: p.brandHex }} />
      )}
      <span style={logo ? undefined : { color: p.brandHex === '#232F3E' ? '#232F3E' : p.brandHex }} className={logo ? 'text-ink-950' : ''}>
        {p.label}
      </span>
    </span>
  );
}
