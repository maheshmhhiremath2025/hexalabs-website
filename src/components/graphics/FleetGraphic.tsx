import type { ReactNode } from 'react';
import { Globe, Monitor, UserRound } from 'lucide-react';

type Props = {
  tone?: 'dark' | 'light';
  /** Adds data-anchor hooks used by the hero callouts. */
  anchors?: boolean;
  className?: string;
};

const icon = { strokeWidth: 1.5, 'aria-hidden': true } as const;

/**
 * Infographic of a batch: 1 trainer → 30 identical machines → 30 browser tabs.
 * Pictograms and numbers only — deliberately nothing that looks like an app screen.
 */
export function FleetGraphic({ tone = 'dark', anchors = false, className = '' }: Props) {
  const dark = tone === 'dark';
  const card = dark ? 'border-ink-700 bg-ink-900/60' : 'border-slate-200 bg-white';
  const heading = dark ? 'text-white' : 'text-ink-950';
  const muted = dark ? 'text-slate-400' : 'text-slate-500';
  const glyph = dark ? 'text-blue-400' : 'text-blue-600';
  const line = dark ? 'bg-ink-600' : 'bg-slate-200';
  const ring = dark ? 'border-ink-600' : 'border-slate-200';
  const a = (id?: string) => (anchors && id ? { 'data-anchor': id } : {});

  const connector = (label: string) => (
    <div className="flex items-center gap-3 py-3 pl-6">
      <span className={`h-8 w-px ${line}`} />
      <span className={`font-mono text-micro uppercase ${muted}`}>{label}</span>
    </div>
  );

  const node = (n: string, title: string, sub: string, visual: ReactNode, anchor?: string) => (
    <div className="flex items-start gap-4">
      <span {...a(anchor)} className={`grid h-12 w-12 flex-none place-items-center rounded-full border font-mono text-sm ${ring} ${heading}`}>
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <p className={`font-medium ${heading}`}>{title}</p>
        <p className={`text-sm ${muted}`}>{sub}</p>
        {visual}
      </div>
    </div>
  );

  return (
    <div aria-hidden="true" className={`rounded-frame border p-6 sm:p-8 ${card} ${className}`}>
      {node('1', 'Trainer', 'One action starts the whole batch', <UserRound className={`mt-3 h-7 w-7 ${glyph}`} {...icon} />, 'bulk')}
      {connector('deploys')}
      {node(
        '30',
        'Identical lab machines',
        'Cloned from one image, ready before class',
        <div {...a('status')} className="mt-3 grid w-fit grid-cols-10 gap-1.5">
          {Array.from({ length: 30 }, (_, i) => (
            <Monitor key={i} className={`h-4 w-4 ${glyph}`} {...icon} />
          ))}
        </div>,
      )}
      {connector('opens in')}
      {node('30', 'Learners, one browser tab each', 'No install, no VPN, HTTPS only', <Globe className={`mt-3 h-7 w-7 ${glyph}`} {...icon} />, 'open')}
    </div>
  );
}
