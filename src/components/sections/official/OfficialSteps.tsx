import { officialSteps } from '../../../content/officialLabs';
import type { ArtName } from '../../ui/Art';
import { ArtCard } from '../../ui/Cards';
import { Carousel } from '../../ui/Carousel';
import { Section, SectionIntro } from '../../ui/Section';
import { accentWord } from './accentWord';

/** Artwork for each step card, in step order (each light artwork once per page). */
const stepArt: ArtName[] = ['honeycomb', 'lab-machines', 'white-label', 'security'];

/** "Step 01" label used on step cards. */
export const stepLabel = (i: number) => `Step ${String(i + 1).padStart(2, '0')}`;

/** Dark feature section: the four steps of a batch as an art-card carousel. */
export function OfficialSteps() {
  return (
    <Section tone="dark" glow id="how-it-works" labelledBy="official-steps-title">
      <SectionIntro
        id="official-steps-title"
        eyebrow={officialSteps.eyebrow}
        title={accentWord(officialSteps.title, 'batch')}
        intro={officialSteps.intro}
      />
      <Carousel label="How a batch runs" className="mt-14">
        {officialSteps.steps.map((step, i) => (
          <ArtCard
            key={step.title}
            art={stepArt[i % stepArt.length]}
            chip={stepLabel(i)}
            title={step.title}
            body={step.body}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 86vw"
          />
        ))}
      </Carousel>
    </Section>
  );
}
