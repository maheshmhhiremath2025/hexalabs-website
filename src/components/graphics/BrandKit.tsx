import type { CSSProperties } from 'react';
import { Check, Lock } from 'lucide-react';

export type BrandTheme = {
  name: string;
  initials: string;
  domain: string;
  color: string;
  colorFg: string;
  tint: string;
};

const appliesTo = ['Login page', 'Learner portal', 'Learner emails'];

/**
 * A customer's brand kit as HexaLabs applies it: logo, colours, domain.
 * A brand card, deliberately not a picture of the portal.
 */
export function BrandKit({ theme }: { theme: BrandTheme }) {
  const vars = { '--brand': theme.color, '--brand-fg': theme.colorFg, '--brand-tint': theme.tint } as CSSProperties;
  return (
    <figure
      style={vars}
      className="overflow-hidden rounded-card border border-ink-700 bg-ink-900 text-sm"
      aria-label={`Example brand kit for ${theme.name} on ${theme.domain}`}
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-3 bg-(--brand) px-5 py-5 text-(--brand-fg)">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-(--brand-fg) text-sm font-bold text-(--brand)">
            {theme.initials}
          </span>
          <span className="text-base font-semibold">{theme.name}</span>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="font-mono text-micro text-slate-400 uppercase">Colours</p>
            <div className="mt-2 flex gap-2">
              <span className="h-8 w-8 rounded-md bg-(--brand) ring-1 ring-ink-700" />
              <span className="h-8 w-8 rounded-md bg-(--brand-tint) ring-1 ring-ink-700" />
              <span className="h-8 w-8 rounded-md bg-white ring-1 ring-ink-700" />
            </div>
          </div>
          <div>
            <p className="font-mono text-micro text-slate-400 uppercase">Domain</p>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-white">
              <Lock className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />
              {theme.domain}
            </p>
          </div>
          <ul className="flex flex-wrap gap-1.5 border-t border-ink-700 pt-4">
            {appliesTo.map((x) => (
              <li key={x} className="inline-flex items-center gap-1 rounded-full border border-ink-700 px-2.5 py-1 text-xs text-slate-300">
                <Check className="h-3 w-3 text-blue-400" strokeWidth={1.5} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
