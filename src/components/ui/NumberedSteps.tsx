import { RevealGroup, RevealItem } from './Reveal';

type Step = { title: string; body: string };

/**
 * Numbered white step cards ("01 / 04") that rise in one after another — four-up on
 * wide screens, two-up on tablets, stacked on phones. Used in dark feature sections.
 */
export function NumberedSteps({ steps, className = '' }: { steps: readonly Step[]; className?: string }) {
  const total = String(steps.length).padStart(2, '0');
  return (
    <RevealGroup as="ol" className={`grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 ${className}`}>
      {steps.map((step, i) => (
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
  );
}
