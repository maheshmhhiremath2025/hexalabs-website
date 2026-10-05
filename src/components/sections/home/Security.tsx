import { Building2, Gauge, KeyRound, Lock, Power, ScrollText, ShieldCheck, type LucideIcon } from 'lucide-react';
import { security } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { Art } from '../../ui/Art';
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

/** One icon per control, in content order. */
const icons: LucideIcon[] = [KeyRound, Building2, Power, Lock, ScrollText, Gauge];

/**
 * Editorial split: a tall photo (engineer at a locked server cabinet) with a small
 * white note overlapping it, and the six controls as a two-column list beside it.
 */
export function Security() {
  return (
    <Section tone="paper" labelledBy="security-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12 lg:gap-x-12">
        <Reveal className="col-span-12 lg:col-span-5">
          <figure className="group relative">
            <div aria-hidden="true" className="art-zoom aspect-[4/3] overflow-hidden rounded-[20px] sm:rounded-panel lg:aspect-[4/5]">
              <Art name="ph-security" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full" position="45% 50%" />
            </div>
            <figcaption className="card absolute right-3 bottom-3 left-3 flex items-center gap-3.5 p-4 sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5">
              <span className="icon-bubble">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="text-sm leading-5 text-body">
                <span className="block font-medium text-heading">Same controls on every lab</span>
                Windows, Linux, Kubernetes and cloud sandboxes.
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="col-span-12 lg:col-span-7">
          <SectionIntro
            id="security-title"
            align="left"
            eyebrow={security.eyebrow}
            title={accentTitle(security.title, security.accent)}
            intro={security.intro}
          />
          <RevealGroup as="ul" className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {security.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <RevealItem as="li" key={item.term} className="flex gap-4">
                  <span className="icon-bubble">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug font-medium tracking-tight">{item.term}</h3>
                    <p className="mt-1 text-sm leading-6 text-body">{item.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
