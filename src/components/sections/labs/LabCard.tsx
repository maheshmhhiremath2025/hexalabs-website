import { BrainCircuit, Boxes, Monitor, SquareTerminal, type LucideIcon } from 'lucide-react';
import type { Lab, LabCategory } from '../../../content/labs';
import { requestLink } from '../../../content/requestTypes';
import { labProduct } from '../../../content/products';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { LogoTile } from '../../ui/LogoTile';

/** One icon per catalogue category (also used by the hero cards). */
export const categoryIcons: Record<LabCategory, LucideIcon> = {
  windows: Monitor,
  linux: SquareTerminal,
  kubernetes: Boxes,
  ai: BrainCircuit,
};

/**
 * White lab card: an inset tile with the lab's main official product logo (scales a little
 * on hover), then platform chip, title, typical use, summary, access periods and
 * "Request this lab ↗". The logos are visual only — the chip and title name the product.
 */
export function LabCard({ lab }: { lab: Lab }) {
  // One official logo per card: the lab's main product. An unmapped lab has no logo tile.
  const main = labProduct[lab.id];
  const logos = main ? [main] : [];
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {logos.length ? <LogoTile ids={logos} className="m-2 mb-0 h-36 rounded-[12px] sm:h-40" /> : null}

      <div className="flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
        <p className="mt-5 sm:mt-6">
          <Chip tone="soft" className="whitespace-normal">
            {lab.platform}
          </Chip>
        </p>
        <h3 className="mt-3 text-xl leading-snug font-medium tracking-tight">{lab.title}</h3>
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
