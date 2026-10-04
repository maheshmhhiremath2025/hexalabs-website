import { Check } from 'lucide-react';
import { trainers } from '../../../content/home';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';
import { DayTimeline } from '../../graphics/DayTimeline';

export function TrainersSplit() {
  return (
    <Section tone="paper" labelledBy="trainers-title">
      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeader id="trainers-title" eyebrow={trainers.eyebrow} title={trainers.title} intro={trainers.body} />
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {trainers.checklist.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium text-heading">{item.title}</p>
                  <p className="mt-1 text-sm text-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="col-span-12 lg:col-span-7 lg:pt-10 xl:pl-6">
          <DayTimeline />
        </Reveal>
      </div>
    </Section>
  );
}
