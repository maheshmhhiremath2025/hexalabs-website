import { hero } from '../../../content/home';
import { ButtonLink } from '../../ui/Button';
import { Accent } from '../../ui/Accent';
import { Reveal } from '../../ui/Reveal';
import { OfferPill, ProofStrip } from './HeroParts';
import { ArchDiagram } from './hero/ArchDiagram';

/**
 * Hairline "Built for" row under the CTAs: the three audiences, in priority order.
 * One row where all three fit (sm, xl); a clean stack where a row would wrap 2 + 1 (phones, lg).
 */
function Audience() {
  return (
    <div className="mt-10 flex max-w-xl flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:gap-5 lg:flex-col lg:gap-3 xl:flex-row xl:gap-5">
      <p id="hero-audience" className="flex-none font-mono text-eyebrow text-muted uppercase">
        {hero.audience.label}
      </p>
      <ul aria-labelledby="hero-audience" className="flex flex-col gap-x-4 gap-y-2 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row text-[0.8125rem] leading-5 text-body">
        {hero.audience.items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-2 whitespace-nowrap">
            <span aria-hidden="true" className="font-mono text-micro text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Home hero. Copy on the left; on the right a line diagram of how a batch runs:
 * learners → one HTTPS entry point → an isolated environment per learner, with
 * the trainer's console on the side and the official course labs underneath.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid bg-grid-hero pointer-events-none absolute inset-0" />

      <div className="container-site relative grid grid-cols-12 items-start gap-x-6 gap-y-14 pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-20 xl:pt-[4.5rem]">
        <div className="col-span-12 lg:col-span-5 xl:col-span-6">
          <OfferPill />
          {/* No fade on the h1: it is the LCP element and must paint immediately. */}
          <h1 id="hero-title" className="hero-title mt-7 text-heading">
            {hero.headline.before}
            <Accent className="text-blue-400">{hero.headline.accent}</Accent>
            {hero.headline.after}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-body">{hero.subcopy}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <Audience />
        </div>

        <Reveal className="col-span-12 lg:col-span-7 xl:col-span-6" delay={0.1}>
          <figure className="mx-auto max-w-[720px] lg:mx-0 lg:max-w-none">
            <ArchDiagram variant="wide" className="hidden sm:block" />
            <ArchDiagram variant="narrow" className="mx-auto max-w-[400px] sm:hidden" />
            <figcaption className="mt-6 max-w-[34rem] font-mono text-[0.8125rem] leading-5 text-body">{hero.caption}</figcaption>
          </figure>
        </Reveal>
      </div>

      <ProofStrip />
    </section>
  );
}
