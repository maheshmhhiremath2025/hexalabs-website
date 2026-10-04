import { voucherSteps } from '../../../content/certifications';
import { Section, SectionHeader } from '../../ui/Section';
import { Reveal } from '../../ui/Reveal';

/**
 * Split layout: header on the left, a numbered timeline on the right,
 * then a per-vendor table of where learners book their exam.
 */
export function VoucherSteps() {
  const { steps, table } = voucherSteps;
  const last = steps.length - 1;
  const c = table.columns;
  return (
    <Section tone="dark" labelledBy="voucher-steps-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <SectionHeader
          id="voucher-steps-title"
          eyebrow={voucherSteps.eyebrow}
          title={voucherSteps.title}
          intro={voucherSteps.intro}
          className="col-span-12 lg:col-span-5"
        />

        <ol className="col-span-12 border-l border-line lg:col-span-6 lg:col-start-7">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute top-1 -left-1.5 h-3 w-3 rounded-full border ${
                  i === last ? 'border-orange-500 bg-orange-500' : 'border-line-strong bg-surface'
                }`}
              />
              <p aria-hidden="true" className="font-mono text-micro text-muted">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-h3">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 max-w-md text-body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="mt-20 lg:mt-24">
        <h3 className="text-h3">{table.title}</h3>

        {/* Phones and tablets: one block per vendor. */}
        <ul className="mt-6 border-b border-line lg:hidden">
          {table.rows.map((r) => (
            <li key={r.vendor} className="border-t border-line py-5">
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
        <table className="mt-6 hidden w-full border-collapse text-left text-sm lg:table">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="font-mono text-micro text-muted uppercase">
              <th scope="col" className="w-1/5 pb-3 font-normal">
                {c.vendor}
              </th>
              <th scope="col" className="w-1/4 pb-3 font-normal">
                {c.provider}
              </th>
              <th scope="col" className="pb-3 font-normal">
                {c.book}
              </th>
              <th scope="col" className="w-1/4 pb-3 font-normal">
                {c.sit}
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => (
              <tr key={r.vendor} className="border-t border-line">
                <th scope="row" className="py-4 pr-6 font-medium text-heading">
                  {r.vendor}
                </th>
                <td className="py-4 pr-6 text-body">{r.provider}</td>
                <td className="py-4 pr-6 text-body">{r.book}</td>
                <td className="py-4 text-body">{r.sit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 lg:mt-0 lg:border-t lg:border-line lg:pt-6">
          <p className="max-w-2xl text-sm text-muted">{table.note}</p>
        </div>
      </Reveal>
    </Section>
  );
}
