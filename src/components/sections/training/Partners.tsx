import { ArrowRight, Check } from 'lucide-react';
import { partners } from '../../../content/training';
import { whiteLabel } from '../../../content/home';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { BrandKit } from '../../graphics/BrandKit';

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-center gap-3 text-white">
          <Check className="h-4 w-4 flex-none text-blue-400" strokeWidth={1.5} aria-hidden="true" />
          {p}
        </li>
      ))}
    </ul>
  );
}

export function Partners() {
  return (
    <Section tone="dark" id="partners" labelledBy="partners-title">
      <SectionHeader id="partners-title" eyebrow={partners.eyebrow} title={partners.title} />

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-6">
        <article className="col-span-12 grid gap-8 rounded-card border border-ink-700 bg-ink-900 p-6 sm:p-8 lg:col-span-7 lg:grid-cols-2">
          <div>
            <h3 className="text-h3">{partners.whiteLabel.title}</h3>
            <p className="mt-3 text-body">{partners.whiteLabel.body}</p>
            <Points items={partners.whiteLabel.points} />
          </div>
          <div className="self-center">
            <BrandKit theme={whiteLabel.themes[0]} />
          </div>
        </article>

        <article className="col-span-12 flex flex-col rounded-card border border-ink-700 bg-ink-900 p-6 sm:p-8 lg:col-span-5">
          <h3 className="text-h3">{partners.reseller.title}</h3>
          <p className="mt-3 text-body">{partners.reseller.body}</p>
          <Points items={partners.reseller.points} />
          <div className="mt-8 border-t border-ink-700 pt-6">
            <h4 className="font-mono text-eyebrow font-normal text-slate-400 uppercase">{partners.reseller.howToJoin.title}</h4>
            <ol className="mt-4 space-y-3">
              {partners.reseller.howToJoin.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-body">
                  <span aria-hidden="true" className="w-5 flex-none font-mono text-micro text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <SmartLink href={partners.reseller.howToJoin.cta.href} className="link mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
              {partners.reseller.howToJoin.cta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </SmartLink>
          </div>
        </article>
      </div>
    </Section>
  );
}
