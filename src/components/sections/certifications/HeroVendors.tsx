import { ArrowRight } from 'lucide-react';
import { certHero, vendorCount, vendors } from '../../../content/certifications';
import { SmartLink } from '../../ui/SmartLink';

/** Hero aside: the seven vendors, each linking to its exams in the finder. */
export function HeroVendors() {
  const { vendorPanel } = certHero;
  return (
    <nav aria-labelledby="hero-vendors-title" className="rounded-card border border-ink-700 bg-ink-900 p-6">
      <p id="hero-vendors-title" className="font-mono text-eyebrow text-muted uppercase">
        {vendorPanel.title}
      </p>
      <ul className="mt-4 border-b border-ink-700">
        {vendors.map((v) => (
          <li key={v.id} className="border-t border-ink-700">
            <SmartLink
              href={`/certifications?vendor=${v.id}#exams`}
              className="group flex items-center justify-between gap-4 py-2.5 text-sm text-white transition-colors hover:text-blue-400"
            >
              <span>
                <span className="sr-only">{vendorPanel.srPrefix} </span>
                {v.label}
              </span>
              <span className="flex flex-none items-center gap-2 font-mono text-micro text-muted">
                {vendorPanel.countLabel(vendorCount(v.id))}
                <ArrowRight
                  className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
