import { ArrowRight } from 'lucide-react';
import type { Lab } from '../../../content/labs';
import { requestLink } from '../../../content/requestTypes';
import { SmartLink } from '../../ui/SmartLink';

export function LabCard({ lab }: { lab: Lab }) {
  return (
    <article className="card-lift group relative flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
      <span className="font-mono text-micro text-muted uppercase">{lab.platform}</span>

      <h3 className="mt-4 text-h3">{lab.title}</h3>
      <p className="mt-1 text-sm font-medium text-heading">{lab.typicalUse}</p>
      <p className="mt-3 text-sm text-body">{lab.summary}</p>

      <div className="mt-5 flex-1">
        <p className="font-mono text-micro text-muted uppercase">Example access</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {lab.durations.map((d) => (
            <li key={d} className="rounded-md border border-line px-2 py-1 text-xs text-heading">
              {d}
            </li>
          ))}
        </ul>
      </div>

      <SmartLink
        href={requestLink(lab.requestType, lab.title)}
        className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-blue-600 after:absolute after:inset-0 after:rounded-card after:content-['']"
      >
        Request this lab<span className="sr-only">: {lab.title}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
      </SmartLink>
    </article>
  );
}
