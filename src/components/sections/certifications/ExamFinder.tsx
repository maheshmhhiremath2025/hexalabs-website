import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
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
import type { ProductId } from '../../../content/products';
import { Chip } from '../../ui/Chip';
import { LogoTile } from '../../ui/LogoTile';
import { LinkArrow } from '../../ui/LinkArrow';
import { Reveal } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { accentWord } from '../official/accentWord';
import { VendorLogo } from './VendorLogo';

type FilterId = VendorId | 'all';

/** Official logo in each vendor's group header (CNCF shows its own mark; the heading names the Linux Foundation). */
const vendorLogos = (id: VendorId): ProductId[] => [id];
const isFilter = (v: string | null): v is FilterId => v === 'all' || vendors.some((x) => x.id === v);

const filters: { id: FilterId; label: string }[] = [{ id: 'all', label: examFinder.allLabel }, ...vendors];
const countFor = (id: FilterId) => (id === 'all' ? certifications.length : vendorCount(id));

const cols = examFinder.columns;

function StatusChip({ cert }: { cert: Certification }) {
  if (cert.status === 'beta') {
    return <Chip>{examFinder.betaLabel}</Chip>;
  }
  if (cert.status === 'retiring') {
    return (
      <Chip>
        {examFinder.retiringLabel}
        {cert.lastDate ? ` · ${cert.lastDate}` : ''}
      </Chip>
    );
  }
  return null;
}

/** Shared column template so the header row and every exam row line up. */
const rowGrid = 'grid grid-cols-12 gap-x-6 gap-y-2 lg:items-start';

function ExamRow({ cert, className = '', delay }: { cert: Certification; className?: string; delay?: number }) {
  const practice = cert.practice ? practiceOptions[cert.practice] : null;
  return (
    <li
      className={`${rowGrid} px-5 py-5 transition-colors duration-300 hover:bg-canvas/60 sm:px-7 lg:py-4 ${className}`}
      style={delay === undefined ? undefined : { ['--d' as string]: `${delay}ms` }}
    >
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
        <Chip tone="soft">{cert.level}</Chip>
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

      <p className="order-5 col-span-12 sm:col-span-5 sm:text-right lg:col-span-2 lg:pt-0.5">
        <LinkArrow href={certRequestHref(cert)}>
          {cert.free && cert.practice ? examFinder.freeRequestLabel : examFinder.requestLabel}
          <span className="sr-only">
            {' '}
            {examFinder.requestSrPrefix} {certLabel(cert)}
          </span>
        </LinkArrow>
      </p>
    </li>
  );
}

/** Vendor pills start with a round logo badge, so they take less left padding than "All". */
const pillClass = (active: boolean, withLogo: boolean) =>
  `inline-flex h-10 shrink-0 snap-start items-center gap-2 rounded-full ${withLogo ? 'pr-4 pl-2' : 'px-4'} text-sm whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-smooth)] ${
    active ? 'bg-ink-950 text-white shadow-btn' : 'text-slate-600 hover:bg-canvas hover:text-ink-950'
  }`;

/** Rows shown per vendor while the filter is "All" (one fewer on phones, see PREVIEW_PHONE). */
const PREVIEW = 4;
const PREVIEW_PHONE = 3;
/** Soft fade at both ends of the phone-width filter rail, so it reads as scrollable. */
const railMask =
  'max-xl:[mask-image:linear-gradient(to_right,transparent,#000_0.75rem,#000_calc(100%-2.5rem),transparent)]';

