import { ArrowUpRight, Ticket } from 'lucide-react';
import { certHero, certifications, examFinder, vendorCount, vendors } from '../../../content/certifications';
import { SmartLink } from '../../ui/SmartLink';

/**
 * White panel that overlaps the bottom of the hero: the seven vendors as pill
 * links, each opening the exam finder filtered to that vendor.
 */
export function HeroVendors() {
  const { vendorPanel } = certHero;
  return (
    <nav
      aria-labelledby="hero-vendors-title"
      className="card rise-in grid gap-5 p-5 sm:p-7 lg:grid-cols-[15rem_1fr] lg:items-center lg:gap-8"
      style={{ ['--d' as string]: '150ms' }}
    >
      <div className="flex items-center gap-4">
        <span className="icon-bubble h-11 w-11">
          <Ticket className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div>
          <h2 id="hero-vendors-title" className="text-lg leading-snug font-medium tracking-tight">
            {vendorPanel.title}
          </h2>
          <p className="mt-0.5 font-mono text-micro text-muted">{examFinder.groupCount(certifications.length)}</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {vendors.map((v) => (
          <li key={v.id}>
            <SmartLink
              href={`/certifications?vendor=${v.id}#exams`}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-canvas pr-3 pl-4 text-sm text-heading transition-[background-color,color,box-shadow] duration-300 ease-[var(--ease-smooth)] hover:bg-ink-950 hover:text-white hover:shadow-btn"
            >
              <span>
                <span className="sr-only">{vendorPanel.srPrefix} </span>
                {v.label}
              </span>
              <span className="font-mono text-micro text-muted transition-colors group-hover:text-slate-300">
                {vendorCount(v.id)}
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 flex-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
