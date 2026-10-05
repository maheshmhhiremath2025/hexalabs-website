import { CalendarPlus, Hourglass, Play, Power, ScrollText, UserCog, type LucideIcon } from 'lucide-react';
import { trainers } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { Art } from '../../ui/Art';
import { Reveal } from '../../ui/Reveal';
import { DayTimeline } from '../../graphics/DayTimeline';
import { accentTitle } from './accentTitle';

/** One icon per checklist item, in content order. */
const icons: LucideIcon[] = [Play, CalendarPlus, Hourglass, Power, UserCog, ScrollText];

export function TrainersSplit() {
  return (
    <Section tone="white" labelledBy="trainers-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-6">
          <SectionIntro
            id="trainers-title"
            align="left"
            eyebrow={trainers.eyebrow}
            title={accentTitle(trainers.title, trainers.accent)}
            intro={trainers.body}
          />
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {trainers.checklist.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="flex gap-3.5">
                  <span className="icon-bubble h-9 w-9">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium text-heading">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-body">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Artwork with the lab-day card overlapping its lower part */}
        <Reveal className="col-span-12 lg:col-span-6">
          <div className="overflow-hidden rounded-[20px]">
            <Art name="honeycomb" sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[3/2]" />
          </div>
          <DayTimeline className="relative mx-3 -mt-20 sm:mx-8 sm:-mt-32" />
        </Reveal>
      </div>
    </Section>
  );
}
