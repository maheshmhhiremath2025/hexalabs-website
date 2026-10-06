import { Check } from 'lucide-react';
import { lmsHome } from '../../../content/lms';
import { Art } from '../../ui/Art';
import { ButtonLink } from '../../ui/Button';
import { Reveal } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';
import { accentTitle } from './accentTitle';

/** Home: introduces HexaLabs LMS — text and checklist left, the LMS illustration right. */
export function LmsBand() {
  return (
    <Section tone="paper" labelledBy="lms-home-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionIntro
            id="lms-home-title"
            align="left"
            eyebrow={lmsHome.eyebrow}
            title={accentTitle(lmsHome.title, lmsHome.accent)}
            intro={lmsHome.body}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {lmsHome.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-6 text-heading">
                <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={lmsHome.primary.href} variant="dark" arrow="up-right">
              {lmsHome.primary.label}
            </ButtonLink>
            <ButtonLink href={lmsHome.secondary.href} variant="secondary">
              {lmsHome.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <Reveal className="col-span-12 lg:col-span-7">
          <figure className="group overflow-hidden rounded-[20px] shadow-card sm:rounded-panel">
            <div className="art-zoom">
              <Art name="il-lms-hero" sizes="(min-width: 1024px) 58vw, 100vw" className="block" imgClassName="block h-auto w-full" />
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
