import { ArrowRight } from 'lucide-react';
import { batchSteps } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

/**
 * Dark photo band (office tower at blue hour): four numbered white cards; on desktop a
 * small arrow bubble links each card to the next.
 */
export function BatchTimeline() {
  const last = batchSteps.steps.length - 1;
  return (
    <Section tone="dark" image="ph-steps-bg" imageFocus="50% 40%" labelledBy="batch-title">
      <SectionIntro id="batch-title" eyebrow={batchSteps.eyebrow} title={accentTitle(batchSteps.title, batchSteps.accent)} />

      <RevealGroup as="ol" className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {batchSteps.steps.map((step, i) => (
          <RevealItem as="li" key={step.title} className="relative">
            <article className="card card-hover flex h-full flex-col p-6 sm:p-7">
              <p aria-hidden="true" className="display text-[3.25rem] leading-none text-accent tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 text-xl leading-snug font-medium tracking-tight">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-body">{step.body}</p>
              <p className="mt-auto pt-6">
                <span className="chip chip-soft font-mono">{step.detail}</span>
              </p>
            </article>
            {i < last ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-[1.375rem] z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-blue-600 shadow-card lg:grid"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            ) : null}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
