import type { SandboxMockRow } from '../../../content/sandboxes';

type Props = {
  title: string;
  rows: SandboxMockRow[];
  className?: string;
};

/**
 * Small spec card: a sandbox's guardrails as label/value pairs.
 * Plain typography on purpose — not a picture of the portal.
 */
export function SandboxMock({ title, rows, className = '' }: Props) {
  return (
    <div className={`surface-dark rounded-card border border-ink-700 bg-ink-900 p-5 ${className}`}>
      <p className="font-mono text-eyebrow text-slate-400 uppercase">{title}</p>
      <dl className="mt-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 border-t border-ink-700 py-2.5 text-sm">
            <dt className="text-slate-300">{r.label}</dt>
            <dd className="text-right font-medium text-white">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
