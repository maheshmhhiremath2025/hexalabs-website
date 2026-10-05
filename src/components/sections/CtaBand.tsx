import { finalCta } from '../../content/home';
import { site } from '../../content/site';
import { Art, type ArtName } from '../ui/Art';
import { ButtonLink } from '../ui/Button';
import { Chip } from '../ui/Chip';

type Props = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
  /** Small label above the heading. */
  chip?: string;
  /** Photo behind the band. */
  image?: ArtName;
  /** CSS object-position for the photo's focal point. */
  imageFocus?: string;
};

/**
 * Closing banner used at the bottom of most pages: an inset, rounded photo panel
 * (slow drift, navy wash) with a centred heading, line and actions.
 */
export function CtaBand({
  title = finalCta.title,
  body = finalCta.body,
  cta = finalCta.cta,
  chip = 'Get started',
  image = 'ph-cta',
  imageFocus = '50% 40%',
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="surface-paper px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="surface-dark relative overflow-hidden rounded-[20px] sm:rounded-panel">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="art-drift absolute inset-0">
            <Art name={image} sizes="100vw" className="h-full w-full" position={imageFocus} />
          </div>
          <div className="cta-wash absolute inset-0" />
        </div>
        <div className="container-site relative flex flex-col items-center py-24 text-center lg:py-32">
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
      </div>
    </section>
  );
}
