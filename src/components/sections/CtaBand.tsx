import { finalCta } from '../../content/home';
import { site } from '../../content/site';
import { ButtonLink } from '../ui/Button';
import { Chip } from '../ui/Chip';

type Props = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
  /** Small label above the heading. */
  chip?: string;
};

/** Closing dark band used at the bottom of most pages: centred heading, line and actions (no artwork). */
export function CtaBand({
  title = finalCta.title,
  body = finalCta.body,
  cta = finalCta.cta,
  chip = 'Get started',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" />
      <div className="container-site relative flex flex-col items-center py-20 text-center lg:py-24">
        <p>
          <Chip tone="light">{chip}</Chip>
        </p>
        <h2 id="cta-title" className="display mt-5 max-w-3xl text-h1">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-lead text-body">{body}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <ButtonLink href={cta.href} variant="light" size="lg" arrow="up-right">
            {cta.label}
          </ButtonLink>
          <a href={site.loginUrl} className="link-underline text-sm">
            Existing customer? Log in
          </a>
        </div>
      </div>
    </section>
  );
}
