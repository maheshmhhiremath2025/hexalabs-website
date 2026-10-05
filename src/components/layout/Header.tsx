import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { headerCta, labsMenu, mainNav, site } from '../../content/site';
import { LabsMenu } from './LabsMenu';
import { Logo } from '../ui/Logo';
import { SmartLink } from '../ui/SmartLink';
import { buttonClass } from '../ui/Button';

/**
 * Light header that sits on the canvas at the top of the page and morphs into a
 * floating white pill once the page scrolls (pill fades/scales in, bar drops 8px —
 * transform + opacity only).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mobile menu: lock scroll, focus first link, Esc to close, keep Tab inside
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menu) return;
      const focusables = [toggleRef.current, ...Array.from(menu.querySelectorAll<HTMLElement>('a, button'))].filter(
        (el): el is HTMLElement => !!el,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="site-header surface-white" data-scrolled={scrolled} data-open={open}>
      <div className="site-header-inner">
        <div aria-hidden="true" className="site-header-pill" />
        <div className="relative flex h-full items-center justify-between gap-4 pr-2.5 pl-4 sm:pl-5 lg:pr-3">
          <SmartLink href="/" className="flex-none rounded-md" aria-label={`${site.name} home`}>
            <Logo />
          </SmartLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="nav-rail">
              <li>
                <LabsMenu />
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className="nav-item">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={site.loginUrl}
              className="hidden rounded-full px-3.5 py-2 text-sm text-slate-600 transition-colors hover:text-ink-950 sm:inline-flex"
            >
              Log in
            </a>
            <SmartLink href={headerCta.href} className={buttonClass('dark', 'sm', 'hidden h-10 sm:inline-flex')}>
              {headerCta.label}
              <ArrowUpRight className="arrow-up-right h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </SmartLink>
            <button
              ref={toggleRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-950 shadow-[0_0_0_1px_rgb(6_20_38/0.08),0_6px_16px_-8px_rgb(6_20_38/0.35)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="surface-white fixed inset-x-0 top-header bottom-0 z-40 flex flex-col overflow-y-auto border-t border-line lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site flex-1 py-6">
            <p className="eyebrow" id="mobile-labs-heading">
              {labsMenu.label}
            </p>
            <ul aria-labelledby="mobile-labs-heading" className="mt-3 grid grid-cols-2 gap-2">
              {labsMenu.items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex min-h-14 items-center rounded-xl px-3.5 py-2 text-base font-medium transition-colors ${
                        isActive ? 'bg-ink-950 text-white' : 'bg-canvas text-ink-950'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {[{ label: 'Home', href: '/' }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 text-2xl font-light tracking-tight ${
                        isActive ? 'text-blue-600' : 'text-ink-950'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-site grid gap-3 pb-8">
            <SmartLink href={headerCta.href} className={buttonClass('primary', 'lg', 'w-full')}>
              {headerCta.label}
            </SmartLink>
            <a href={site.loginUrl} className={buttonClass('secondary', 'lg', 'w-full')}>
              Log in <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
