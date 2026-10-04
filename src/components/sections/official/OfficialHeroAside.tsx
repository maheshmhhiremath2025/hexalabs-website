import { ArrowDown, ArrowRight } from 'lucide-react';
import { courseRow, officialHero, officialVendors } from '../../../content/officialLabs';
import { site } from '../../../content/site';
import { SmartLink } from '../../ui/SmartLink';

/** Hero side panel: the current offer and jump links to each course list. */
export function OfficialHeroAside() {
  const vendors = [officialVendors.azure, officialVendors.aws];
  return (
    <div className="rounded-card border border-ink-700 bg-ink-900 p-6">
      <p className="flex items-center gap-2 font-mono text-eyebrow text-orange-500 uppercase">
        <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-orange-500" />
        Current offer
      </p>
      <p className="mt-2 text-lg font-medium text-white">{site.offer.label}</p>
      <SmartLink href={officialHero.aside.offerLink.href} className="link mt-3 inline-flex items-center gap-1.5 text-sm">
        {officialHero.aside.offerLink.label}
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </SmartLink>

      <nav aria-label={officialHero.aside.title} className="mt-6 border-t border-ink-700 pt-5">
        <p className="eyebrow">{officialHero.aside.title}</p>
        <ul className="mt-2">
          {vendors.map((v) => (
            <li key={v.id} className="border-b border-ink-700 last:border-b-0">
              <SmartLink href={`#${v.id}`} className="group flex items-center justify-between gap-4 py-3">
                <span className="font-medium text-heading">{v.eyebrow}</span>
                <span className="flex flex-none items-center gap-2 font-mono text-micro whitespace-nowrap text-muted">
                  {courseRow.countLabel(v.courses.length)}
                  <ArrowDown
                    className="h-4 w-4 text-blue-400 transition-transform group-hover:translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
