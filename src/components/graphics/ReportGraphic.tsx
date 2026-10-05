import { FileText } from 'lucide-react';

const sections = ['Learners and machines', 'Hours used per learner', 'Sessions and activity', 'Completion status'];

/**
 * The files a batch ends with — usage report and completion certificate —
 * drawn as abstract documents. An illustration, not a portal screen.
 */
export function ReportGraphic({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative bg-canvas p-6 sm:p-10 ${className}`}>
      <div className="relative mx-auto max-w-sm">
        {/* back sheet: certificate */}
        <div className="absolute -top-4 -right-4 hidden h-full w-full rotate-(--hero-tilt) rounded-xl bg-white shadow-card sm:block">
          <div className="flex items-center gap-2 p-4 font-mono text-micro text-slate-500">
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
            completion-certificate.pdf
          </div>
        </div>

        {/* front sheet: usage report */}
        <div className="relative rounded-xl bg-white p-6 shadow-card-hover">
          <div className="flex items-center gap-2 font-mono text-micro text-slate-500">
            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
            usage-report.pdf
          </div>
          <div className="mt-5 h-2.5 w-2/3 rounded bg-ink-950/80" />
          <div className="mt-2 h-2 w-1/3 rounded bg-slate-200" />

          <ul className="mt-6 space-y-3">
            {sections.map((s, i) => (
              <li key={s}>
                <p className="text-xs text-slate-600">{s}</p>
                <div className="mt-1.5 flex gap-1">
                  {Array.from({ length: 6 }, (_, j) => (
                    <span
                      key={j}
                      className={`h-1.5 flex-1 rounded-full ${(i + j) % 4 === 0 ? 'bg-slate-200' : 'bg-blue-600/70'}`}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
