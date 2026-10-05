import { ArrowRight, Award, Check, Cloud, Layers, MonitorSmartphone, type LucideIcon } from 'lucide-react';
import { hero, proofStrip } from '../../../content/home';
import { site } from '../../../content/site';
import { SmartLink } from '../../ui/SmartLink';
import { IconCard } from '../../ui/Cards';

/** Offer pill — translucent on the dark hero, with a small orange "Offer" chip. */
export function OfferPill() {
  return (
    <SmartLink
      href={site.offer.href}
      className="group inline-flex max-w-full items-center gap-2 rounded-full bg-white/8 py-1 pr-3 pl-1 text-[0.8125rem] sm:gap-2.5 sm:pr-3.5 sm:text-sm text-white ring-1 ring-white/18 backdrop-blur-md transition-colors hover:bg-white/14"
    >
      <span className="chip chip-accent rounded-full! px-2.5 font-mono uppercase">Offer</span>
      <span className="truncate">
        <span className="sm:hidden">{site.offer.labelCompact}</span>
        <span className="hidden sm:inline">{site.offer.label}</span>
      </span>
      <ArrowRight
        className="h-3.5 w-3.5 flex-none transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </SmartLink>
  );
}

const cardIcons: Record<(typeof hero.cards)[number]['id'], LucideIcon> = {
  official: Layers,
  sandboxes: Cloud,
  machines: MonitorSmartphone,
  certifications: Award,
};

/** Four white cards overlapping the bottom edge of the hero; they rise in on first paint. */
export function HeroCards() {
  return (
    <ul aria-label="What HexaLabs provides" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
      {hero.cards.map((c, i) => (
        <li key={c.id} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
          <IconCard icon={cardIcons[c.id]} title={c.title} body={c.line} href={c.href} as="h2" compact />
        </li>
      ))}
    </ul>
  );
}

/** Key facts under the hero, on the canvas. */
export function ProofStrip() {
  return (
    <ul
      className="container-site mt-10 grid grid-cols-1 gap-x-8 gap-y-3 pb-16 sm:grid-cols-2 sm:pb-20 lg:mt-12 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-12 lg:pb-24"
      aria-label="Key facts"
    >
      {proofStrip.map((fact) => (
        <li key={fact} className="flex items-center gap-2.5 text-sm text-ink-950">
          <span aria-hidden="true" className="grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
            <Check className="h-3 w-3" strokeWidth={2.5} />
          </span>
          {fact}
        </li>
      ))}
    </ul>
  );
}