export function ExamFinder() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Start at "all" so the prerendered HTML matches; sync from ?vendor= after mount.
  const [filter, setFilter] = useState<FilterId>('all');
  // Vendor groups the visitor expanded while viewing "All".
  const [expanded, setExpanded] = useState<ReadonlySet<VendorId>>(() => new Set());
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = params.get('vendor');
    setFilter(isFilter(v) ? v : 'all');
  }, [params]);

  // Phone widths: keep the active pill visible inside the scrolling rail (never scrolls the page).
  useEffect(() => {
    const rail = railRef.current;
    const pill = rail?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!rail || !pill || rail.scrollWidth <= rail.clientWidth) return;
    const left = pill.offsetLeft - (rail.clientWidth - pill.offsetWidth) / 2;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduce ? 'auto' : 'smooth' });
  }, [filter]);

  // Only fold a group when it hides at least two exams; folding one row away is not worth a click.
  const isCollapsible = (n: number) => filter === 'all' && n > PREVIEW + 1;

  const toggleGroup = (id: VendorId, button: HTMLElement) => {
    // Collapsing a long list: bring the group's heading back into view instead of leaving the reader far below it.
    if (expanded.has(id)) {
      const card = button.closest<HTMLElement>('[data-exam-group]');
      if (card && card.getBoundingClientRect().top < 0) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        card.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
      <SectionIntro
        id="exams-title"
        eyebrow={examFinder.eyebrow}
        title={accentWord(examFinder.title, 'exam')}
        intro={examFinder.intro}
      />

      {/* Vendor filter: a white pill rail. Below xl it stays one row and scrolls inside itself. */}
      <div className="mx-auto mt-10 max-w-full overflow-hidden rounded-full bg-white shadow-card xl:w-max">
        <div
          ref={railRef}
          role="group"
          aria-label={examFinder.filterLabel}
          className={`flex snap-x snap-mandatory scroll-px-1.5 gap-1 overflow-x-auto overscroll-x-contain p-1.5 [scrollbar-width:none] max-xl:pr-10 max-xl:pl-3 xl:overflow-visible [&::-webkit-scrollbar]:hidden ${railMask}`}
        >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button key={f.id} type="button" aria-pressed={active} onClick={() => choose(f.id)} className={pillClass(active, f.id !== 'all')}>
              {f.id === 'all' ? f.label : <VendorLogo id={f.id} label={f.label} />}
              <span className={`font-mono text-micro ${active ? 'text-slate-300' : 'text-slate-500'}`}>{countFor(f.id)}</span>
            </button>
          );
        })}
        </div>
      </div>
      <p aria-live="polite" className="mt-4 text-center font-mono text-micro text-muted">
        {examFinder.showing(shown, certifications.length)}
      </p>

      <div className="mt-10 space-y-6">
        {groups.map((g) => (
          <Reveal key={g.id}>
            {/* content-visibility lets the browser skip laying out vendor groups until they are near the screen. */}
            <div data-exam-group className="card scroll-mt-28 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
              {/* Vendor header: its official logo on a small tile (decorative — the heading names it). */}
              <div className="flex items-center gap-4 border-b border-line px-5 py-4 sm:gap-5 sm:px-7">
                <LogoTile
                  ids={vendorLogos(g.id)}
                  size="sm"
                  className="aspect-[3/2] w-24 flex-none rounded-xl sm:w-32"
                />
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
                  <h3 className="min-w-0 text-xl leading-snug font-medium tracking-tight">{g.label}</h3>
                  <Chip tone="soft">{examFinder.groupCount(g.exams.length)}</Chip>
                </div>
              </div>
              {/* Column labels for wide screens. Each row also carries its own screen-reader labels. */}
              <div
                aria-hidden="true"
                className={`${rowGrid} hidden bg-paper-50 px-7 py-3 font-mono text-micro text-muted uppercase lg:grid`}
              >
                <span className="col-span-2">{cols.code}</span>
                <span className="col-span-4">{cols.name}</span>
                <span className="col-span-2">{cols.level}</span>
                <span className="col-span-2">{cols.practiceOn}</span>
                <span className="col-span-2 text-right">{cols.request}</span>
              </div>
              <ul id={`exams-${g.id}`} className="divide-y divide-line">
                {g.exams.map((c, i) => {
                  const collapsible = isCollapsible(g.exams.length);
                  const open = !collapsible || expanded.has(g.id);
                  if (!open && i >= PREVIEW) return null;
                  // Collapsed on phones: hide one more row. Rows past the preview rise in when expanded.
                  const reveal = collapsible && open && i >= PREVIEW;
                  const cls = !open && i === PREVIEW_PHONE ? 'max-sm:hidden' : reveal ? 'rise-in' : '';
                  const delay = reveal ? Math.min(i - PREVIEW, 8) * 45 : undefined;
                  return <ExamRow key={`${c.vendor}-${c.code || c.name}`} cert={c} className={cls} delay={delay} />;
                })}
              </ul>
              {isCollapsible(g.exams.length) ? (
                <div className="border-t border-line bg-paper-50 px-5 py-4 text-center sm:px-7">
                  <button
                    type="button"
                    aria-expanded={expanded.has(g.id)}
                    aria-controls={`exams-${g.id}`}
                    onClick={(e) => toggleGroup(g.id, e.currentTarget)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-medium text-heading shadow-card transition-[transform,box-shadow] duration-300 ease-[var(--ease-smooth)] hover:-translate-y-0.5"
                  >
                    {expanded.has(g.id) ? 'Show fewer' : `Show all ${g.exams.length} exams`}
                    <span className="sr-only"> from {g.label}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className={`size-3.5 transition-transform duration-500 ease-[var(--ease-smooth)] ${expanded.has(g.id) ? 'rotate-180' : ''}`}
                    >
                      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-body">
        {examFinder.notListed.before}{' '}
        <SmartLink href={examFinder.notListed.href} className="link-underline font-medium">
          {examFinder.notListed.link}
        </SmartLink>{' '}
        {examFinder.notListed.after} {examFinder.notListed.store.before}{' '}
        <a href={examFinder.notListed.store.href} className="link-underline font-medium">
          {examFinder.notListed.store.link}
        </a>
        .
      </p>
    </Section>
  );
}
