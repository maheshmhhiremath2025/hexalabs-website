import { Check } from 'lucide-react';
import { whiteLabel } from '../../../content/home';
import { Section, Eyebrow } from '../../ui/Section';
import { BrandKit } from '../../graphics/BrandKit';
import { Reveal } from '../../ui/Reveal';

export function WhiteLabel() {
  return (
    <Section tone="dark" labelledBy="whitelabel-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow>{whiteLabel.eyebrow}</Eyebrow>
          <h2 id="whitelabel-title" className="mt-5 text-h2">
            {whiteLabel.title}
          </h2>
          <p className="mt-5 text-lead text-body">{whiteLabel.body}</p>
          <ul className="mt-8 space-y-3">
            {whiteLabel.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white">
                <Check className="h-4 w-4 text-blue-400" strokeWidth={1.5} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            {whiteLabel.themes.map((theme, i) => (
              <Reveal key={theme.name} delay={i * 0.1} className={i === 1 ? 'sm:mt-12' : ''}>
                <BrandKit theme={theme} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-body">{whiteLabel.caption}</p>
        </div>
      </div>
    </Section>
  );
}
