import { guardrailsSection } from '../../../content/sandboxes';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

/** Numbered definition list: term on the left, explanation on the right. */
export function Guardrails() {
  return (
    <Section tone="dark" labelledBy="guardrails-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionHeader
            id="guardrails-title"
            eyebrow={guardrailsSection.eyebrow}
            title={guardrailsSection.title}
            intro={guardrailsSection.intro}
            className="lg:sticky lg:top-24"
          />
        </div>

        <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
          <dl className="border-b border-line">
            {guardrailsSection.items.map((item, i) => (
              <div key={item.term} className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-line py-7">
                <dt className="col-span-12 flex items-baseline gap-3 sm:col-span-5">
                  <span aria-hidden="true" className="w-6 flex-none font-mono text-micro text-blue-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-medium text-heading">{item.term}</span>
                </dt>
                <dd className="col-span-12 pl-9 text-body sm:col-span-7 sm:pl-0">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
