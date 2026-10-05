import { certCta, certHero } from '../content/certifications';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { HeroVendors } from '../components/sections/certifications/HeroVendors';
import { ExamFinder } from '../components/sections/certifications/ExamFinder';
import { BookingTable, VoucherSteps } from '../components/sections/certifications/VoucherSteps';
import { VoucherPairing } from '../components/sections/certifications/VoucherPairing';
import { VendorDisclaimer } from '../components/sections/certifications/VendorDisclaimer';

/**
 * Section rhythm: inset dark hero with the vendor panel overlapping it →
 * exam finder (canvas) → voucher steps carousel (dark) → where learners book
 * (canvas) → vouchers + practice labs (white) → small print (canvas) → closing band.
 */
export default function Certifications() {
  return (
    <>
      <PageHero
        eyebrow={certHero.eyebrow}
        title={certHero.title}
        body={certHero.body}
        art="dark-spiral"
        feature="certifications"
        actions={
          <>
            <ButtonLink href={certHero.primaryCta.href} size="lg" arrow="up-right">
              {certHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={certHero.secondaryCta.href} variant="ghost" size="lg">
              {certHero.secondaryCta.label}
            </ButtonLink>
          </>
        }
        overlap={<HeroVendors />}
      />
      <ExamFinder />
      <VoucherSteps />
      <BookingTable />
      <VoucherPairing />
      <VendorDisclaimer />
      <CtaBand title={certCta.title} body={certCta.body} cta={certCta.cta} art="training" chip="Certifications" />
    </>
  );
}
