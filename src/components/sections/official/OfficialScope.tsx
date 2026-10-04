import { ArrowRight, Check, Minus, type LucideIcon } from 'lucide-react';
import { officialScope, type ScopeItem } from '../../../content/officialLabs';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';

function ScopeList({ items, icon: Icon, iconClass }: { items: ScopeItem[]; icon: LucideIcon; iconClass: string }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3 text-body">
          <Icon className={`mt-1 h-4 w-4 flex-none ${iconClass}`} strokeWidth={1.5} aria-hidden="true" />
          <span>
            {item.text}
            {item.link && (
              <span className="mt-1 block">
                <SmartLink href={item.link.href} className="link inline-flex items-center gap-1 font-medium">
                  {item.link.label}
                  <ArrowRight className="h-4 w-4 flex-none" strokeWidth={1.5} aria-hidden="true" />
                </SmartLink>
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** What official labs include, and what they don't, side by side. */
export function OfficialScope() {
  const { included, excluded } = officialScope;
  return (
    <Section tone="paper" labelledBy="official-scope-title" className="border-t border-line">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <SectionHeader
          id="official-scope-title"
          eyebrow={officialScope.eyebrow}
          title={officialScope.title}
          intro={officialScope.intro}
          className="col-span-12 lg:col-span-4"
        />

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="grid overflow-hidden rounded-card border border-line bg-white shadow-card sm:grid-cols-2">
            <div className="p-6 sm:p-8">
              <h3 className="text-h3">{included.heading}</h3>
              <ScopeList items={included.items} icon={Check} iconClass="text-blue-600" />
            </div>
            <div className="border-t border-line bg-paper-50 p-6 sm:border-t-0 sm:border-l sm:p-8">
              <h3 className="text-h3">{excluded.heading}</h3>
              <ScopeList items={excluded.items} icon={Minus} iconClass="text-muted" />
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm text-muted">{officialScope.note}</p>
        </div>
      </div>
    </Section>
  );
}
