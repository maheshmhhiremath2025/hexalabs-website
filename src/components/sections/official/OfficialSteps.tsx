import { officialSteps } from '../../../content/officialLabs';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

/** Split layout: header on the left, a vertical numbered timeline on the right. */
export function OfficialSteps() {
  const last = officialSteps.steps.length - 1;
  return (
    <Section tone="white" labelledBy="official-steps-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <SectionHeader
          id="official-steps-title"
          eyebrow={officialSteps.eyebrow}
          title={officialSteps.title}
          intro={officialSteps.intro}
          className="col-span-12 lg:col-span-5"
        />

        <ol className="col-span-12 border-l border-line lg:col-span-6 lg:col-start-7">
          {officialSteps.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute top-1 -left-1.5 h-3 w-3 rounded-full border ${
                  i === last ? 'border-blue-600 bg-blue-600' : 'border-line-strong bg-surface'
                }`}
              />
              <p aria-hidden="true" className="font-mono text-micro text-muted">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-h3">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 max-w-md text-body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
