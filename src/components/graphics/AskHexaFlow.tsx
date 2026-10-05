import { ArrowDown, CalendarClock, Hourglass, LifeBuoy, ListChecks, Server } from 'lucide-react';
import { askHexa } from '../../content/home';
import { site } from '../../content/site';

const checks = [
  { icon: Server, label: 'Machine status' },
  { icon: CalendarClock, label: 'Lab expiry' },
  { icon: Hourglass, label: 'Hours left today' },
];
const icon = { strokeWidth: 1.5, 'aria-hidden': true } as const;

/** Small white bubble with a down arrow between two steps. */
function Connector() {
  return (
    <span aria-hidden="true" className="relative z-10 mx-auto -my-2 grid h-8 w-8 place-items-center rounded-full bg-white text-blue-600 shadow-card">
      <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}

/**
 * How Ask Hexa handles a question, drawn as a flow of white cards: question → checks
 * the learner's machine → steps to fix, or hand-off to the platform team.
 * A diagram, deliberately not a picture of the chat window. Works on canvas, white and art.
 */
export function AskHexaFlow({ className = '' }: { className?: string }) {
  const { chat } = askHexa;
  const { assistant } = site.brand;
  return (
    <figure className={`@container flex flex-col text-sm ${className}`} aria-label="How Ask Hexa answers a learner question">
      {/* 1. The question */}
      <blockquote className="card p-5 sm:p-6">
        <p>
          <span className="chip">Learner asks</span>
        </p>
        <p className="mt-3 text-base leading-snug font-medium text-ink-950">“{chat.learner}”</p>
      </blockquote>

      <Connector />

      {/* 2. Hexa checks the machine */}
      <div className="card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <img
            src={assistant.src}
            width={assistant.width}
            height={assistant.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-10 w-10 flex-none rounded-full bg-canvas object-contain p-0.5"
          />
          <p className="font-medium text-ink-950">Hexa checks the learner’s machine</p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {checks.map((c) => (
            <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5 text-ink-950">
              <c.icon className="h-3.5 w-3.5 text-blue-600" {...icon} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <Connector />

      {/* 3. Two outcomes — side by side only when the flow itself is wide enough */}
      <div className="grid gap-3 @sm:grid-cols-2">
        <div className="card p-5">
          <p className="flex items-center gap-2.5 font-medium text-ink-950">
            <span aria-hidden="true" className="icon-bubble h-8 w-8">
              <ListChecks className="h-4 w-4" strokeWidth={1.5} />
            </span>
            Steps to fix it
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600 marker:font-mono marker:text-slate-500">
            {chat.steps.slice(0, 2).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="card p-5">
          <p className="flex items-center gap-2.5 font-medium text-ink-950">
            <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-blue-600 text-white">
              <LifeBuoy className="h-4 w-4" strokeWidth={1.5} />
            </span>
            Or hand it over
          </p>
          <p className="mt-3 text-slate-600">One click sends it to the platform team, with the machine details attached.</p>
        </div>
      </div>
    </figure>
  );
}
