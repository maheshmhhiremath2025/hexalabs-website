import { ArrowRight } from 'lucide-react';
import { proofStrip } from '../../../content/home';
import { site } from '../../../content/site';
import { SmartLink } from '../../ui/SmartLink';

/** Shared hero pieces: the offer pill and the fact strip under the hero. */
export function OfferPill() {
  return (
    <SmartLink
      href={site.offer.href}
      className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900 py-1 pr-3 pl-1 text-sm text-slate-300 transition-colors hover:border-ink-600"
    >
      <span className="rounded-full bg-orange-500/15 px-2 py-0.5 font-mono text-micro text-orange-500 uppercase">Offer</span>
      <span className="truncate text-white">
        <span className="sm:hidden">{site.offer.labelCompact}</span>
        <span className="hidden sm:inline">{site.offer.label}</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 flex-none transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
    </SmartLink>
  );
}

// Thin dividers: stacked on phones, 2×2 on tablets, one row on desktop.
const dividers = [
  '',
  'border-t sm:border-t-0 sm:border-l sm:pl-6',
  'border-t lg:border-t-0 lg:border-l lg:pl-6',
  'border-t lg:border-t-0 sm:border-l sm:pl-6',
];

export function ProofStrip() {
  return (
    <div className="relative border-t border-ink-700">
      <ul className="container-site grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key facts">
        {proofStrip.map((fact, i) => (
          <li
            key={fact}
            className={`flex items-baseline gap-3 border-ink-700 py-5 text-sm text-white lg:py-7 ${dividers[i % dividers.length]}`}
          >
            <span aria-hidden="true" className="font-mono text-micro text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
