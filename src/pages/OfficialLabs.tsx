import { officialCta, officialHero, officialVendors } from '../content/officialLabs';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { OfficialHeroAside } from '../components/sections/official/OfficialHeroAside';
import { VendorCourses } from '../components/sections/official/VendorCourses';
import { OfficialSteps } from '../components/sections/official/OfficialSteps';
import { OfficialScope } from '../components/sections/official/OfficialScope';
import { ButtonLink } from '../components/ui/Button';

export default function OfficialLabs() {
  const { actions } = officialHero;
  return (
    <>
      <PageHero
        eyebrow={officialHero.eyebrow}
        title={officialHero.title}
        body={officialHero.body}
        actions={
          <>
            <ButtonLink href={actions.primary.href} size="lg">
              {actions.primary.label}
            </ButtonLink>
            <ButtonLink href={actions.secondary.href} variant="secondary" size="lg">
              {actions.secondary.label}
            </ButtonLink>
          </>
        }
        aside={<OfficialHeroAside />}
      />
      <VendorCourses vendor={officialVendors.azure} tone="paper" />
      <VendorCourses vendor={officialVendors.aws} tone="dark" />
      <OfficialSteps />
      <OfficialScope />
      <CtaBand title={officialCta.title} body={officialCta.body} cta={officialCta.cta} />
    </>
  );
}
