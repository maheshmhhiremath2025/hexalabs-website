import { batchSteps } from '../../../content/home';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

export function BatchTimeline() {
  const last = batchSteps.steps.length - 1;
  return (
    <Section tone="white" labelledBy="batch-title">
      <SectionHeader id="batch-title" eyebrow={batchSteps.eyebrow} title={batchSteps.title} />

      <ol className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {/* Connecting line: vertical on phones, horizontal on desktop */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-4 w-px bg-line lg:top-4 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
        />
        {batchSteps.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.08} className="relative pl-14 lg:pl-0">
            <span
              aria-hidden="true"
              className={`absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full border font-mono text-micro lg:relative ${
                i === last
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-line-strong bg-surface text-heading'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-h3 lg:mt-7">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-xs text-body">{step.body}</p>
            <p className="mt-5 inline-flex rounded-md border border-line bg-raised px-2.5 py-1 font-mono text-micro text-heading">
              {step.detail}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
