import type { CSSProperties } from 'react';
import { useCases } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Carousel } from '../../ui/Carousel';
import { Chip } from '../../ui/Chip';
import { Art } from '../../ui/Art';
import { ProductMark } from '../../ui/ProductMark';
import type { ProductId } from '../../../content/products';
import { accentTitle } from './accentTitle';

type UseCase = (typeof useCases.items)[number];

/** Official marks shown over each card's artwork (keyed by link, so a changed link fails type-checking). */
const useCaseMarks: Record<UseCase['href'], ProductId[]> = {
  '/official-labs#azure': ['azure'],
  '/sandboxes?provider=oci#providers': ['oci'],
  '/labs?type=windows': ['windows-server'],
  '/labs?type=kubernetes': ['kubernetes'],
  '/certifications': ['microsoft', 'aws', 'google'],
  '/for-training-companies': [],
};

/**
 * Use-case card: the product's own artwork (cropped in) with its official mark,
 * white panel overlapping it, dark pill action. The mark is visual only — the chip,
 * title and body already name the platform.
 */
function UseCaseCard({ u }: { u: UseCase }) {
  const flip = 'flip' in u && u.flip;
  return (
    <article className="art-card group">
      <div className="art-card-media art-zoom ring-1 ring-white/10" style={{ '--focus': u.focus } as CSSProperties}>
        <Art
          name={u.art}
          sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 86vw"
          className={`h-full w-full ${flip ? '-scale-x-100' : ''}`}
          imgClassName="h-full w-full scale-[1.3] object-cover [object-position:var(--focus)] [transform-origin:var(--focus)]"
        />
      </div>
      {useCaseMarks[u.href].length ? (
        <ul aria-hidden="true" className="pointer-events-none absolute inset-x-3.5 top-3.5 z-[2] flex flex-wrap gap-1.5">
          {useCaseMarks[u.href].map((id) => (
            <li key={id}>
              <ProductMark id={id} />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="art-card-panel card">
        <p>
          <Chip>{u.chip}</Chip>
        </p>
        <h3 className="mt-3 text-xl leading-snug font-medium tracking-tight">{u.title}</h3>
        <p className="mt-2 text-sm leading-6 text-body">{u.body}</p>
        <div className="mt-auto flex justify-end pt-6">
          <ButtonLink href={u.href} variant="dark" size="sm" arrow="up-right">
            Know more<span className="sr-only">: {u.title}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

/** Short dark feature band: a carousel of use-case cards. */
export function UseCases() {
  return (
    <Section tone="dark" glow labelledBy="usecases-title">
      <SectionIntro
        id="usecases-title"
        eyebrow={useCases.eyebrow}
        title={accentTitle(useCases.title, useCases.accent)}
        intro={useCases.intro}
      />
      <Carousel label={useCases.eyebrow} className="mt-14">
        {useCases.items.map((u) => (
          <UseCaseCard key={u.title} u={u} />
        ))}
      </Carousel>
    </Section>
  );
}
