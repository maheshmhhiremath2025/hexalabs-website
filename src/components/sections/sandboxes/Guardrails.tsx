import { CalendarX2, Gauge, KeyRound, SlidersHorizontal, Wallet, type LucideIcon } from 'lucide-react';
import { guardrailsSection } from '../../../content/sandboxes';
import { Section, SectionIntro } from '../../ui/Section';
import { Carousel } from '../../ui/Carousel';
import { withAccent } from './pills';

/** Icons in content order: login, limits, spend, hour caps, expiry. */
const icons: LucideIcon[] = [KeyRound, SlidersHorizontal, Wallet, Gauge, CalendarX2];

/** Dark feature section: the five guardrails as white cards in a carousel. */
export function Guardrails() {
  const { items } = guardrailsSection;
  return (
    <Section tone="dark" image="ph-band-datacenter" labelledBy="guardrails-title" id="guardrails">
      <SectionIntro
        id="guardrails-title"
        eyebrow={guardrailsSection.eyebrow}
        title={withAccent(guardrailsSection.title, 'every sandbox')}
        intro={guardrailsSection.intro}
      />

      <Carousel label={guardrailsSection.eyebrow} className="mt-12 sm:mt-14">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article key={item.term} className="card card-hover flex h-full min-h-[17rem] flex-col p-6 sm:p-8">
              {/* No per-card "NN / 05" index: the carousel's live "1 / N" pager is the only counter. */}
              <span className="icon-bubble h-11 w-11">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-10 text-xl leading-snug font-medium tracking-tight">{item.term}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-6 text-body">{item.body}</p>
            </article>
          );
        })}
      </Carousel>
    </Section>
  );
}
