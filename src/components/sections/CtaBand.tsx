import { finalCta } from '../../content/home';
import { site } from '../../content/site';
import { ButtonLink } from '../ui/Button';

type Props = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
};

/** Closing dark band used at the bottom of most pages. */
export function CtaBand({ title = finalCta.title, body = finalCta.body, cta = finalCta.cta }: Props) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark relative overflow-hidden border-t border-ink-700 bg-ink-900">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-site relative grid grid-cols-12 items-end gap-x-6 gap-y-8 py-20 lg:py-24">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="cta-title" className="text-h1">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-body">{body}</p>
        </div>
        <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:justify-end">
          <ButtonLink href={cta.href} size="lg">
            {cta.label}
          </ButtonLink>
          <a href={site.loginUrl} className="link text-sm">
            Existing customer? Log in
          </a>
        </div>
      </div>
    </section>
  );
}
