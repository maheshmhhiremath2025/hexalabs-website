import { CalendarClock, KeyRound, SlidersHorizontal, Wallet, type LucideIcon } from 'lucide-react';
import { sandboxesHero } from '../../../content/sandboxes';

const icons: LucideIcon[] = [KeyRound, SlidersHorizontal, Wallet, CalendarClock];

/**
 * "Every sandbox" — four white fact cards that overlap the bottom edge of the hero.
 * Plain label / value text (not a picture of the portal). They rise in on first paint.
 */
export function SandboxFacts() {
  const { title, rows } = sandboxesHero.card;
  return (
    <div>
      <h2 className="sr-only">{title}</h2>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {rows.map((r, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={r.label} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
              <div className="card flex h-full flex-col p-4 sm:p-6">
                <span className="icon-bubble h-9 w-9 sm:h-10 sm:w-10">
                  <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-4 font-mono text-micro text-muted uppercase sm:mt-6 sm:text-eyebrow">{r.label}</p>
                <p className="mt-1.5 text-base leading-snug font-medium tracking-tight text-heading sm:text-lg">{r.value}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
