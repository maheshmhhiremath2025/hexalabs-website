import { useEffect, useId, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { labsMenu } from '../../content/site';

/**
 * Desktop "Labs" disclosure menu. A button toggles a panel of links
 * (disclosure pattern, not an ARIA menu, so links keep normal Tab behaviour).
 * Closes on Esc, outside click, focus leaving, and navigation.
 */
export function LabsMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const sectionActive = labsMenu.items.some((i) => pathname === i.href || pathname.startsWith(`${i.href}/`));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
          open || sectionActive ? 'text-white' : 'text-slate-300 hover:text-white'
        }`}
      >
        {labsMenu.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 mt-2 w-[22rem] rounded-card border border-ink-700 bg-ink-900 p-2 shadow-frame"
      >
        <ul>
          {labsMenu.items.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-950 ${isActive ? 'bg-ink-950' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`flex items-center gap-2 text-sm font-medium ${isActive ? 'text-blue-400' : 'text-white'}`}>
                      {item.label}
                    </span>
                    {item.description ? <span className="mt-0.5 block text-xs text-slate-400">{item.description}</span> : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
