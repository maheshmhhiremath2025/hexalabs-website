import { productMark, type ProductId } from '../../content/products';

type Props = {
  id: ProductId;
  /** Badge diameter in px (default 24). */
  size?: number;
  className?: string;
};

/**
 * A product's compact official mark centred in a round white badge — the same shape for
 * every vendor (Oracle shows its red "O", Databricks its bricks), so a row of chips reads
 * evenly. Decorative: always pair it with the product's name in text.
 */
export function MarkBadge({ id, size = 24, className = '' }: Props) {
  const m = productMark(id);
  // The longer side fills 62% of the badge; wide marks (the AWS logo) get a little more.
  const box = size * (m.aspect > 1.3 ? 0.72 : 0.62);
  const w = m.aspect >= 1 ? box : box * m.aspect;
  const h = w / m.aspect;
  return (
    <span
      aria-hidden="true"
      className={`inline-grid flex-none place-items-center rounded-full bg-white ring-1 ring-slate-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={m.src}
        alt=""
        width={Math.round(w)}
        height={Math.round(h)}
        style={{ width: w, height: h }}
        className="max-w-none"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
