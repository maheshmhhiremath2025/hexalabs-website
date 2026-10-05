import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Check } from 'lucide-react';
import { customImageCard, labFilters, labs, type LabCategory } from '../../../content/labs';
import { Accent } from '../../ui/Accent';
import { ButtonLink } from '../../ui/Button';
import { Carousel } from '../../ui/Carousel';
import { Chip } from '../../ui/Chip';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';
import { PillScroller, pillClass, pillRailClass } from '../sandboxes/pills';
import { LabCard } from './LabCard';

type FilterId = LabCategory | 'all';

const isFilter = (v: string | null): v is FilterId => !!v && labFilters.some((f) => f.id === v);

export const labCounts: Record<string, number> = Object.fromEntries(
  labFilters.map((f) => [f.id, f.id === 'all' ? labs.length : labs.filter((l) => l.categories.includes(f.id as LabCategory)).length]),
);

/** Last tile: a dark card inviting a custom lab image. */
function CustomImageCard() {
  return (
    <article className="surface-dark card-hover relative flex h-full flex-col overflow-hidden rounded-card p-6 shadow-card sm:p-7">
      <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" />
      <div className="relative flex flex-1 flex-col">
        <p>
          <Chip tone="light">{customImageCard.platform}</Chip>
        </p>
        <h3 className="mt-7 text-2xl leading-tight font-light tracking-[-0.02em]">{customImageCard.title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-6 text-body">{customImageCard.body}</p>
        <ul className="mt-6 flex-1 space-y-2.5">
          {customImageCard.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-white">
              <span aria-hidden="true" className="grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-400/15 text-blue-400">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href={customImageCard.href} variant="light" size="sm" arrow="up-right">
            {customImageCard.linkLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function LabCatalogue() {
  const [params, setParams] = useSearchParams();
  // Start at "all" so the prerendered HTML matches; sync from ?type= after mount.
  const [filter, setFilter] = useState<FilterId>('all');

  useEffect(() => {
    const t = params.get('type');
    setFilter(isFilter(t) ? t : 'all');
  }, [params]);

  const choose = (id: FilterId) => {
    setFilter(id);
    setParams(id === 'all' ? {} : { type: id }, {
      replace: true,
      preventScrollReset: true,
    });
  };

  const visible = useMemo(() => (filter === 'all' ? labs : labs.filter((l) => l.categories.includes(filter))), [filter]);

  return (
    <Section tone="paper" id="catalogue" labelledBy="catalogue-heading">
      <SectionIntro
        id="catalogue-heading"
        eyebrow="Lab catalogue"
        title={
          <>
            All <Accent>lab machines</Accent>
          </>
        }
      />

      <div className="mt-10">
        <PillScroller>
          <div role="group" aria-label="Filter lab machines by type" className={pillRailClass}>
            {labFilters.map((f) => {
              const active = filter === f.id;
              return (
                <button key={f.id} type="button" aria-pressed={active} onClick={() => choose(f.id)} className={pillClass(active)}>
                  {f.label}
                  <span
                    className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 font-mono text-micro ${
                      active ? 'bg-white/15 text-white' : 'bg-canvas text-slate-600'
                    }`}
                  >
                    <span className="sr-only">, </span>
                    {labCounts[f.id]}
                    <span className="sr-only"> lab machines</span>
                  </span>
                </button>
              );
            })}
          </div>
        </PillScroller>
      </div>
      <p aria-live="polite" className="mt-1 text-center font-mono text-micro text-muted uppercase">
        Showing {visible.length} of {labs.length} lab machines
      </p>

      {/*
        Phones: a swipeable carousel running to the screen edges with a live "1 / N" pager, so the catalogue is one screen tall.
        640px and up: the same track becomes a 2- / 3-column grid (pager hidden).
        key: remount (scroll back to the start, re-run the staggered rise) when the filter changes.
      */}
      <RevealGroup key={filter} className="-mx-4 mt-10 sm:mx-0">
        <Carousel
          label="Lab machines"
          bleed={false}
          slideClassName="w-[86%] min-w-0 sm:w-auto"
          trackClassName="scroll-px-4 px-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
          controlsClassName="sm:hidden"
        >
          {visible.map((lab) => (
            <RevealItem key={lab.id} className="h-full">
              <LabCard lab={lab} />
            </RevealItem>
          ))}
          <RevealItem className="h-full">
            <CustomImageCard />
          </RevealItem>
        </Carousel>
      </RevealGroup>
    </Section>
  );
}
