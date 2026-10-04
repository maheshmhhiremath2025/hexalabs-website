import { ArrowDown, ArrowRight, CalendarCheck, FlaskConical, Plus, Ticket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pairing, practiceExamples } from '../../../content/certifications';
import { AccentHeadline } from '../../ui/Accent';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { Reveal } from '../../ui/Reveal';

const partIcons: LucideIcon[] = [Ticket, FlaskConical, CalendarCheck];
const connectors: LucideIcon[] = [Plus, ArrowDown];

/** Voucher + practice environment → exam day, then the three HexaLabs environments. */
export function VoucherPairing() {
  const { diagram, destinations } = pairing;
  return (
    <Section tone="paper" labelledBy="pairing-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <SectionHeader
          id="pairing-title"
          eyebrow={pairing.eyebrow}
          title={<AccentHeadline title={pairing.title} accentClass="text-blue-600" />}
          intro={pairing.intro}
          className="col-span-12 lg:col-span-5"
        />

        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
          <figure>
            <figcaption className="font-mono text-eyebrow text-muted uppercase">{diagram.caption}</figcaption>
            <ol className="mt-4">
              {diagram.parts.map((part, i) => {
                const Icon = partIcons[i];
                const Connector = connectors[i];
                return (
                  <li key={part.label}>
                    <div className="flex items-center gap-4 rounded-card border border-line bg-white p-4 sm:p-5">
                      <span
                        aria-hidden="true"
                        className={`grid h-10 w-10 flex-none place-items-center rounded-control ${
                          i === diagram.parts.length - 1 ? 'bg-blue-600 text-white' : 'bg-paper-50 text-slate-600'
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-heading">{part.label}</p>
                        <p className="mt-0.5 text-sm text-body">{part.detail}</p>
                      </div>
                    </div>
                    {Connector ? (
                      <div aria-hidden="true" className="flex justify-center py-2 text-muted">
                        <Connector className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </figure>
        </Reveal>
      </div>

      <ul className="mt-16 border-b border-line lg:mt-20">
        {destinations.map((d) => {
          const examples = practiceExamples(d.kind);
          return (
            <li key={d.kind} className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-6 lg:items-baseline">
              <div className="col-span-12 lg:col-span-5">
                <h3 className="text-h3">{d.name}</h3>
                <p className="mt-1 text-body">{d.body}</p>
              </div>
              <div className="col-span-12 sm:col-span-8 lg:col-span-4">
                <p className="font-mono text-micro text-muted uppercase">{pairing.examplesLabel}</p>
                <p className="mt-1 font-mono text-sm text-heading">{examples.join(' · ')}</p>
              </div>
              <p className="col-span-12 sm:col-span-4 sm:text-right lg:col-span-3">
                <SmartLink href={d.href} className="link group inline-flex items-center gap-1.5 text-sm font-medium">
                  {d.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </SmartLink>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
