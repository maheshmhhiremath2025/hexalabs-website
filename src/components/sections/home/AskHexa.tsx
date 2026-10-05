import { askHexa } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { Art } from '../../ui/Art';
import { AskHexaFlow } from '../../graphics/AskHexaFlow';
import { Reveal } from '../../ui/Reveal';
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

        {/* The flow floats over the artwork: the sphere shows on the left (on top on phones). */}
        <Reveal className="col-span-12 lg:col-span-7">
          <div className="relative overflow-hidden rounded-[24px] bg-canvas">
            {/* Phones: art band on top. sm+: art fills the left half and fades into the panel colour. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-60 [mask-image:linear-gradient(180deg,black_60%,transparent)] sm:inset-y-0 sm:right-auto sm:h-auto sm:w-1/2 sm:[mask-image:linear-gradient(90deg,black_65%,transparent)]"
            >
              <Art
                name="ask-hexa"
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover object-[47%_50%]"
              />
            </div>
            <div className="relative px-3 pt-44 pb-3 sm:ml-auto sm:w-[62%] sm:p-6 sm:pl-0 lg:py-8 lg:pr-8">
              <AskHexaFlow />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
