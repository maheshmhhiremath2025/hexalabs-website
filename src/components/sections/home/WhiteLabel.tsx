import { Check } from 'lucide-react';
import { whiteLabel } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Art } from '../../ui/Art';
import { BrandKit } from '../../graphics/BrandKit';
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal';
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

        {/* Artwork with the two example brand kits overlapping its lower part */}
        <div className="col-span-12 lg:order-1 lg:col-span-7">
          <Reveal>
            <div className="overflow-hidden rounded-[20px]">
              <Art name="white-label" sizes="(min-width: 1024px) 660px, 100vw" className="aspect-[3/2]" />
            </div>
          </Reveal>
          <RevealGroup className="relative mx-3 -mt-16 grid gap-4 sm:mx-6 sm:-mt-28 sm:grid-cols-2 lg:gap-5">
            {whiteLabel.themes.map((theme, i) => (
              <RevealItem key={theme.name} className={i === 1 ? 'sm:mt-10' : ''}>
                <BrandKit theme={theme} />
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-6 text-sm text-muted sm:mx-6">{whiteLabel.caption}</p>
        </div>
      </div>
    </Section>
  );
}
