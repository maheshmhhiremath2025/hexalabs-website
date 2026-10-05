import { Check, Clock3, IndianRupee, Laptop, type LucideIcon } from 'lucide-react';
import { problems } from '../../../content/training';
import { Section, SectionIntro } from '../../ui/Section';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentText } from './accentText';

const icons: LucideIcon[] = [Clock3, Laptop, IndianRupee];

/** Three problem → solution cards: "Today" on top, "With HexaLabs" in a tinted panel below. */
export function ProblemSolution() {
  return (
    <Section tone="paper" labelledBy="problems-title" className="pt-16! sm:pt-20! lg:pt-24!">
      <SectionIntro id="problems-title" eyebrow={problems.eyebrow} title={accentText(problems.title, 'go wrong')} />

      <RevealGroup as="ol" className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
        {problems.rows.map((row, i) => {
          const Icon = icons[i] ?? Clock3;
          return (
            <RevealItem as="li" key={row.label}>
              <article className="card card-hover flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="icon-bubble">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-xl leading-snug font-medium tracking-tight">{row.label}</h3>

                <p className="mt-5 eyebrow">Today</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-body">{row.problem}</p>

                <div className="mt-6 rounded-xl bg-raised p-5">
                  <p className="eyebrow flex items-center gap-2 text-blue-600!">
                    <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    With HexaLabs
                  </p>
                  <p className="mt-2.5 text-[0.9375rem] leading-6 font-medium text-heading">{row.solution}</p>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
