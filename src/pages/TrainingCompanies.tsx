import { FileText, MessageCircleQuestion, Palette, SlidersHorizontal, type LucideIcon } from 'lucide-react';
import { deepDives, partners, trainingHero } from '../content/training';
import { PageHero } from '../components/sections/PageHero';
import { ProblemSolution } from '../components/sections/training/ProblemSolution';
import { DeepDives } from '../components/sections/training/DeepDives';
import { Partners } from '../components/sections/training/Partners';
import { Faq } from '../components/sections/training/Faq';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { IconCard } from '../components/ui/Cards';

const jumpIcons: Record<string, LucideIcon> = {
  console: SlidersHorizontal,
  reports: FileText,
  support: MessageCircleQuestion,
  partners: Palette,
};

/** The four cards over the hero's bottom edge jump to the feature sections below. */
const jumps = [
  ...deepDives.map((d) => ({ id: d.id, title: d.eyebrow, line: d.title })),
  { id: 'partners', title: partners.eyebrow, line: partners.title },
];

export default function TrainingCompanies() {
  return (
    <>
      <PageHero
        eyebrow={trainingHero.eyebrow}
        title={trainingHero.title}
        body={trainingHero.body}
        logos={['azure', 'aws', 'gcp', 'windows-server', 'ubuntu', 'kubernetes']}
        logosLabel="Platforms your courses can run on"
        actions={
          <>
            <ButtonLink href={trainingHero.primaryCta.href} size="lg" arrow="up-right" className="w-full sm:w-auto">
              {trainingHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={trainingHero.secondaryCta.href} variant="ghost" size="lg" className="w-full sm:w-auto">
              {trainingHero.secondaryCta.label}
            </ButtonLink>
          </>
        }
        overlap={
          <ul aria-label="On this page" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {jumps.map((j, i) => (
              <li key={j.id} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
                <IconCard
                  icon={jumpIcons[j.id]}
                  title={j.title}
                  body={j.line}
                  href={`/for-training-companies#${j.id}`}
                  as="h2"
                  compact
                />
              </li>
            ))}
          </ul>
        }
      />
      <ProblemSolution />
      <DeepDives />
      <Partners />
      <Faq />
      <CtaBand />
    </>
  );
}
