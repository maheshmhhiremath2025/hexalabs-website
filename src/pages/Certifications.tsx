import { certCta, certHero } from '../content/certifications';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { HeroVendors } from '../components/sections/certifications/HeroVendors';
import { ExamFinder } from '../components/sections/certifications/ExamFinder';
import { VoucherSteps } from '../components/sections/certifications/VoucherSteps';
import { VoucherPairing } from '../components/sections/certifications/VoucherPairing';
import { VendorDisclaimer } from '../components/sections/certifications/VendorDisclaimer';

export default function Certifications() {
  return (
    <>
      <PageHero
        eyebrow={certHero.eyebrow}
        title={certHero.title}
        body={certHero.body}
        actions={
          <>
            <ButtonLink href={certHero.primaryCta.href} size="lg">
              {certHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={certHero.secondaryCta.href} variant="secondary" size="lg">
              {certHero.secondaryCta.label}
            </ButtonLink>
          </>
        }
        aside={<HeroVendors />}
      />
      <ExamFinder />
      <VoucherSteps />
      <VoucherPairing />
      <VendorDisclaimer />
      <CtaBand title={certCta.title} body={certCta.body} cta={certCta.cta} />
    </>
  );
}
