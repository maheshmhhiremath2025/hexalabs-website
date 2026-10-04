import { Check } from 'lucide-react';
import { offerBanner, priceFactors, pricingHero, tiers, type Tier } from '../content/pricing';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { Section } from '../components/ui/Section';

function OfferBanner() {
  return (
    <div
      id="offer"
      className="surface-dark grid gap-6 rounded-card border border-ink-700 bg-ink-950 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div>
        <p className="flex items-center gap-2 font-mono text-eyebrow text-orange-500 uppercase">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {offerBanner.label}
        </p>
        <h2 className="mt-3 text-h3 sm:text-2xl">{offerBanner.title}</h2>
        <p className="mt-2 max-w-xl text-body">{offerBanner.body}</p>
      </div>
      <ButtonLink href={offerBanner.cta.href} variant="secondary">
        {offerBanner.cta.label}
      </ButtonLink>
    </div>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <article
      aria-labelledby={`tier-${tier.id}`}
      className={`flex h-full flex-col rounded-card bg-white p-6 shadow-card sm:p-8 ${
        tier.highlighted ? 'border-2 border-blue-600' : 'border border-line'
      }`}
    >
      <h3 id={`tier-${tier.id}`} className="text-h3">
        {tier.name}
      </h3>
      <p className="mt-2 text-sm text-body lg:min-h-10">{tier.forWho}</p>

      <div className="mt-6 border-y border-line py-5">
        <p className="text-2xl font-semibold tracking-tight text-heading">{tier.price ?? 'Contact for pricing'}</p>
        {tier.price && tier.unit ? <p className="mt-1 font-mono text-micro text-muted">{tier.unit}</p> : null}
      </div>

      {tier.featuresIntro ? <p className="mt-6 text-sm font-medium text-heading">{tier.featuresIntro}</p> : null}
      <ul className={`${tier.featuresIntro ? 'mt-3' : 'mt-6'} flex-1 space-y-3`}>
        {tier.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm text-body">
            <Check className="mt-0.5 h-4 w-4 flex-none text-blue-600" strokeWidth={1.5} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <ButtonLink href={tier.cta.href} variant={tier.highlighted ? 'primary' : 'secondary'} className="mt-8 w-full">
        {tier.cta.label}
        <span className="sr-only"> for {tier.name}</span>
      </ButtonLink>
    </article>
  );
}

export default function Pricing() {
  return (
    <>
      <PageHero eyebrow={pricingHero.eyebrow} title={pricingHero.title} body={pricingHero.body} />

      <Section tone="paper" labelledBy="plans-title" className="pt-14! lg:pt-20!">
        <OfferBanner />

        <h2 id="plans-title" className="sr-only">
          Plans
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <li key={tier.id}>
              <TierCard tier={tier} />
            </li>
          ))}
        </ul>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-28">
          <h2 className="col-span-12 text-h2 lg:col-span-4">{priceFactors.title}</h2>
          <dl className="col-span-12 grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {priceFactors.items.map((item) => (
              <div key={item.term} className="border-t border-line py-6">
                <dt className="font-medium text-heading">{item.term}</dt>
                <dd className="mt-2 text-body">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand
        title="Get a written quote for your batch."
        body="Share the course, number of learners and dates. We’ll come back with a quote and the lab setup we recommend."
        cta={{ label: 'Request a quote', href: '/contact' }}
      />
    </>
  );
}
