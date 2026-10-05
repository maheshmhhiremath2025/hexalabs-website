import { Cloud, Layers, MonitorSmartphone, type LucideIcon } from 'lucide-react';
import { comparisonSection, type ChoiceId } from '../../../content/sandboxes';
import { site } from '../../../content/site';
import { Section, SectionIntro } from '../../ui/Section';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { Reveal, RevealGroup, RevealItem } from '../../ui/Reveal';
import { withAccent } from './pills';

type Column = (typeof comparisonSection.columns)[number];

const icons: Record<ChoiceId, LucideIcon> = {
  sandbox: Cloud,
  machine: MonitorSmartphone,
  official: Layers,
};

/** Icon + name (+ offer chip). `stacked` puts the icon above the name (table header). */
function ColumnName({ column, stacked = false }: { column: Column; stacked?: boolean }) {
  const Icon = icons[column.id];
  const offer = 'offer' in column && column.offer ? <Chip tone="accent">{site.offer.short}</Chip> : null;
  const bubble = (
    <span className="icon-bubble h-9 w-9">
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
  const name = <span className="text-lg font-medium tracking-tight text-heading">{column.name}</span>;
  if (stacked) {
    return (
      <span className="flex flex-col items-start gap-4">
        {bubble}
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {name}
          {offer}
        </span>
      </span>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {bubble}
      {name}
      {offer}
    </span>
  );
}

function ColumnLink({ column }: { column: Column }) {
  return (
    <LinkArrow href={column.link.href}>
      {column.link.label}
      <span className="sr-only">: {column.name}</span>
    </LinkArrow>
  );
}

/**
 * Sandbox vs lab machine vs official lab.
 * Phones: one white card per option. md and up: a clean table inside one white card.
 * Only one version is displayed at a time, so screen readers hear it once.
 */
export function Comparison() {
  const { columns, rows } = comparisonSection;
  return (
    <Section tone="paper" labelledBy="compare-title">
      <SectionIntro
        id="compare-title"
        eyebrow={comparisonSection.eyebrow}
        title={withAccent(comparisonSection.title, 'lab machine')}
        intro={comparisonSection.intro}
      />

      {/* Phones: stacked cards */}
      <RevealGroup as="ul" className="mt-12 space-y-4 md:hidden">
        {columns.map((c) => (
          <RevealItem as="li" key={c.id} className="card p-6">
            <h3>
              <ColumnName column={c} />
            </h3>
            <dl className="mt-5 space-y-4 text-[0.9375rem] leading-6">
              {rows.map((r) => (
                <div key={r.label} className="border-t border-line pt-4">
                  <dt className="font-mono text-micro text-muted uppercase">{r.label}</dt>
                  <dd className="mt-1.5 text-body">{r.cells[c.id]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <ColumnLink column={c} />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* md and up: table card */}
      <Reveal className="mt-14 hidden md:block">
        <div className="card overflow-hidden">
          <table className="w-full table-fixed border-collapse text-left text-[0.9375rem] leading-6">
            <caption className="sr-only">{comparisonSection.tableCaption}</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[19%] px-6 pt-8 pb-6 align-bottom font-mono text-micro font-normal text-muted uppercase lg:px-8"
                >
                  {comparisonSection.rowHeader}
                </th>
                {columns.map((c) => (
                  <th
                    key={c.id}
                    scope="col"
                    className={`px-6 pt-8 pb-6 align-bottom font-normal lg:px-8 ${c.id === 'sandbox' ? 'bg-blue-600/[0.045]' : ''}`}
                  >
                    <ColumnName column={c} stacked />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="px-6 py-6 align-top text-sm font-medium text-heading lg:px-8">
                    {r.label}
                  </th>
                  {columns.map((c) => (
                    <td key={c.id} className={`px-6 py-6 align-top text-body lg:px-8 ${c.id === 'sandbox' ? 'bg-blue-600/[0.045]' : ''}`}>
                      {r.cells[c.id]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-line">
                <td className="px-6 py-6 lg:px-8" />
                {columns.map((c) => (
                  <td key={c.id} className={`px-6 py-6 lg:px-8 ${c.id === 'sandbox' ? 'bg-blue-600/[0.045]' : ''}`}>
                    <ColumnLink column={c} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
