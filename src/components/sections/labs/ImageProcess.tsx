import { imageProcess } from '../../../content/labs';
import { AccentHeadline } from '../../ui/Accent';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

/** Dark feature section: the four setup steps as numbered white cards that rise in one after another. */
export function ImageProcess() {
  const total = String(imageProcess.steps.length).padStart(2, '0');
  return (
    <Section tone="dark" glow labelledBy="image-process-title">
      <SectionIntro
        id="image-process-title"
        eyebrow={imageProcess.eyebrow}
        title={<AccentHeadline title={imageProcess.title} />}
        intro={imageProcess.intro}
      />

      <RevealGroup as="ol" className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {imageProcess.steps.map((step, i) => (
          <RevealItem as="li" key={step.title}>
            <article className="card card-hover flex h-full flex-col p-6 sm:p-7">
              {/* The <ol> already numbers the steps for screen readers. */}
              <div aria-hidden="true" className="flex items-baseline justify-between">
                <span className="text-accent text-[2.5rem] leading-none font-light tracking-[-0.04em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-micro text-muted">/ {total}</span>
              </div>
              <h3 className="mt-10 text-xl leading-snug font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-6 text-body">{step.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
