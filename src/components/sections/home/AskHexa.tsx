import { askHexa } from '../../../content/home';
import { Section, SectionHeader } from '../../ui/Section';
import { AskHexaFlow } from '../../graphics/AskHexaFlow';
import { Reveal } from '../../ui/Reveal';

export function AskHexa() {
  return (
    <Section tone="white" id="ask-hexa" labelledBy="askhexa-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeader id="askhexa-title" eyebrow={askHexa.eyebrow} title={askHexa.title} intro={askHexa.body} />
          <p className="mt-8 font-mono text-eyebrow text-muted uppercase">Learners also ask</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {askHexa.prompts.map((p) => (
              <li key={p} className="rounded-full border border-line bg-raised px-3 py-1.5 text-sm text-heading">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <AskHexaFlow />
        </Reveal>
      </div>
    </Section>
  );
}
