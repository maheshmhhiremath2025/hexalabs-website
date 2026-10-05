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
      className="card overflow-hidden text-sm"
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
            <p className="eyebrow">Colours</p>
            <div className="mt-2 flex gap-2">
              <span className="h-8 w-8 rounded-md bg-(--brand) ring-1 ring-slate-200" />
              <span className="h-8 w-8 rounded-md bg-(--brand-tint) ring-1 ring-slate-200" />
              <span className="h-8 w-8 rounded-md bg-white ring-1 ring-slate-250" />
            </div>
          </div>
          <div>
            <p className="eyebrow">Domain</p>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-ink-950">
              <Lock className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.5} />
              {theme.domain}
            </p>
          </div>
          <ul className="flex flex-wrap gap-1.5 border-t border-slate-200 pt-4">
            {appliesTo.map((x) => (
              <li key={x} className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-xs text-ink-950">
                <Check className="h-3 w-3 text-blue-600" strokeWidth={1.5} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
