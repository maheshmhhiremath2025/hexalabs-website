import { CalendarPlus, Hourglass, Play, Power, ScrollText, UserCog, type LucideIcon } from 'lucide-react';
import { trainers } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';
import { PhotoStage } from '../../ui/PhotoStage';
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

        {/* The lab-day timeline over a photo of a trainer with the class */}
        <Reveal className="col-span-12 lg:col-span-6">
          <PhotoStage image="ph-trainer" focus="60% 25%">
            <DayTimeline />
          </PhotoStage>
        </Reveal>
      </div>
    </Section>
  );
}
