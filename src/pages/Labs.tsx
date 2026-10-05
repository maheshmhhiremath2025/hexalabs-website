import { labsCta, labsHero } from '../content/labs';
import { PageHero } from '../components/sections/PageHero';
import { ButtonLink } from '../components/ui/Button';
import { LabCatalogue } from '../components/sections/labs/LabCatalogue';
import { LabTypeCards } from '../components/sections/labs/LabTypeCards';
import { ImageProcess } from '../components/sections/labs/ImageProcess';
import { OtherLabPages } from '../components/sections/labs/OtherLabPages';
import { CtaBand } from '../components/sections/CtaBand';

/**
 * Rhythm: inset dark hero (+ lab-type cards overlapping) → paper catalogue →
 * dark "how a batch is set up" → white links to the other lab pages → dark CTA band.
 */
export default function Labs() {
  return (
    <>
      <PageHero
        eyebrow={labsHero.eyebrow}
        title={labsHero.title}
        body={labsHero.body}
        logos={['windows-server', 'ubuntu', 'rhel', 'kubernetes']}
        logosLabel="Lab machine platforms"
        actions={
          <>
            <ButtonLink href="/labs#catalogue" size="lg" arrow="right">
              Browse lab machines
            </ButtonLink>
            <ButtonLink href={labsCta.cta.href} variant="ghost" size="lg" arrow="up-right">
              {labsCta.cta.label}
            </ButtonLink>
          </>
        }
        overlap={<LabTypeCards />}
      />
      <LabCatalogue />
      <ImageProcess />
      <OtherLabPages />
      <CtaBand title={labsCta.title} body={labsCta.body} cta={labsCta.cta} chip={labsHero.eyebrow} />
    </>
  );
}
