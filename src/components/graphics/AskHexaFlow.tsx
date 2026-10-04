import { ArrowDown, CalendarClock, Hourglass, LifeBuoy, ListChecks, Server } from 'lucide-react';
import { askHexa } from '../../content/home';
import { site } from '../../content/site';

const checks = [
  { icon: Server, label: 'Machine status' },
  { icon: CalendarClock, label: 'Lab expiry' },
  { icon: Hourglass, label: 'Hours left today' },
];
const icon = { strokeWidth: 1.5, 'aria-hidden': true } as const;

/**
 * How Ask Hexa handles a question, drawn as a flow: question → checks the
 * learner's machine → steps to fix, or hand-off to the platform team.
 * A diagram, deliberately not a picture of the chat window.
 */
export function AskHexaFlow({ className = '' }: { className?: string }) {
  const { chat } = askHexa;
  const { assistant } = site.brand;
  return (
    <figure className={`text-sm ${className}`} aria-label="How Ask Hexa answers a learner question">
      {/* 1. The question */}
      <blockquote className="rounded-card border border-slate-200 bg-paper-50 p-5">
        <p className="font-mono text-micro text-slate-500 uppercase">Learner asks</p>
        <p className="mt-2 text-base font-medium text-ink-950">“{chat.learner}”</p>
      </blockquote>

      <ArrowDown className="mx-auto my-2 h-5 w-5 text-slate-400" {...icon} />

      {/* 2. Hexa checks the machine */}
      <div className="rounded-card border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <img
            src={assistant.src}
            width={assistant.width}
            height={assistant.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-10 w-10 flex-none rounded-full bg-paper-50 object-contain p-0.5 ring-1 ring-slate-200"
          />
          <p className="font-medium text-ink-950">Hexa checks the learner’s machine</p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {checks.map((c) => (
            <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-slate-600">
              <c.icon className="h-3.5 w-3.5 text-blue-600" {...icon} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <ArrowDown className="mx-auto my-2 h-5 w-5 text-slate-400" {...icon} />

      {/* 3. Two outcomes */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-card border border-slate-200 bg-white p-5">
          <p className="flex items-center gap-2 font-medium text-ink-950">
            <ListChecks className="h-4 w-4 text-blue-600" {...icon} />
            Steps to fix it
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600 marker:font-mono marker:text-slate-500">
            {chat.steps.slice(0, 2).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="rounded-card border border-blue-600 bg-white p-5">
          <p className="flex items-center gap-2 font-medium text-ink-950">
            <LifeBuoy className="h-4 w-4 text-blue-600" {...icon} />
            Or hand it over
          </p>
          <p className="mt-3 text-slate-600">One click sends it to the platform team, with the machine details attached.</p>
        </div>
      </div>
    </figure>
  );
}
