import { askHexa } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { AskHexaFlow } from '../../graphics/AskHexaFlow';
import { Reveal } from '../../ui/Reveal';
import { PhotoStage } from '../../ui/PhotoStage';
import { accentTitle } from './accentTitle';

export function AskHexa() {
  return (
    <Section tone="white" id="ask-hexa" labelledBy="askhexa-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-5">
          <SectionIntro
            id="askhexa-title"
            align="left"
            eyebrow={askHexa.eyebrow}
            title={accentTitle(askHexa.title, askHexa.accent)}
            intro={askHexa.body}
          />
          <p id="askhexa-prompts" className="eyebrow mt-9">
            Learners also ask
          </p>
          <ul aria-labelledby="askhexa-prompts" className="mt-3 flex flex-wrap gap-2">
            {askHexa.prompts.map((p) => (
              <li key={p} className="rounded-full bg-raised px-3.5 py-1.5 text-sm text-heading">
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* The assistant conversation over a photo of the support team */}
        <Reveal className="col-span-12 lg:col-span-7">
          <PhotoStage image="ph-support" focus="50% 25%">
            <div className="mx-auto max-w-xl">
              <AskHexaFlow />
            </div>
          </PhotoStage>
        </Reveal>
      </div>
    </Section>
  );
}
