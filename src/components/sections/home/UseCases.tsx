import { Palette } from 'lucide-react';
import { useCases } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Carousel } from '../../ui/Carousel';
import { Chip } from '../../ui/Chip';
import { IconTile } from '../../ui/Cards';
import { LogoTile } from '../../ui/LogoTile';
import { accentTitle } from './accentTitle';

type UseCase = (typeof useCases.items)[number];

/**
 * Use-case card: product cards show the official logo(s) on a clean tile; the
 * non-product card (white-label) shows a line icon. White panel overlaps
 * it, dark pill action. Logos are visual only — the chip, title and body name the platform.
 */
function UseCaseCard({ u }: { u: UseCase }) {
  return (
    <article className="art-card group">
      {'logos' in u ? (
        <LogoTile ids={u.logos} overlap="4.5rem" className="art-card-media" />
      ) : (
        <IconTile icon={Palette} />
      )}
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
