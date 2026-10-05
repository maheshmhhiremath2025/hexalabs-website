import { voucherSteps } from '../../../content/certifications';
import { NumberedSteps } from '../../ui/NumberedSteps';
import { Reveal } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';
import { accentWord } from '../official/accentWord';

/** Dark feature section: the four voucher steps as numbered white cards. */
export function VoucherSteps() {
  return (
    <Section tone="dark" image="ph-uc-certifications" imageFocus="50% 30%" id="how-it-works" labelledBy="voucher-steps-title">
      <SectionIntro
        id="voucher-steps-title"
        eyebrow={voucherSteps.eyebrow}
        title={accentWord(voucherSteps.title, 'vouchers')}
        intro={voucherSteps.intro}
      />
      <NumberedSteps steps={voucherSteps.steps} className="mt-12 sm:mt-14" />
    </Section>
  );
}

/** Where learners book each vendor's exam: a white card with a table (blocks on phones). */
export function BookingTable() {
  const { table } = voucherSteps;
  const c = table.columns;
  return (
    <Section tone="paper" id="booking" labelledBy="booking-title">
      <SectionIntro id="booking-title" eyebrow="Exam day" title={accentWord(table.title, 'book')} />

      <Reveal className="mx-auto mt-12 max-w-5xl">
        <div className="card overflow-hidden">
          {/* Phones and tablets: one block per vendor. */}
          <ul className="divide-y divide-line lg:hidden">
            {table.rows.map((r) => (
              <li key={r.vendor} className="px-5 py-5 sm:px-7">
                <p className="font-medium text-heading">{r.vendor}</p>
                <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3 sm:gap-6">
                  <div>
                    <dt className="font-mono text-micro text-muted uppercase">{c.provider}</dt>
                    <dd className="mt-1 text-body">{r.provider}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-micro text-muted uppercase">{c.book}</dt>
                    <dd className="mt-1 text-body">{r.book}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-micro text-muted uppercase">{c.sit}</dt>
                    <dd className="mt-1 text-body">{r.sit}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          {/* Wide screens: table. Only one version is displayed at a time. */}
          <table className="hidden w-full border-collapse text-left text-sm lg:table">
            <caption className="sr-only">{table.caption}</caption>
            <thead>
              <tr className="bg-paper-50 font-mono text-micro text-muted uppercase">
                <th scope="col" className="w-1/5 px-7 py-3.5 font-normal">
                  {c.vendor}
                </th>
                <th scope="col" className="w-1/4 py-3.5 pr-6 font-normal">
                  {c.provider}
                </th>
                <th scope="col" className="py-3.5 pr-6 font-normal">
                  {c.book}
                </th>
                <th scope="col" className="w-1/4 py-3.5 pr-7 font-normal">
                  {c.sit}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {table.rows.map((r) => (
                <tr key={r.vendor} className="transition-colors duration-300 hover:bg-canvas/60">
                  <th scope="row" className="px-7 py-4 font-medium text-heading">
                    {r.vendor}
                  </th>
                  <td className="py-4 pr-6 text-body">{r.provider}</td>
                  <td className="py-4 pr-6 text-body">{r.book}</td>
                  <td className="py-4 pr-7 text-body">{r.sit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">{table.note}</p>
      </Reveal>
    </Section>
  );
}
