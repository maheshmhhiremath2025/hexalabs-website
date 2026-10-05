import { Check } from 'lucide-react';
import { deepDives } from '../../../content/training';
import type { ReactNode } from 'react';
import { AskHexaFlow } from '../../graphics/AskHexaFlow';
import { DayTimeline } from '../../graphics/DayTimeline';
import { ReportGraphic } from '../../graphics/ReportGraphic';
import { Chip } from '../../ui/Chip';
import { Reveal } from '../../ui/Reveal';
import { accentText } from './accentText';

/** Product illustration and the accent phrase for each deep dive. */
const look: Record<(typeof deepDives)[number]['id'], { visual: ReactNode; accent: string }> = {
  console: { visual: <DayTimeline />, accent: 'whole batch' },
  reports: { visual: <ReportGraphic className="bg-transparent!" />, accent: 'did the work' },
  support: { visual: <AskHexaFlow className="mx-auto max-w-xl" />, accent: 'support queue' },
};

/** Feature deep-dives on white: text and a product illustration on a soft stage, alternating sides. */
export function DeepDives() {
  return (
    <section aria-label="Features" className="surface-white py-20 sm:py-24 lg:py-28">
      <div className="container-site space-y-20 sm:space-y-24 lg:space-y-32">
        {deepDives.map((d, i) => {
          const flip = i % 2 === 1;
          const { visual, accent } = look[d.id];
          return (
            <article
              key={d.id}
              id={d.id}
              aria-labelledby={`${d.id}-title`}
              className="grid scroll-mt-28 grid-cols-12 items-center gap-x-6 gap-y-10"
            >
              <div className={`col-span-12 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <p className="eyebrow flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {d.eyebrow}
                </p>
                <h2 id={`${d.id}-title`} className="mt-4 text-h2">
                  {accentText(d.title, accent)}
                </h2>
                <p className="mt-5 text-lead text-body">{d.body}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.9375rem] leading-6 text-heading">
                      <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-canvas text-blue-600">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <Reveal className={`col-span-12 lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1 lg:pr-4' : 'lg:pl-4'}`}>
                <figure aria-hidden="true" className="ui-stage rounded-[20px] p-3 sm:p-8">
                  <p className="mb-4 sm:mb-6">
                    <Chip className="font-mono">
                      {String(i + 1).padStart(2, '0')} · {d.eyebrow}
                    </Chip>
                  </p>
                  {visual}
                </figure>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
