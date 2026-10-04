import { ArrowRight } from 'lucide-react';
import { problems } from '../../../content/training';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

export function ProblemSolution() {
  return (
    <Section tone="white" labelledBy="problems-title">
      <SectionHeader id="problems-title" eyebrow={problems.eyebrow} title={problems.title} />

      <div className="mt-14 hidden grid-cols-12 gap-x-6 pb-3 font-mono text-eyebrow text-muted uppercase lg:grid">
        <span className="col-span-3">Where it hurts</span>
        <span className="col-span-4">Today</span>
        <span className="col-span-5 pl-10">With HexaLabs</span>
      </div>

      <ol className="mt-10 border-b border-line lg:mt-0">
        {problems.rows.map((row, i) => (
          <Reveal as="li" key={row.label} delay={i * 0.06} className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line py-8 lg:py-10">
            <h3 className="col-span-12 flex items-baseline gap-3 text-h3 lg:col-span-3">
              <span aria-hidden="true" className="font-mono text-micro text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              {row.label}
            </h3>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <p className="font-mono text-micro text-muted uppercase lg:sr-only">Today</p>
              <p className="mt-1 text-body lg:mt-0">{row.problem}</p>
            </div>
            <div className="col-span-12 flex gap-4 sm:col-span-6 lg:col-span-5">
              <ArrowRight className="mt-1 hidden h-5 w-5 flex-none text-blue-600 lg:block" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="font-mono text-micro text-muted uppercase lg:sr-only">With HexaLabs</p>
                <p className="mt-1 font-medium text-heading lg:mt-0">{row.solution}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
