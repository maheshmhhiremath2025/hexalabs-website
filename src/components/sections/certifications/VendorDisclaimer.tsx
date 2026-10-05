import { disclaimer } from '../../../content/certifications';
import { Section } from '../../ui/Section';

/** Small print about vendor trademarks, vendor rules and exam results. */
export function VendorDisclaimer() {
  return (
    <Section tone="paper" labelledBy="disclaimer-title" flush className="py-14 lg:py-16">
      <div className="grid grid-cols-12 gap-x-6 gap-y-5">
        <h2 id="disclaimer-title" className="col-span-12 text-lg font-medium tracking-tight lg:col-span-3">
          {disclaimer.title}
        </h2>
        <div className="col-span-12 grid gap-x-10 gap-y-3 text-sm leading-6 text-muted sm:grid-cols-2 lg:col-span-9">
          {disclaimer.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
