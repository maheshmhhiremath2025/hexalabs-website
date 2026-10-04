import { CalendarPlus, Hourglass, LogIn, LogOut, PlayCircle, Power } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Event = { time: string; title: string; detail: string; icon: LucideIcon; accent?: boolean };

const events: Event[] = [
  { time: '09:30', title: 'Batch started', detail: 'Trainer starts all 30 machines before class', icon: PlayCircle, accent: true },
  { time: '11:53', title: 'Session started', detail: 'learner02 opens their lab in a browser tab', icon: LogIn },
  { time: '13:05', title: 'Session ended', detail: 'learner02 · 1h 12m', icon: LogOut },
  { time: '15:20', title: 'Expiry extended', detail: '+3 days for 6 learners who fell behind', icon: CalendarPlus },
  { time: '16:58', title: 'Idle auto-stop', detail: 'No activity for 30 minutes, machine stopped', icon: Power },
  { time: '17:42', title: 'Daily limit reached', detail: 'learner05 used 4h of 4h, machine stopped', icon: Hourglass },
];

/**
 * A lab day told as a timeline of the events HexaLabs records.
 * An illustration with sample data, not a portal screen.
 */
export function DayTimeline({ className = '' }: { className?: string }) {
  return (
    <figure className={`rounded-card border border-slate-200 bg-white p-6 shadow-card sm:p-8 ${className}`}>
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-eyebrow text-slate-500 uppercase">One lab day, as recorded</span>
        <span className="font-mono text-micro text-slate-500">Sample data</span>
      </figcaption>
      <ol className="relative mt-6">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5.25rem] w-px bg-slate-200 sm:left-[5.75rem]" />
        {events.map((e) => (
          <li key={e.time} className="relative flex gap-4 py-3 sm:gap-6">
            <span className="w-14 flex-none pt-0.5 text-right font-mono text-xs text-slate-500">{e.time}</span>
            <span
              aria-hidden="true"
              className={`relative z-10 grid h-6 w-6 flex-none place-items-center rounded-full ring-4 ring-white ${
                e.accent ? 'bg-blue-600 text-white' : 'bg-paper-50 text-slate-600'
              }`}
            >
              <e.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink-950">{e.title}</p>
              <p className="mt-0.5 text-sm text-slate-600">{e.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
