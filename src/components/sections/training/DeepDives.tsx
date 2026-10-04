import { Check } from 'lucide-react';
import { deepDives } from '../../../content/training';
import { Eyebrow } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';
import { FleetGraphic } from '../../graphics/FleetGraphic';
import { ReportGraphic } from '../../graphics/ReportGraphic';
import { AskHexaFlow } from '../../graphics/AskHexaFlow';

function Visual({ screen }: { screen: (typeof deepDives)[number]['screen'] }) {
  switch (screen) {
    case 'bulkDeploy':
      return <FleetGraphic tone="light" />;
    case 'usageReport':
      return (
        <div className="overflow-hidden rounded-frame border border-line shadow-card">
          <ReportGraphic />
        </div>
      );
    case 'askHexa':
      return <AskHexaFlow className="mx-auto max-w-lg" />;
  }
}

/** Feature deep-dives, alternating text and visual sides. */
export function DeepDives() {
  return (
    <section aria-label="Features" className="surface-paper">
      {deepDives.map((d, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={d.id} id={d.id} className={`py-20 lg:py-28 ${i > 0 ? 'border-t border-line' : ''}`}>
            <div className="container-site grid grid-cols-12 items-center gap-x-6 gap-y-12">
              <div className={`col-span-12 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <Eyebrow index={String(i + 1).padStart(2, '0')}>{d.eyebrow}</Eyebrow>
                <h2 className="mt-5 text-h2">{d.title}</h2>
                <p className="mt-5 text-lead text-body">{d.body}</p>
                <ul className="mt-8 space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3 text-heading">
                      <Check className="mt-1 h-4 w-4 flex-none text-blue-600" strokeWidth={1.5} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Reveal className={`col-span-12 lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1 lg:pr-6' : 'lg:pl-6'}`}>
                <Visual screen={d.screen} />
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
