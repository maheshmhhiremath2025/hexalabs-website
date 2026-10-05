import { Check, Minus, type LucideIcon } from 'lucide-react';
import { officialScope, type ScopeItem } from '../../../content/officialLabs';
import { LinkArrow } from '../../ui/LinkArrow';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';
import { accentWord } from './accentWord';

function ScopeList({ items, icon: Icon, muted }: { items: ScopeItem[]; icon: LucideIcon; muted?: boolean }) {
  return (
    <ul className="mt-6 divide-y divide-line">
      {items.map((item) => (
        <li key={item.text} className="flex gap-4 py-4 first:pt-0 last:pb-0">
          <span
            aria-hidden="true"
            className={`grid h-7 w-7 flex-none place-items-center rounded-full ${
              muted ? 'bg-canvas text-slate-500' : 'bg-blue-600 text-white'
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="pt-0.5 text-body">
            {item.text}
            {item.link && (
              <span className="mt-2 block">
                <LinkArrow href={item.link.href}>{item.link.label}</LinkArrow>
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** What official labs include, and what they don't, as two white cards. */
export function OfficialScope() {
  const { included, excluded } = officialScope;
  return (
    <Section tone="paper" id="included" labelledBy="official-scope-title">
      <SectionIntro
        id="official-scope-title"
        eyebrow={officialScope.eyebrow}
        title={accentWord(officialScope.title, 'Labs')}
        intro={officialScope.intro}
      />

      <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5">
        <RevealItem className="card p-6 sm:p-8">
          <h3 className="text-xl leading-snug font-medium tracking-tight">{included.heading}</h3>
          <ScopeList items={included.items} icon={Check} />
        </RevealItem>
        <RevealItem className="card p-6 sm:p-8">
          <h3 className="text-xl leading-snug font-medium tracking-tight">{excluded.heading}</h3>
          <ScopeList items={excluded.items} icon={Minus} muted />
        </RevealItem>
      </RevealGroup>

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-muted">{officialScope.note}</p>
    </Section>
  );
}
