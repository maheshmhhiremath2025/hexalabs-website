import { Check } from 'lucide-react';
import { partners } from '../../../content/training';
import { Section, SectionIntro } from '../../ui/Section';
import { ArtCard } from '../../ui/Cards';
import { ButtonLink } from '../../ui/Button';
import { Chip } from '../../ui/Chip';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentText } from './accentText';

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[0.9375rem] leading-6 text-heading">
          <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Dark feature section: white-label and the partner program as two white cards. */
export function Partners() {
  const { whiteLabel, reseller } = partners;
  return (
    <Section tone="dark" image="ph-steps-bg" id="partners" labelledBy="partners-title" className="scroll-mt-20">
      <SectionIntro id="partners-title" eyebrow={partners.eyebrow} title={accentText(partners.title, 'your own name')} />

      <RevealGroup className="mt-12 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
        <RevealItem className="h-full">
          <ArtCard
            image="ph-wl-studio"
            chip="Your brand"
            title={whiteLabel.title}
            body={whiteLabel.body}
            action={
              <ButtonLink href="/contact?item=White-label" variant="dark" arrow="up-right">
                Ask about white-label
              </ButtonLink>
            }
          >
            <Points items={whiteLabel.points} />
          </ArtCard>
        </RevealItem>

        <RevealItem className="h-full">
          <article aria-labelledby="reseller-title" className="card flex h-full flex-col p-6 sm:p-8">
            <p>
              <Chip>Resell</Chip>
            </p>
            <h3 id="reseller-title" className="mt-3 text-xl leading-snug font-medium tracking-tight sm:text-2xl">
              {reseller.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-body sm:text-[0.9375rem]">{reseller.body}</p>
            <Points items={reseller.points} />

            <div className="mt-8 flex-1 rounded-xl bg-raised p-5 sm:p-6">
              <h4 className="eyebrow">{reseller.howToJoin.title}</h4>
              <ol className="mt-5 space-y-4">
                {reseller.howToJoin.steps.map((step, i) => (
                  <li key={step} className="flex gap-3.5 text-sm leading-6 text-body">
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white font-mono text-xs text-heading shadow-card"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6">
              <ButtonLink href={reseller.howToJoin.cta.href} variant="dark" arrow="up-right">
                {reseller.howToJoin.cta.label}
              </ButtonLink>
            </div>
          </article>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
