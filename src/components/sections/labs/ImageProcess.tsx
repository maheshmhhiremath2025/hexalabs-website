import { imageProcess } from '../../../content/labs';
import { AccentHeadline } from '../../ui/Accent';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

/** Split: heading on the left, the four setup steps as a numbered list on the right. */
export function ImageProcess() {
  return (
    <Section tone="white" labelledBy="image-process-title" className="border-t border-line">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <SectionHeader
              id="image-process-title"
              eyebrow={imageProcess.eyebrow}
              title={<AccentHeadline title={imageProcess.title} accentClass="text-blue-600" />}
              intro={imageProcess.intro}
            />
          </div>
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
          {imageProcess.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.05} className="flex gap-6 border-t border-line py-8 last:border-b">
              <span aria-hidden="true" className="w-8 shrink-0 pt-1 font-mono text-eyebrow text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-h3">{step.title}</h3>
                <p className="mt-2 text-body">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
