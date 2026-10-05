import { products } from '../../../content/products';
import type { VendorId } from '../../../content/certifications';

/**
 * Small round vendor badge for pills: the official logo where the brand allows it,
 * otherwise a dot in the brand colour (Microsoft, AWS, Oracle restrict their logos).
 * Sits on a white disc so it stays visible on both light and dark (active) pills.
 * Decorative: the pill text already names the vendor.
 */
export function VendorLogo({ id }: { id: VendorId }) {
  const p = products[id];
  const logo = 'logo' in p ? p.logo : undefined;
  return (
    <span aria-hidden="true" className="grid h-5 w-5 flex-none place-items-center rounded-full bg-white ring-1 ring-slate-200">
      {logo ? (
        <img src={logo} alt="" width={12} height={12} className="h-3 w-3" loading="lazy" decoding="async" />
      ) : (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.brandHex }} />
      )}
    </span>
  );
}
