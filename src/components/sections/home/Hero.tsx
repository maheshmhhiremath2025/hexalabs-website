import { hero } from '../../../content/home';
import { ButtonLink } from '../../ui/Button';
import { Accent } from '../../ui/Accent';
import { Art } from '../../ui/Art';
import { HeroCards, OfferPill, ProofStrip } from './HeroParts';

/** "Built for" — the three audiences, as a quiet line under the CTAs. */
function Audience() {
  return (
    <div className="mt-10 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-5">
      <p id="hero-audience" className="flex-none font-mono text-eyebrow text-slate-400 uppercase">
        {hero.audience.label}
      </p>
      <ul aria-labelledby="hero-audience" className="flex flex-col gap-1.5 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-4">
        {hero.audience.items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4 whitespace-nowrap">
            {i > 0 ? <span aria-hidden="true" className="hidden h-1 w-1 translate-y-[-3px] rounded-full bg-slate-400 sm:block" /> : null}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Home hero: an inset rounded panel with the dark brand artwork drifting slowly
 * behind a big light-weight headline, then four white cards overlapping its bottom edge.
 * The h1 is never animated (it is the LCP element).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative px-2 sm:px-3">
      <div className="surface-dark relative overflow-hidden rounded-[20px] sm:rounded-panel">
        <div aria-hidden="true" className="art-drift absolute inset-0">
          <Art name="hero" priority sizes="100vw" className="h-full w-full" imgClassName="h-full w-full object-cover object-[70%_50%]" />
        </div>
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />

        <div className="container-site relative pt-12 pb-36 sm:pt-20 sm:pb-40 lg:pt-24 lg:pb-52">
          <OfferPill />
          <h1 id="hero-title" className="display mt-8 max-w-[13ch] text-mega text-white">
            {hero.headline.before}
            <Accent>{hero.headline.accent}</Accent>
            {hero.headline.after}
          </h1>
          <p className="mt-7 max-w-xl text-lead text-slate-300">{hero.subcopy}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg" arrow="up-right" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <Audience />
        </div>
      </div>

      <div className="container-site relative z-10 -mt-24 sm:-mt-28 lg:-mt-36">
        <HeroCards />
      </div>

      <ProofStrip />
    </section>
  );
}
