import { footer, site } from '../../content/site';
import { Logo } from '../ui/Logo';
import { SmartLink } from '../ui/SmartLink';

export function Footer() {
  return (
    <footer className="surface-dark border-t border-ink-700">
      <div className="container-site grid grid-cols-12 gap-x-6 gap-y-12 py-16 lg:py-20">
        <div className="col-span-12 lg:col-span-4">
          <SmartLink href="/" className="inline-flex rounded-md" aria-label={`${site.name} home`}>
            <Logo size="footer" />
          </SmartLink>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-body">{footer.blurb}</p>
          <p className="mt-6 text-sm">
            <span className="mr-3 font-mono text-micro uppercase tracking-wide text-muted">Support</span>
            <a href={`mailto:${site.contact.email}`} className="text-heading hover:text-blue-400">
              {site.contact.email}
            </a>
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-labelledby={`footer-${col.title}`} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <h2 id={`footer-${col.title}`} className="font-mono text-eyebrow font-normal uppercase tracking-[0.08em] text-muted">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className="text-sm text-body transition-colors hover:text-white">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-ink-700">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}
          </p>
          <ul className="flex items-center gap-6">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <SmartLink href={l.href} className="hover:text-white">
                  {l.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <a href={site.portalUrl} className="font-mono text-micro hover:text-white">
                {site.portalLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
