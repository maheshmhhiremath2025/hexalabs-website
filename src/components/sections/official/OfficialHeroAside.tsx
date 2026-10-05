import { courseRow, officialHero, officialVendors, type OfficialVendor } from '../../../content/officialLabs';
import { site } from '../../../content/site';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { LogoTile } from '../../ui/LogoTile';
import { Art } from '../../ui/Art';

/** "Fundamentals to Expert" — the first and last level that have courses. */
function levelRange(v: OfficialVendor) {
  const used = v.levels.filter((l) => v.courses.some((c) => c.level === l.id));
  if (!used.length) return '';
  return used.length === 1 ? used[0].label : `${used[0].label} to ${used[used.length - 1].label}`;
}

/** The current offer as a featured horizontal card: a classroom photo left, text right. */
function OfferCard() {
  return (
    <article className="card card-hover group grid h-full overflow-hidden sm:grid-cols-[5fr_6fr]">
      <div aria-hidden="true" className="art-zoom m-1.5 aspect-[2/1] overflow-hidden rounded-[12px] sm:m-2 sm:mr-0 sm:aspect-auto">
        <Art name="ph-cat-official" sizes="(min-width: 1024px) 22vw, 100vw" className="h-full w-full" position="50% 30%" />
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

/** One vendor's course list as a card: its official logo on top, then the count. */
function VendorCard({ v }: { v: OfficialVendor }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Decorative: the heading below names the vendor. */}
      <LogoTile ids={[v.id]} priority className="m-1.5 aspect-[3/2] rounded-[12px] sm:m-2" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h2 className="text-base leading-snug font-medium tracking-tight sm:text-lg">{v.eyebrow}</h2>
        <p className="mt-1.5 text-[0.8125rem] leading-5 text-body sm:text-sm sm:leading-6">
          {courseRow.countLabel(v.courses.length)} · {levelRange(v)}
        </p>
        <div className="mt-auto pt-4">
          <LinkArrow href={`#${v.id}`} stretched srContext={v.eyebrow}>
            See courses
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
  const vendors = [officialVendors.azure, officialVendors.aws];
  return (
    <nav aria-label={officialHero.aside.title}>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        <li className="rise-in col-span-2" style={{ ['--d' as string]: '150ms' }}>
          <OfferCard />
        </li>
        {vendors.map((v, i) => (
          <li key={v.id} className="rise-in" style={{ ['--d' as string]: `${250 + i * 100}ms` }}>
            <VendorCard v={v} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
