import { CalendarRange, Check, Clock3, Cpu, KeyRound, Tag, type LucideIcon } from 'lucide-react';
import { offerBanner, priceFactors, pricingHero, tiers, type Tier } from '../content/pricing';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { Section, SectionIntro } from '../components/ui/Section';
import { Accent } from '../components/ui/Accent';
import { Chip } from '../components/ui/Chip';
import { Art } from '../components/ui/Art';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import { accentText } from '../components/sections/training/accentText';

/** Current offer as one white card overlapping the hero's bottom edge. */
function OfferCard() {
  return (
    <div id="offer" className="rise-in scroll-mt-28" style={{ ['--d' as string]: '200ms' }}>
      <article
        aria-labelledby="offer-title"
        className="card grid items-center gap-5 p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:gap-8 lg:px-9"
      >
        <span className="icon-bubble hidden h-14 w-14 sm:grid">
          <Tag className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div>
          <p>
            <Chip tone="accent">{offerBanner.label}</Chip>
          </p>
          <h2 id="offer-title" className="mt-3 text-xl leading-snug font-medium tracking-tight sm:text-2xl">
            {offerBanner.title}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-body sm:text-[0.9375rem]">{offerBanner.body}</p>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <ButtonLink href={offerBanner.cta.href} variant="dark" arrow="up-right" className="w-full sm:w-auto">
            {offerBanner.cta.label}
          </ButtonLink>
        </div>
      </article>
    </div>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const featured = Boolean(tier.highlighted);
  return (
    <article
      aria-labelledby={`tier-${tier.id}`}
      className={`card-hover relative flex h-full flex-col overflow-hidden rounded-card p-6 sm:p-8 ${
        featured ? 'surface-dark shadow-float ring-1 ring-blue-400/30' : 'card'
      }`}
    >
      {featured ? <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" /> : null}
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 id={`tier-${tier.id}`} className="text-2xl font-medium tracking-tight">
            {tier.name}
          </h3>
          {featured ? <Chip tone="light">Recommended</Chip> : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-body lg:min-h-12">{tier.forWho}</p>

        <div className="mt-6 border-y border-line py-5">
          <p className="display text-[1.75rem] leading-tight text-heading">{tier.price ?? 'Contact for pricing'}</p>
          <p className="mt-1.5 font-mono text-micro text-muted uppercase">
            {tier.price && tier.unit ? tier.unit : 'Written quote per batch'}
          </p>
        </div>

        {tier.featuresIntro ? <p className="mt-6 text-sm font-medium text-heading">{tier.featuresIntro}</p> : null}
        <ul className={`${tier.featuresIntro ? 'mt-3' : 'mt-6'} flex-1 space-y-3`}>
          {tier.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-6 text-body">
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${
                  featured ? 'bg-blue-400/15 text-blue-400' : 'bg-canvas text-blue-600'
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <ButtonLink href={tier.cta.href} variant={featured ? 'primary' : 'dark'} arrow="up-right" className="mt-8 w-full">
          {tier.cta.label}
          <span className="sr-only"> for {tier.name}</span>
        </ButtonLink>
      </div>
    </article>
  );
}

const factorIcons: LucideIcon[] = [Cpu, Clock3, CalendarRange, KeyRound];

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow={pricingHero.eyebrow}
        title={pricingHero.title}
        body={pricingHero.body}
        aside={
          // The lab-quote illustration, shown whole beside the headline.
          <figure className="group overflow-hidden rounded-[16px] shadow-card ring-1 ring-white/10 sm:rounded-[20px]">
            <div className="art-zoom">
              <Art
                name="il-pricing-hero"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="block"
                imgClassName="block h-auto w-full"
              />
            </div>
          </figure>
        }
        overlap={<OfferCard />}
      />

      <Section tone="paper" labelledBy="plans-title" className="pt-16! sm:pt-20! lg:pt-24!">
        <SectionIntro
          id="plans-title"
          eyebrow="Plans"
          title={
            <>
              From a first pilot to <Accent>your own brand</Accent>.
            </>
          }
          intro="Every plan is quoted in writing for your course, machine size and batch length."
        />
        <RevealGroup as="ul" className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {tiers.map((tier) => (
            <RevealItem as="li" key={tier.id} className="h-full">
              <TierCard tier={tier} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="white" labelledBy="factors-title">
        <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionIntro id="factors-title" eyebrow="How we quote" title={accentText(priceFactors.title, 'the price')} align="left" />
          </div>
          <RevealGroup as="ul" className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-5">
            {priceFactors.items.map((item, i) => {
              const Icon = factorIcons[i] ?? Cpu;
              return (
                <RevealItem as="li" key={item.term} className="h-full">
                  <div className="h-full rounded-card bg-raised p-6 sm:p-7">
                    <span className="icon-bubble">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium tracking-tight">{item.term}</h3>
                    <p className="mt-2 text-sm leading-6 text-body">{item.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand
        title="Get a written quote for your batch."
        body="Share the course, number of learners and dates. We’ll come back with a quote and the lab setup we recommend."
        cta={{ label: 'Request a quote', href: '/contact' }}
        chip="Pricing"
      />
    </>
  );
}
