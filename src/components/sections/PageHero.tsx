import type { ReactNode } from 'react';
import { AccentHeadline, type AccentTitle } from '../ui/Accent';
import { Art, type ArtName } from '../ui/Art';
import { Chip } from '../ui/Chip';

type Props = {
  eyebrow: string;
  title: AccentTitle;
  body: string;
  actions?: ReactNode;
  /** Right-hand column on desktop (dark-styled content: vendor lists, facts…). */
  aside?: ReactNode;
  /** Dark background artwork behind the text: 'hero' | 'dark-silk' | 'dark-spiral'. Default 'dark-silk'. */
  art?: ArtName;
  /**
   * A light artwork shown framed on the right (desktop) when there is no aside —
   * e.g. 'sandboxes' on the sandboxes page.
   */
  feature?: ArtName;
  /** Content (usually a row of white cards) that overlaps the hero's bottom edge. */
  overlap?: ReactNode;
};

/**
 * Inner-page hero: an inset, rounded dark panel with brand artwork drifting slowly
 * behind a big light-weight headline. The h1 renders immediately (no fade — LCP).
 */
export function PageHero({ eyebrow, title, body, actions, aside, art = 'dark-silk', feature, overlap }: Props) {
  const right = aside ?? (feature ? <FeatureArt name={feature} /> : null);
  return (
    <section aria-labelledby="page-title" className="relative px-2 sm:px-3">
      <div className="surface-dark relative overflow-hidden rounded-[20px] sm:rounded-panel">
        <div aria-hidden="true" className="art-drift absolute inset-0">
          <Art name={art} priority sizes="100vw" className="h-full w-full" />
        </div>
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />

        <div
          className={`container-site relative grid grid-cols-12 items-center gap-x-6 gap-y-10 pt-14 sm:pt-20 lg:pt-24 ${
            overlap ? 'pb-32 sm:pb-36 lg:pb-44' : 'pb-16 sm:pb-20 lg:pb-24'
          }`}
        >
          <div className={`col-span-12 ${right ? 'lg:col-span-7' : 'lg:col-span-9'}`}>
            <p>
              <Chip tone="light">{eyebrow}</Chip>
            </p>
            <h1 id="page-title" className="display mt-6 text-[clamp(2.375rem,1.3rem+3.9vw,4.25rem)] leading-[1.04] text-white">
              <AccentHeadline title={title} />
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-slate-300">{body}</p>
            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {right ? <div className="col-span-12 lg:col-span-5">{right}</div> : null}
        </div>
      </div>

      {overlap ? <div className="container-site relative z-10 -mt-20 sm:-mt-24 lg:-mt-28">{overlap}</div> : null}
    </section>
  );
}

function FeatureArt({ name }: { name: ArtName }) {
  return (
    <div className="mx-auto hidden max-w-md lg:block">
      <div className="overflow-hidden rounded-card shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
        <Art name={name} sizes="(min-width: 1024px) 420px, 0px" className="aspect-[3/2]" />
      </div>
    </div>
  );
}
