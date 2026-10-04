import { ArrowRight } from 'lucide-react';
import { hero, proofStrip } from '../../../content/home';
import { site } from '../../../content/site';
import { ButtonLink } from '../../ui/Button';
import { SmartLink } from '../../ui/SmartLink';
import { Accent } from '../../ui/Accent';
import { FleetGraphic } from '../../graphics/FleetGraphic';

function HeroVisual() {
  return (
    <figure>
      <FleetGraphic />
      <figcaption className="sr-only">{hero.visualSummary}</figcaption>
    </figure>
  );
}

function OfferPill() {
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

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <div className="container-site relative grid grid-cols-12 items-center gap-x-6 gap-y-16 pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
        <div className="col-span-12 lg:col-span-6">
          <OfferPill />
          <h1 id="hero-title" className="mt-7 text-display">
            {hero.headline.before}
            <Accent className="text-blue-400">{hero.headline.accent}</Accent>
            {hero.headline.after}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-body">{hero.subcopy}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-micro text-muted">{hero.footnote}</p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:pl-4">
          <HeroVisual />
        </div>
      </div>

      <ProofStrip />
    </section>
  );
}

// Thin dividers: stacked on phones, 2×2 on tablets, one row on desktop.
const dividers = [
  '',
  'border-t sm:border-t-0 sm:border-l sm:pl-6',
  'border-t lg:border-t-0 lg:border-l lg:pl-6',
  'border-t lg:border-t-0 sm:border-l sm:pl-6',
];

function ProofStrip() {
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
