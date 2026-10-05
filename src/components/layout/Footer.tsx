import { ArrowUpRight } from 'lucide-react';
import { footer, site } from '../../content/site';
import { Logo } from '../ui/Logo';
import { SmartLink } from '../ui/SmartLink';

/** Light footer: logo + blurb, four underlined link columns, then a thin bottom bar. */
export function Footer() {
  return (
    <footer className="surface-white">
      <div className="container-site grid grid-cols-12 gap-x-6 gap-y-12 pt-16 pb-14 lg:pt-20">
        <div className="col-span-12 lg:col-span-4">
          <SmartLink href="/" className="inline-flex rounded-md" aria-label={`${site.name} home`}>
            <Logo size="footer" />
          </SmartLink>
          <p className="mt-6 max-w-xs text-sm leading-6 text-body">{footer.blurb}</p>
          <p className="mt-6 text-sm">
            <span className="block text-muted">Support</span>
            <a href={`mailto:${site.contact.email}`} className="link-underline mt-1 inline-block font-medium">
              {site.contact.email}
            </a>
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav
            key={col.title}
            aria-labelledby={`footer-${col.title}`}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
          >
            <h2 id={`footer-${col.title}`} className="text-base font-medium text-slate-500">
              {col.title}
            </h2>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className="link-underline text-sm">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-canvas-200">
        <div className="container-site flex flex-col gap-4 py-7 text-sm text-body sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {site.copyrightYear} {site.legalName}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <SmartLink href={l.href} className="link-underline">
                  {l.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <a
                href={site.portalUrl}
                className="inline-flex items-center gap-1 rounded-full bg-canvas px-3 py-1.5 font-mono text-micro text-ink-950 transition-colors hover:bg-canvas-200"
              >
                {site.portalLabel}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
