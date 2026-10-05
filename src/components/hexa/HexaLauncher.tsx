import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router';
import { hexa } from '../../content/hexa';
import { HexaAvatar } from './HexaAvatar';

const HexaChat = lazy(() => import('./HexaChat'));
const TEASER_SEEN = 'hexa-teaser-seen';

/**
 * Floating "Ask Hexa" button (bottom-right on every page). The chat panel loads
 * only when it is opened. A small teaser bubble appears once per visit.
 */
export function HexaLauncher() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (open || pathname === '/contact') {
      setTeaser(false);
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_SEEN) === '1';
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      setTeaser(true);
      try {
        sessionStorage.setItem(TEASER_SEEN, '1');
      } catch {
        /* ignore */
      }
    }, hexa.teaserDelayMs);
    return () => window.clearTimeout(t);
  }, [open, pathname]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_SEEN, '1');
    } catch {
      /* ignore */
    }
  };

  const openChat = () => {
    dismissTeaser();
    setOpen(true);
  };
  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="hexa-root">
      {open ? (
        <Suspense fallback={<div className="hexa-panel hexa-panel-loading" aria-hidden="true" />}>
          <HexaChat onClose={close} />
        </Suspense>
      ) : null}

      {!open && teaser ? (
        <div className="hexa-teaser">
          <button type="button" className="hexa-teaser-text" onClick={openChat}>
            {hexa.teaser}
          </button>
          <button type="button" className="hexa-teaser-close" onClick={dismissTeaser} aria-label="Dismiss">
            <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        onClick={open ? close : openChat}
        aria-expanded={open}
        aria-label={open ? 'Close Hexa chat' : `${hexa.launcherLabel} — chat with the HexaLabs assistant`}
        className={`hexa-launcher ${open ? 'hexa-launcher-open' : ''}`}
      >
        {open ? (
          <span className="grid h-10 w-10 place-items-center">
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>
        ) : (
          <>
            <HexaAvatar size={40} />
            <span className="hexa-launcher-label">{hexa.launcherLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}
