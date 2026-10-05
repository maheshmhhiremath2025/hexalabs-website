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
  /** Photo behind the band (photo layout). */
  image?: ArtName;
  /** CSS object-position for the photo's focal point. */
  imageFocus?: string;
  /**
   * A bright illustration shown whole beside the text (split layout) instead of a
   * photo behind it — e.g. `il-cta-batch` for the default "Running a batch next week?".
   */
  illustration?: ArtName;
};

type TextProps = { title: string; body: string; cta: { label: string; href: string }; chip: string; centered: boolean };

/** Chip, heading, line and the two actions — shared by both layouts. */
function CtaText({ title, body, cta, chip, centered }: TextProps) {
  return (
    <>
      <p>
        <Chip tone="light">{chip}</Chip>
      </p>
      <h2 id="cta-title" className={`display mt-5 text-h1 ${centered ? 'max-w-3xl' : ''}`}>
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-lead text-body">{body}</p>
      <div className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 ${centered ? 'justify-center' : ''}`}>
        <ButtonLink href={cta.href} variant="light" size="lg" arrow="up-right">
          {cta.label}
        </ButtonLink>
        <a href={site.loginUrl} className="link-underline text-sm">
          Existing customer? Log in
        </a>
      </div>
    </>
  );
}

/**
 * Closing banner used at the bottom of most pages, as an inset rounded dark panel.
 * Photo layout (default): a photo drifting slowly under a navy wash, centred text.
 * Split layout (`illustration`): text on the left, the illustration shown whole on the right.
 */
export function CtaBand({
  title = finalCta.title,
  body = finalCta.body,
  cta = finalCta.cta,
  chip = 'Get started',
  image = 'ph-cta',
  imageFocus = '50% 40%',
  illustration,
}: Props) {
  if (illustration) {
    return (
      <section aria-labelledby="cta-title" className="surface-paper px-2 pb-2 sm:px-3 sm:pb-3">
        <div className="surface-dark relative overflow-hidden rounded-[20px] sm:rounded-panel">
          <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" />
          <div className="container-site relative grid grid-cols-12 items-center gap-x-6 gap-y-10 py-16 sm:py-20 lg:gap-x-12 lg:py-24">
            <div className="col-span-12 lg:col-span-5">
              <CtaText title={title} body={body} cta={cta} chip={chip} centered={false} />
            </div>
            <figure className="group col-span-12 overflow-hidden rounded-[16px] shadow-card ring-1 ring-white/10 sm:rounded-[20px] lg:col-span-7">
              <div className="art-zoom">
                <Art
                  name={illustration}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="block"
                  imgClassName="block h-auto w-full"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
    );
  }

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
          <CtaText title={title} body={body} cta={cta} chip={chip} centered />
        </div>
      </div>
    </section>
  );
}
