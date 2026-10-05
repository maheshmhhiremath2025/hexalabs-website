import { Cloud, Server } from 'lucide-react';
import { courseRow, officialHero, officialVendors, type OfficialVendor } from '../../../content/officialLabs';
import { site } from '../../../content/site';
import { Art } from '../../ui/Art';
import { Chip } from '../../ui/Chip';
import { IconCard } from '../../ui/Cards';
import { LinkArrow } from '../../ui/LinkArrow';

/** "Fundamentals to Expert" — the first and last level that have courses. */
function levelRange(v: OfficialVendor) {
  const used = v.levels.filter((l) => v.courses.some((c) => c.level === l.id));
  if (!used.length) return '';
  return used.length === 1 ? used[0].label : `${used[0].label} to ${used[used.length - 1].label}`;
}

/** The current offer as a featured horizontal card: artwork left, text right. */
function OfferCard() {
  return (
    <article className="card card-hover group grid h-full overflow-hidden sm:grid-cols-[5fr_6fr]">
      <div className="art-zoom aspect-[2/1] sm:aspect-auto">
        <Art name="official-labs" sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 100vw" className="h-full w-full" />
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <p>
          <Chip tone="accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Current offer
          </Chip>
        </p>
        <h2 className="mt-3 text-lg leading-snug font-medium tracking-tight sm:text-xl">{site.offer.label}</h2>
        <div className="mt-auto pt-5">
          <LinkArrow href={officialHero.aside.offerLink.href} stretched>
            {officialHero.aside.offerLink.label}
          </LinkArrow>
        </div>
      </div>
    </article>
  );
}

/**
 * White cards that overlap the bottom of the hero: the featured offer, then a
 * card for each vendor's course list on this page.
 */
export function OfficialHeroCards() {
  const vendors = [
    { v: officialVendors.azure, icon: Cloud },
    { v: officialVendors.aws, icon: Server },
  ];
  return (
    <nav aria-label={officialHero.aside.title}>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        <li className="rise-in col-span-2" style={{ ['--d' as string]: '150ms' }}>
          <OfferCard />
        </li>
        {vendors.map(({ v, icon }, i) => (
          <li key={v.id} className="rise-in" style={{ ['--d' as string]: `${250 + i * 100}ms` }}>
            <IconCard
              as="h2"
              compact
              icon={icon}
              title={v.eyebrow}
              body={`${courseRow.countLabel(v.courses.length)} · ${levelRange(v)}`}
              href={`#${v.id}`}
              linkLabel="See courses"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
