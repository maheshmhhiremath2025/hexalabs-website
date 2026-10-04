import { ArrowRight } from 'lucide-react';
import { comparisonSection } from '../../../content/sandboxes';
import { site } from '../../../content/site';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { Reveal } from '../../ui/Reveal';

type Column = (typeof comparisonSection.columns)[number];

function OfferMarker() {
  return (
    <span className="rounded-full bg-blue-600/10 px-2 py-0.5 font-mono text-micro font-normal text-blue-700">
      {site.offer.short}
    </span>
  );
}

function ColumnLink({ column }: { column: Column }) {
  return (
    <SmartLink
      href={column.link.href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-600"
    >
      {column.link.label}
      <span className="sr-only">: {column.name}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
    </SmartLink>
  );
}

/**
 * Sandbox vs lab machine vs official lab.
 * Phones get one stacked block per option; from md up it is a table.
 * Only one version is displayed at a time, so screen readers hear it once.
 */
export function Comparison() {
  const { columns, rows } = comparisonSection;
  return (
    <Section tone="white" labelledBy="compare-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <SectionHeader
          id="compare-title"
          eyebrow={comparisonSection.eyebrow}
          title={comparisonSection.title}
          intro={comparisonSection.intro}
          className="col-span-12 lg:col-span-8"
        />

        <Reveal className="col-span-12">
          {/* Phones: stacked */}
          <ul className="space-y-4 md:hidden">
            {columns.map((c) => (
              <li
                key={c.id}
                className={`rounded-card border border-line p-5 ${c.id === 'sandbox' ? 'border-t-2 border-t-blue-600' : ''}`}
              >
                <h3 className="flex flex-wrap items-center gap-2 text-h3 text-heading">
                  {c.name}
                  {c.offer ? <OfferMarker /> : null}
                </h3>
                <dl className="mt-4 space-y-4 text-sm">
                  {rows.map((r) => (
                    <div key={r.label}>
                      <dt className="font-mono text-micro text-muted uppercase">{r.label}</dt>
                      <dd className="mt-1 text-body">{r.cells[c.id]}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 border-t border-line pt-4">
                  <ColumnLink column={c} />
                </div>
              </li>
            ))}
          </ul>

          {/* md and up: table */}
          <div className="hidden overflow-hidden rounded-card border border-line md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">{comparisonSection.tableCaption}</caption>
              <thead>
                <tr className="bg-paper-50">
                  <th scope="col" className="w-1/5 px-5 py-4 font-mono text-micro font-normal text-muted uppercase">
                    {comparisonSection.rowHeader}
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c.id}
                      scope="col"
                      className={`px-5 py-4 align-bottom text-base font-semibold text-heading ${
                        c.id === 'sandbox' ? 'border-t-2 border-blue-600' : ''
                      }`}
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        {c.name}
                        {c.offer ? <OfferMarker /> : null}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-line">
                    <th scope="row" className="px-5 py-5 align-top font-medium text-heading">
                      {r.label}
                    </th>
                    {columns.map((c) => (
                      <td key={c.id} className="px-5 py-5 align-top text-body">
                        {r.cells[c.id]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <td className="px-5 py-4" />
                  {columns.map((c) => (
                    <td key={c.id} className="px-5 py-4">
                      <ColumnLink column={c} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
