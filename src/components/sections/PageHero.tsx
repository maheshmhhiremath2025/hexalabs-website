import type { ReactNode } from 'react';
import { AccentHeadline, type AccentTitle } from '../ui/Accent';
import { Eyebrow } from '../ui/Section';

type Props = {
  eyebrow: string;
  title: AccentTitle;
  body: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

/** Left-aligned dark hero for inner pages. */
export function PageHero({ eyebrow, title, body, actions, aside }: Props) {
  return (
    <section aria-labelledby="page-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-site relative grid grid-cols-12 items-end gap-x-6 gap-y-10 pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
        <div className="col-span-12 lg:col-span-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="page-title" className="mt-6 text-h1">
            <AccentHeadline title={title} accentClass="text-blue-400" />
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-body">{body}</p>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="col-span-12 lg:col-span-4">{aside}</div> : null}
      </div>
    </section>
  );
}
