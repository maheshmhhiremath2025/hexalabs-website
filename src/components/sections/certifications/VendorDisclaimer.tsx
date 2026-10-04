import { disclaimer } from '../../../content/certifications';
import { Section } from '../../ui/Section';

/** Small print about vendor trademarks, vendor rules and exam results. */
export function VendorDisclaimer() {
  return (
    <Section tone="paper" labelledBy="disclaimer-title" flush className="border-t border-line py-12 lg:py-16">
      <div className="grid grid-cols-12 gap-x-6 gap-y-4">
        <h2 id="disclaimer-title" className="col-span-12 text-base lg:col-span-3">
          {disclaimer.title}
        </h2>
        <div className="col-span-12 space-y-3 text-sm text-muted lg:col-span-8 lg:col-start-5">
          {disclaimer.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
