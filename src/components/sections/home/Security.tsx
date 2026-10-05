import { Building2, Gauge, KeyRound, Lock, Power, ScrollText, type LucideIcon } from 'lucide-react';
import { security } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

/** One icon per control, in content order. */
const icons: LucideIcon[] = [KeyRound, Building2, Power, Lock, ScrollText, Gauge];

export function Security() {
  return (
    <Section tone="paper" labelledBy="security-title">
      <SectionIntro
        id="security-title"
        eyebrow={security.eyebrow}
        title={accentTitle(security.title, security.accent)}
        intro={security.intro}
      />

      <div className="mt-14 lg:mt-16">
        <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {security.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={item.term} className="card flex gap-4 p-5 sm:p-6">
                <span className="icon-bubble">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg leading-snug font-medium tracking-tight">{item.term}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-body">{item.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
