import { Check } from 'lucide-react';
import { whiteLabel } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { BrandKit } from '../../graphics/BrandKit';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { PhotoStage } from '../../ui/PhotoStage';
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

        {/* The two example brand kits over a photo of a brand team at work */}
        <div className="col-span-12 lg:order-1 lg:col-span-7">
          <PhotoStage image="ph-wl-studio" focus="50% 30%">
            <RevealGroup className="grid gap-4 sm:grid-cols-2 sm:pb-4 lg:gap-5">
              {whiteLabel.themes.map((theme, i) => (
                <RevealItem key={theme.name} className={i === 1 ? 'sm:mt-10' : ''}>
                  <BrandKit theme={theme} />
                </RevealItem>
              ))}
            </RevealGroup>
          </PhotoStage>
          <p className="mt-6 text-sm text-muted sm:mx-6">{whiteLabel.caption}</p>
        </div>
      </div>
    </Section>
  );
}
