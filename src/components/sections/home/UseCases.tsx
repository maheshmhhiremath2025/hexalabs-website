import { useCases } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Carousel } from '../../ui/Carousel';
import { Chip } from '../../ui/Chip';
import { PhotoMedia } from '../../ui/Cards';
import { accentTitle } from './accentTitle';

type UseCase = (typeof useCases.items)[number];

/** Use-case card: one photo on top, white panel overlapping it, dark pill action. */
function UseCaseCard({ u }: { u: UseCase }) {
  return (
    <article className="art-card group">
      <PhotoMedia image={u.image} />
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

/** Dark photo band (data-centre aisle under a navy wash): a carousel of use-case cards. */
export function UseCases() {
  return (
    <Section tone="dark" image="ph-band-datacenter" labelledBy="usecases-title">
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
