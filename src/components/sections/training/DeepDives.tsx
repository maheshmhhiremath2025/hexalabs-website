import { Check } from 'lucide-react';
import { deepDives } from '../../../content/training';
import { Art, type ArtName } from '../../ui/Art';
import { Chip } from '../../ui/Chip';
import { Reveal } from '../../ui/Reveal';
import { accentText } from './accentText';

/** Artwork and the accent phrase for each deep dive. */
const look: Record<(typeof deepDives)[number]['id'], { art: ArtName; accent: string }> = {
  console: { art: 'honeycomb', accent: 'whole batch' },
  reports: { art: 'certifications', accent: 'did the work' },
  support: { art: 'ask-hexa', accent: 'support queue' },
};

/** Feature deep-dives on white: text and a framed artwork, alternating sides. */
export function DeepDives() {
  return (
    <section aria-label="Features" className="surface-white py-20 sm:py-24 lg:py-28">
      <div className="container-site space-y-20 sm:space-y-24 lg:space-y-32">
        {deepDives.map((d, i) => {
          const flip = i % 2 === 1;
          const { art, accent } = look[d.id];
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
                <figure aria-hidden="true" className="group relative">
                  <div className="art-zoom overflow-hidden rounded-[20px] shadow-card">
                    <Art name={art} sizes="(min-width: 1024px) 640px, 100vw" className="aspect-[3/2]" />
                  </div>
                  <div className={`absolute bottom-4 sm:bottom-6 ${flip ? 'right-4 sm:right-6' : 'left-4 sm:left-6'}`}>
                    <Chip className="font-mono">
                      {String(i + 1).padStart(2, '0')} · {d.eyebrow}
                    </Chip>
                  </div>
                </figure>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
