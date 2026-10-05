import { useEffect, useId, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Award, ChevronDown, Cloud, Layers, MonitorSmartphone, type LucideIcon } from 'lucide-react';
import { labsMenu } from '../../content/site';

const icons: Record<string, LucideIcon> = {
  '/official-labs': Layers,
  '/sandboxes': Cloud,
  '/labs': MonitorSmartphone,
  '/certifications': Award,
};

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
        className="nav-item"
        data-active={open || sectionActive}
      >
        {labsMenu.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="card absolute top-full left-0 mt-3 w-[24rem] p-2 shadow-[var(--shadow-card-hover)]"
      >
        <ul>
          {labsMenu.items.map((item) => {
            const Icon = icons[item.href] ?? Layers;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-canvas ${isActive ? 'bg-canvas' : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="icon-bubble h-9 w-9">
                        <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span>
                        <span className={`block text-sm font-medium ${isActive ? 'text-blue-600' : 'text-ink-950'}`}>
                          {item.label}
                        </span>
                        {item.description ? <span className="mt-0.5 block text-xs text-slate-600">{item.description}</span> : null}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
