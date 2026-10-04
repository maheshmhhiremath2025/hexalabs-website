import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { ArrowRight } from 'lucide-react';
import {
  certifications,
  certLabel,
  certRequestHref,
  examFinder,
  practiceOptions,
  vendorCount,
  vendors,
  type Certification,
  type VendorId,
} from '../../../content/certifications';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';

type FilterId = VendorId | 'all';
const isFilter = (v: string | null): v is FilterId => v === 'all' || vendors.some((x) => x.id === v);

const filters: { id: FilterId; label: string }[] = [{ id: 'all', label: examFinder.allLabel }, ...vendors];
const countFor = (id: FilterId) => (id === 'all' ? certifications.length : vendorCount(id));

const cols = examFinder.columns;
const chip = 'inline-block rounded-full border px-2.5 py-0.5 font-mono text-micro whitespace-nowrap';

function StatusChip({ cert }: { cert: Certification }) {
  if (cert.status === 'beta') {
    return <span className={`${chip} border-line-strong text-heading`}>{examFinder.betaLabel}</span>;
  }
  if (cert.status === 'retiring') {
    return (
      <span className={`${chip} border-line-strong text-heading`}>
        {examFinder.retiringLabel}
        {cert.lastDate ? ` · ${cert.lastDate}` : ''}
      </span>
    );
  }
  return null;
}

function ExamRow({ cert }: { cert: Certification }) {
  const practice = cert.practice ? practiceOptions[cert.practice] : null;
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-line py-5 lg:items-start lg:py-4">
      <p className="order-1 col-span-6 font-mono text-sm text-heading lg:col-span-2 lg:pt-0.5">
        <span className="sr-only">{cols.code}: </span>
        {/* Vendors without exam codes leave the cell empty; screen readers hear "None". */}
        {cert.code || <span className="sr-only">{examFinder.noCodeSr}</span>}
      </p>

      <div className="order-3 col-span-12 lg:order-2 lg:col-span-4">
        <p className="font-medium text-heading">
          <span className="sr-only">{cols.name}: </span>
          {cert.name}
          {cert.status ? (
            <>
              {' '}
              <StatusChip cert={cert} />
            </>
          ) : null}
        </p>
        {cert.detail ? <p className="mt-1 text-sm text-muted">{cert.detail}</p> : null}
      </div>

      <p className="order-2 col-span-6 justify-self-end lg:order-3 lg:col-span-2 lg:justify-self-start">
        <span className="sr-only">{cols.level}: </span>
        <span className={`${chip} border-line-strong bg-white text-heading`}>{cert.level}</span>
      </p>

      <p className="order-4 col-span-12 text-sm sm:col-span-7 lg:col-span-2 lg:pt-0.5">
        <span className="mr-2 font-mono text-micro text-muted uppercase lg:sr-only">{cols.practiceOn}</span>
        {practice ? (
          <SmartLink href={practice.href} className="link font-medium">
            {practice.label}
          </SmartLink>
        ) : (
          <span className="text-muted">{examFinder.noPractice}</span>
        )}
      </p>

      <p className="order-5 col-span-12 text-sm sm:col-span-5 sm:text-right lg:col-span-2 lg:pt-0.5">
        <SmartLink href={certRequestHref(cert)} className="link group inline-flex items-center gap-1.5 font-medium">
          {cert.free && cert.practice ? examFinder.freeRequestLabel : examFinder.requestLabel}
          <span className="sr-only">
            {' '}
            {examFinder.requestSrPrefix} {certLabel(cert)}
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
        </SmartLink>
      </p>
    </li>
  );
}

export function ExamFinder() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Start at "all" so the prerendered HTML matches; sync from ?vendor= after mount.
  const [filter, setFilter] = useState<FilterId>('all');

  useEffect(() => {
    const v = params.get('vendor');
    setFilter(isFilter(v) ? v : 'all');
  }, [params]);

  const choose = (id: FilterId) => {
    setFilter(id);
    const search = id === 'all' ? '' : `?vendor=${id}`;
    // Keep the #hash (e.g. #exams) so the page does not jump back to the top.
    navigate({ search, hash: location.hash }, { replace: true, preventScrollReset: true });
  };

  const groups = useMemo(
    () =>
      vendors
        .filter((v) => filter === 'all' || v.id === filter)
        .map((v) => ({ ...v, exams: certifications.filter((c) => c.vendor === v.id) }))
        .filter((g) => g.exams.length > 0),
    [filter],
  );
  const shown = groups.reduce((n, g) => n + g.exams.length, 0);

  return (
    <Section tone="paper" id="exams" labelledBy="exams-title">
      <SectionHeader id="exams-title" eyebrow={examFinder.eyebrow} title={examFinder.title} intro={examFinder.intro} />

      <div className="mt-12 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={examFinder.filterLabel} className="flex flex-wrap gap-2">
          {filters.map((f) => {
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
                <span className={`font-mono text-micro ${active ? 'text-slate-300' : 'text-muted'}`}>{countFor(f.id)}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="flex-none font-mono text-micro text-muted">
          {examFinder.showing(shown, certifications.length)}
        </p>
      </div>

      {/* Column labels for wide screens. Each row also carries its own screen-reader labels. */}
      <div aria-hidden="true" className="mt-8 hidden grid-cols-12 gap-x-6 pb-3 font-mono text-micro text-muted uppercase lg:grid">
        <span className="col-span-2">{cols.code}</span>
        <span className="col-span-4">{cols.name}</span>
        <span className="col-span-2">{cols.level}</span>
        <span className="col-span-2">{cols.practiceOn}</span>
        <span className="col-span-2 text-right">{cols.request}</span>
      </div>

      <div className="space-y-12 lg:space-y-10">
        {groups.map((g, i) => (
          <div key={g.id} className={i === 0 ? 'mt-8 lg:mt-0' : ''}>
            <h3 className="flex items-baseline gap-3 pb-3 text-h3">
              {g.label}
              <span className="font-mono text-micro font-normal text-muted">{examFinder.groupCount(g.exams.length)}</span>
            </h3>
            <ul>
              {g.exams.map((c) => (
                <ExamRow key={`${c.vendor}-${c.code || c.name}`} cert={c} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 border-t border-line pt-6 text-sm text-body">
        {examFinder.notListed.before}{' '}
        <SmartLink href={examFinder.notListed.href} className="link font-medium">
          {examFinder.notListed.link}
        </SmartLink>{' '}
        {examFinder.notListed.after}
      </p>
    </Section>
  );
}
