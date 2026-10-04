import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { headerCta, labsMenu, mainNav, site } from '../../content/site';
import { LabsMenu } from './LabsMenu';
import { Logo } from '../ui/Logo';
import { SmartLink } from '../ui/SmartLink';
import { buttonClass } from '../ui/Button';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${
    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
  }`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Solid background once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      const focusables = Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
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

  // The blur is the site's one frosted element. It is dropped while the menu is
  // open because backdrop-filter would make the fixed menu position relative to the header.
  const headerTone = open
    ? 'border-ink-700 bg-ink-950'
    : scrolled
      ? 'border-ink-700 bg-ink-950/90 backdrop-blur-md'
      : 'border-transparent bg-ink-950';

  return (
    <header className={`surface-dark sticky top-0 z-50 border-b transition-colors duration-200 ${headerTone}`}>
      <div className="container-site flex h-header items-center justify-between gap-6">
        <SmartLink href="/" className="flex-none rounded-md" aria-label={`${site.name} home`}>
          <Logo />
        </SmartLink>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <LabsMenu />
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink to={item.href} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.loginUrl} className="hidden rounded-md px-3 py-2 text-sm text-slate-300 hover:text-white sm:inline-flex">
            Log in
          </a>
          <SmartLink href={headerCta.href} className={buttonClass('primary', 'sm', 'hidden sm:inline-flex')}>
            {headerCta.label}
          </SmartLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-md text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 top-header bottom-0 z-40 flex flex-col overflow-y-auto bg-ink-950 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site flex-1 py-6">
            <p className="font-mono text-eyebrow text-slate-400 uppercase" id="mobile-labs-heading">
              {labsMenu.label}
            </p>
            <ul aria-labelledby="mobile-labs-heading" className="mt-2 grid grid-cols-2 gap-2">
              {labsMenu.items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex min-h-14 items-center rounded-lg border px-3 py-2 text-base font-medium ${
                        isActive ? 'border-blue-400 text-white' : 'border-ink-700 text-slate-300'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-ink-700 border-y border-ink-700">
              {[{ label: 'Home', href: '/' }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 text-2xl font-medium tracking-tight ${
                        isActive ? 'text-white' : 'text-slate-300'
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
