import { imageProcess } from '../../../content/labs';
import { AccentHeadline } from '../../ui/Accent';
import { NumberedSteps } from '../../ui/NumberedSteps';
import { Section, SectionIntro } from '../../ui/Section';

/** Dark feature section: the four setup steps as numbered white cards that rise in one after another. */
export function ImageProcess() {
  return (
    <Section tone="dark" image="ph-uc-windows" labelledBy="image-process-title">
      <SectionIntro
        id="image-process-title"
        eyebrow={imageProcess.eyebrow}
        title={<AccentHeadline title={imageProcess.title} />}
        intro={imageProcess.intro}
      />
      <NumberedSteps steps={imageProcess.steps} className="mt-12 sm:mt-14" />
    </Section>
  );
}
