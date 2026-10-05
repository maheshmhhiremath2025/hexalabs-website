import { ArrowRight, CalendarCheck, FlaskConical, Plus, Ticket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pairing, practiceExamples, type PracticeKind } from '../../../content/certifications';
import { AccentHeadline } from '../../ui/Accent';
import { ArtCard } from '../../ui/Cards';
import { Chip } from '../../ui/Chip';
import type { ProductId } from '../../../content/products';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

const partIcons: LucideIcon[] = [Ticket, FlaskConical, CalendarCheck];
const connectors: LucideIcon[] = [Plus, ArrowRight];
/** Official logos of a few platforms in each practice environment (same sets as the home catalogue). */
const destinationLogos: Record<PracticeKind, ProductId[]> = {
  official: ['azure', 'aws'],
  sandbox: ['gcp', 'oci', 'databricks'],
  machine: ['windows-server', 'ubuntu', 'kubernetes'],
};

/** Voucher + practice environment → exam day, then the three HexaLabs environments as cards with official logos. */
export function VoucherPairing() {
  const { diagram, destinations } = pairing;
  const last = diagram.parts.length - 1;
  return (
    <Section tone="white" id="practice" labelledBy="pairing-title">
      <SectionIntro
        id="pairing-title"
        eyebrow={pairing.eyebrow}
        title={<AccentHeadline title={pairing.title} />}
        intro={pairing.intro}
      />

      <figure className="mx-auto mt-14 max-w-5xl">
        <figcaption className="eyebrow text-center">{diagram.caption}</figcaption>
        <RevealGroup as="ol" className="mt-5 flex flex-col items-stretch md:flex-row md:items-center">
          {diagram.parts.map((part, i) => {
            const Icon = partIcons[i];
            const Connector = connectors[i];
            return (
              <RevealItem as="li" key={part.label} className="flex flex-col items-center md:flex-1 md:flex-row">
                <div className="flex w-full flex-1 items-center gap-4 rounded-card bg-canvas p-4 sm:p-5">
                  <span
                    aria-hidden="true"
                    className={
                      i === last
                        ? 'grid h-10 w-10 flex-none place-items-center rounded-full bg-blue-600 text-white shadow-btn-blue'
                        : 'icon-bubble'
                    }
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-heading">{part.label}</p>
                    <p className="mt-0.5 text-sm text-body">{part.detail}</p>
                  </div>
                </div>
                {Connector ? (
                  <span
                    aria-hidden="true"
                    className="my-2 grid h-8 w-8 flex-none rotate-90 place-items-center rounded-full bg-white text-heading shadow-card md:mx-[-0.5rem] md:my-0 md:rotate-0 relative z-10"
                  >
                    <Connector className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                ) : null}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </figure>

      <RevealGroup as="ul" className="mt-16 grid gap-y-10 gap-x-5 md:grid-cols-3 lg:mt-20">
        {destinations.map((d) => {
          const examples = practiceExamples(d.kind);
          return (
            <RevealItem as="li" key={d.kind}>
              <ArtCard
                logos={destinationLogos[d.kind]}
                title={d.name}
                body={d.body}
                href={d.href}
                linkLabel={d.linkLabel}
              >
                {examples.length ? (
                  <div className="mt-5">
                    <p className="font-mono text-micro text-muted uppercase">{pairing.examplesLabel}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {examples.map((code) => (
                        <li key={code}>
                          <Chip tone="soft" className="font-mono">
                            {code}
                          </Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </ArtCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
