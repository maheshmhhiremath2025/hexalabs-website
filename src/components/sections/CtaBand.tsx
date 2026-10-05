import { finalCta } from '../../content/home';
import { site } from '../../content/site';
import { ButtonLink } from '../ui/Button';
import { Art, type ArtName } from '../ui/Art';
import { Chip } from '../ui/Chip';
import { Reveal } from '../ui/Reveal';

type Props = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
  /** Artwork in the rounded frame on the right. Default 'training'. */
  art?: ArtName;
  /** Small label above the heading. */
  chip?: string;
};

/** Closing dark band used at the bottom of most pages: text left, framed artwork right. */
export function CtaBand({
  title = finalCta.title,
  body = finalCta.body,
  cta = finalCta.cta,
  art = 'training',
  chip = 'Get started',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" />
      <div className="container-site relative grid grid-cols-12 items-center gap-x-6 gap-y-12 py-20 lg:py-24">
        <div className="col-span-12 lg:col-span-6">
          <p>
            <Chip tone="light">{chip}</Chip>
          </p>
          <h2 id="cta-title" className="display mt-5 text-h1">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lead text-body">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={cta.href} variant="light" size="lg" arrow="up-right">
              {cta.label}
            </ButtonLink>
            <a href={site.loginUrl} className="link-underline text-sm">
              Existing customer? Log in
            </a>
          </div>
        </div>
        <Reveal className="col-span-12 lg:col-span-6">
          <div className="group art-zoom overflow-hidden rounded-[20px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
            <Art name={art} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[3/2]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
