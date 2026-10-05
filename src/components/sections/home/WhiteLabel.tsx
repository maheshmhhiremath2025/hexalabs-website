import { Check } from 'lucide-react';
import { whiteLabel } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Art } from '../../ui/Art';
import { Reveal } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

export function WhiteLabel() {
  return (
    <Section tone="paper" labelledBy="whitelabel-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:order-2 lg:col-span-5">
          <SectionIntro
            id="whitelabel-title"
            align="left"
            eyebrow={whiteLabel.eyebrow}
            title={accentTitle(whiteLabel.title, whiteLabel.accent)}
            intro={whiteLabel.body}
          />
          <ul className="mt-8 space-y-3">
            {whiteLabel.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-heading">
                <span aria-hidden="true" className="grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <ButtonLink href={whiteLabel.action.href} variant="dark" arrow="up-right">
              {whiteLabel.action.label}
            </ButtonLink>
          </div>
        </div>

        {/* The white-label illustration, shown whole (3:2, no crop) */}
        <Reveal className="col-span-12 lg:order-1 lg:col-span-7">
          <figure className="group overflow-hidden rounded-[20px] shadow-card sm:rounded-panel">
            <div className="art-zoom">
              <Art
                name="il-whitelabel"
                alt={whiteLabel.imageAlt}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="block"
                imgClassName="block h-auto w-full"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
