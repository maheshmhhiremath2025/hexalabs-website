import { BrainCircuit, Boxes, Monitor, SquareTerminal, type LucideIcon } from 'lucide-react';
import type { Lab, LabCategory } from '../../../content/labs';
import { requestLink } from '../../../content/requestTypes';
import { labProduct, products, type ProductId } from '../../../content/products';
import { Art } from '../../ui/Art';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { ProductMark } from '../../ui/ProductMark';

/** One icon per catalogue category (also used by the hero cards). */
export const categoryIcons: Record<LabCategory, LucideIcon> = {
  windows: Monitor,
  linux: SquareTerminal,
  kubernetes: Boxes,
  ai: BrainCircuit,
};

/**
 * White lab card: a short header with the lab's own product artwork (zooms on hover)
 * and platform chip, the product's official mark overlapping its lower edge, then
 * title, typical use, summary, access periods and "Request this lab ↗".
 * The mark is visual only — the platform chip and title already name the product.
 */
export function LabCard({ lab }: { lab: Lab }) {
  // Every lab in labs.ts is mapped; a new, unmapped lab falls back to the generic artwork with no mark.
  const productId = labProduct[lab.id] as ProductId | undefined;
  const art = productId ? products[productId].art : 'lab-machines';
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="art-zoom relative h-28 bg-canvas-200 sm:h-32">
        <Art
          name={art}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 86vw"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover object-[50%_48%]"
        />
        <p className="absolute top-3.5 left-3.5 max-w-[calc(100%-1.75rem)]">
          <Chip className="whitespace-normal">{lab.platform}</Chip>
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
        {productId ? (
          <span aria-hidden="true" className="relative -mt-[1.125rem] w-fit max-w-full">
            <ProductMark id={productId} size="large" />
          </span>
        ) : null}

        <h3 className={`${productId ? 'mt-4' : 'mt-6'} text-xl leading-snug font-medium tracking-tight`}>{lab.title}</h3>
        <p className="mt-1 text-sm font-medium text-heading">{lab.typicalUse}</p>
        <p className="mt-3 text-[0.9375rem] leading-6 text-body">{lab.summary}</p>

        <div className="mt-6 flex-1">
          <p className="eyebrow">Example access</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {lab.durations.map((d) => (
              <li key={d} className="rounded-full bg-canvas px-3 py-1 text-xs text-heading">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-line pt-5">
          <LinkArrow href={requestLink(lab.requestType, lab.title)} stretched>
            Request this lab<span className="sr-only">: {lab.title}</span>
          </LinkArrow>
        </div>
      </div>
    </article>
  );
}
