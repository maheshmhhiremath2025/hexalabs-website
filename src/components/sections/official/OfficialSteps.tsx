import { officialSteps } from '../../../content/officialLabs';
import { NumberedSteps } from '../../ui/NumberedSteps';
import { Section, SectionIntro } from '../../ui/Section';
import { accentWord } from './accentWord';

/** Dark feature section: the four steps of a batch as numbered white cards. */
export function OfficialSteps() {
  return (
    <Section tone="dark" glow id="how-it-works" labelledBy="official-steps-title">
      <SectionIntro
        id="official-steps-title"
        eyebrow={officialSteps.eyebrow}
        title={accentWord(officialSteps.title, 'batch')}
        intro={officialSteps.intro}
      />
      <NumberedSteps steps={officialSteps.steps} className="mt-12 sm:mt-14" />
    </Section>
  );
}
