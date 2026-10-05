import { officialCta, officialHero, officialVendors } from '../content/officialLabs';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { OfficialHeroCards } from '../components/sections/official/OfficialHeroAside';
import { VendorCourses } from '../components/sections/official/VendorCourses';
import { OfficialSteps } from '../components/sections/official/OfficialSteps';
import { OfficialScope } from '../components/sections/official/OfficialScope';
import { ButtonLink } from '../components/ui/Button';

/**
 * Section rhythm: inset dark hero with overlapping offer + vendor cards →
 * Azure courses (canvas) → AWS courses (white) → steps carousel (dark) →
 * what's included (canvas) → closing band.
 */
export default function OfficialLabs() {
  const { actions } = officialHero;
  return (
    <>
      <PageHero
        eyebrow={officialHero.eyebrow}
        title={officialHero.title}
        body={officialHero.body}
        art="dark-silk"
        actions={
          <>
            <ButtonLink href={actions.primary.href} size="lg" arrow="up-right">
              {actions.primary.label}
            </ButtonLink>
            <ButtonLink href={actions.secondary.href} variant="ghost" size="lg">
              {actions.secondary.label}
            </ButtonLink>
          </>
        }
        overlap={<OfficialHeroCards />}
      />
      <VendorCourses vendor={officialVendors.azure} tone="paper" />
      <VendorCourses vendor={officialVendors.aws} tone="white" />
      <OfficialSteps />
      <OfficialScope />
      <CtaBand
        title={officialCta.title}
        body={officialCta.body}
        cta={officialCta.cta}
        art="training"
        chip="Official labs"
      />
    </>
  );
}
