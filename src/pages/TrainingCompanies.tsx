import { trainingHero } from '../content/training';
import { PageHero } from '../components/sections/PageHero';
import { ProblemSolution } from '../components/sections/training/ProblemSolution';
import { DeepDives } from '../components/sections/training/DeepDives';
import { Partners } from '../components/sections/training/Partners';
import { Faq } from '../components/sections/training/Faq';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';

export default function TrainingCompanies() {
  return (
    <>
      <PageHero
        eyebrow={trainingHero.eyebrow}
        title={trainingHero.title}
        body={trainingHero.body}
        actions={
          <>
            <ButtonLink href={trainingHero.primaryCta.href} size="lg">
              {trainingHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={trainingHero.secondaryCta.href} variant="secondary" size="lg">
              {trainingHero.secondaryCta.label}
            </ButtonLink>
          </>
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
