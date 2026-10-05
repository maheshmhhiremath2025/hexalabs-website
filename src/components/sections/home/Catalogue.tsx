import { Fragment } from 'react';
import { catalogue } from '../../../content/home';
import { site } from '../../../content/site';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { LogoTile } from '../../ui/LogoTile';
import type { ProductId } from '../../../content/products';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

type Card = (typeof catalogue.cards)[number];

/**
 * Official marks of the platforms in each kind, as equal square badges (same size on
 * every card): all six sandbox providers and all seven voucher vendors (the card's tags list them in text).
 */
const cardMarks: Record<Card['id'], ProductId[]> = {
  official: ['azure', 'aws'],
  sandboxes: ['azure', 'aws', 'gcp', 'oci', 'databricks', 'ai-foundry'],
  machines: ['windows-server', 'ubuntu', 'rhel', 'kubernetes'],
  certifications: ['microsoft', 'aws', 'google', 'oracle', 'redhat', 'cncf', 'databricks'],
};

/**
 * Art card whose media is a clean tile with the official logos of a few platforms in
 * that kind, taller than the default ArtCard (the row is four-up, so a 3:2 tile would be
 * mostly hidden behind the panel on wide screens). Same classes and motion.
 */
function KindCard({ c }: { c: Card }) {
  return (
    <article className="art-card group">
      {/* Visual only: the tags below name the same platforms for screen readers. */}
      <LogoTile ids={cardMarks[c.id]} badge="3rem" overlap="3.5rem" className="art-card-media xl:aspect-[5/4]" />
      <div className="art-card-panel card -mt-14">
        <p className="flex flex-wrap gap-1.5">
          <Chip>{c.chip}</Chip>
          {c.offer ? <Chip tone="accent">{site.offer.short}</Chip> : null}
        </p>
        <h3 className="mt-3 text-xl leading-snug font-medium tracking-tight">{c.title}</h3>
        <p className="mt-2 text-sm leading-6 text-body">{c.line}</p>
        <p className="mt-4 border-t border-line pt-4 font-mono text-xs leading-5 text-muted">
          <span className="sr-only">Examples: </span>
          {/* Each tag keeps its separator on the same line, so no line starts with a dot. */}
          {c.tags.map((t, i) => (
            <Fragment key={t}>
              <span className="whitespace-nowrap">
                {t}
                {i < c.tags.length - 1 ? <span aria-hidden="true">&nbsp;·</span> : null}
              </span>
              {i < c.tags.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
        <div className="mt-auto pt-5">
          <LinkArrow href={c.href} stretched srContext={c.title} />
        </div>
      </div>
    </article>
  );
}

/**
 * "What you can run": four art cards, one per kind of environment, on the canvas
 * right under the hero. Each card links to its page.
 */
export function Catalogue() {
  return (
    <Section tone="paper" labelledBy="catalogue-title" flush className="pt-4 pb-20 sm:pt-6 sm:pb-24 lg:pb-28">
      <SectionIntro
        id="catalogue-title"
        eyebrow={catalogue.eyebrow}
        title={accentTitle(catalogue.title, catalogue.accent)}
        intro={catalogue.intro}
        actions={
          <ButtonLink href={catalogue.action.href} variant="dark" arrow="up-right">
            {catalogue.action.label}
          </ButtonLink>
        }
      />

      <RevealGroup as="ul" className="mt-14 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
        {catalogue.cards.map((c) => (
          <RevealItem as="li" key={c.id}>
            <KindCard c={c} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
