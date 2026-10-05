import { BrainCircuit, Boxes, Monitor, SquareTerminal, type LucideIcon } from 'lucide-react';
import type { Lab, LabCategory } from '../../../content/labs';
import { requestLink } from '../../../content/requestTypes';
import { Art, type ArtName } from '../../ui/Art';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';

/** One icon per catalogue category (also used by the hero cards). */
export const categoryIcons: Record<LabCategory, LucideIcon> = {
  windows: Monitor,
  linux: SquareTerminal,
  kubernetes: Boxes,
  ai: BrainCircuit,
};

/** One light artwork per category, so the grid reads in bands (4 images in total, cached after the first). */
const categoryArt: Record<LabCategory, ArtName> = {
  windows: 'lab-machines',
  linux: 'security',
  kubernetes: 'honeycomb',
  ai: 'ask-hexa',
};

/** Crops (and a mirror) of the same artwork, so neighbouring cards of one category don't look identical. */
const crops = [
  { pic: '', img: 'object-[50%_45%]' },
  { pic: '-scale-x-100', img: 'object-[50%_25%]' },
  { pic: '', img: 'object-[50%_80%]' },
] as const;

/**
 * White lab card: a short artwork header (zooms on hover) with the platform chip,
 * an icon bubble overlapping its lower edge, then title, typical use, summary,
 * access periods and "Request this lab ↗".
 */
export function LabCard({ lab, crop = 0 }: { lab: Lab; crop?: number }) {
  const category = lab.categories[0];
  const Icon = categoryIcons[category];
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="art-zoom relative h-28 bg-canvas-200 sm:h-32">
        <Art
          name={categoryArt[category]}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 86vw"
          className={`h-full w-full ${crops[crop % crops.length].pic}`}
          imgClassName={`h-full w-full object-cover ${crops[crop % crops.length].img}`}
        />
        <p className="absolute top-3.5 left-3.5 max-w-[calc(100%-1.75rem)]">
          <Chip className="whitespace-normal">{lab.platform}</Chip>
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
        <span className="relative -mt-6 w-fit rounded-full bg-white p-1 shadow-card">
          <span className="icon-bubble h-11 w-11">
            <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </span>

        <h3 className="mt-4 text-xl leading-snug font-medium tracking-tight">{lab.title}</h3>
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
