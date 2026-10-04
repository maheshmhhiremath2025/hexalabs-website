import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import { customImageCard, labFilters, labs, otherLabPages, type LabCategory } from '../../../content/labs';
import { SmartLink } from '../../ui/SmartLink';
import { LabCard } from './LabCard';

type FilterId = LabCategory | 'all';
const isFilter = (v: string | null): v is FilterId => !!v && labFilters.some((f) => f.id === v);

const counts: Record<string, number> = Object.fromEntries(
  labFilters.map((f) => [f.id, f.id === 'all' ? labs.length : labs.filter((l) => l.categories.includes(f.id as LabCategory)).length]),
);

/** Points visitors who want official labs or sandboxes to the right page. */
function OtherLabPages() {
  const items = [otherLabPages.official, otherLabPages.sandboxes];
  return (
    <aside aria-label="Other kinds of labs" className="mt-6">
      <ul className="flex flex-col gap-x-8 gap-y-2 text-sm text-body sm:flex-row sm:flex-wrap">
        {items.map((item) => (
          <li key={item.href}>
            {item.question}{' '}
            <SmartLink href={item.href} className="link inline-flex items-center gap-1 font-medium">
              {item.label}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </SmartLink>
          </li>
        ))}
      </ul>
    </aside>
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
    setParams(id === 'all' ? {} : { type: id }, { replace: true, preventScrollReset: true });
  };

  const visible = useMemo(
    () => (filter === 'all' ? labs : labs.filter((l) => l.categories.includes(filter))),
    [filter],
  );

  return (
    <section aria-labelledby="catalogue-heading" className="surface-paper py-14 lg:py-20">
      <div className="container-site">
        <h2 id="catalogue-heading" className="sr-only">
          All lab machines
        </h2>

        <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter lab machines by type" className="flex flex-wrap gap-2">
            {labFilters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f.id)}
                  className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors ${
                    active
                      ? 'border-ink-950 bg-ink-950 text-white'
                      : 'border-line-strong bg-white text-heading hover:border-ink-950'
                  }`}
                >
                  {f.label}
                  <span className={`font-mono text-micro ${active ? 'text-slate-300' : 'text-muted'}`}>
                    <span className="sr-only">, </span>
                    {counts[f.id]}
                    <span className="sr-only"> lab machines</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="font-mono text-micro text-muted">
            Showing {visible.length} of {labs.length} lab machines
          </p>
        </div>

        <OtherLabPages />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((lab) => (
            <li key={lab.id}>
              <LabCard lab={lab} />
            </li>
          ))}
          <li>
            <article className="card-lift group relative flex h-full flex-col rounded-card border border-dashed border-line-strong p-6">
              <span className="font-mono text-micro text-muted uppercase">{customImageCard.platform}</span>
              <h3 className="mt-4 text-h3">{customImageCard.title}</h3>
              <p className="mt-3 text-sm text-body">{customImageCard.body}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {customImageCard.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-heading">
                    <Check className="h-4 w-4 flex-none text-blue-600" strokeWidth={1.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <SmartLink
                href={customImageCard.href}
                className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-blue-600 after:absolute after:inset-0 after:rounded-card after:content-['']"
              >
                {customImageCard.linkLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
              </SmartLink>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}
