import { Children, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  /** Accessible name of the carousel, e.g. "Use cases". */
  label: string;
  /** One child per slide. */
  children: ReactNode;
  /**
   * Width of each slide. Percentages are of the container width, so
   * `lg:w-[calc((100%-2.5rem)/3)]` shows exactly three slides (gap 1.25rem) on the container line.
   */
  slideClassName?: string;
  /** Let the track run to the viewport edges (cards peek in from the right). Default true. */
  bleed?: boolean;
  /** Optional content on the left of the top control row (e.g. an eyebrow "TOP STORIES"). Without it, controls sit centred below the track. */
  header?: ReactNode;
  className?: string;
  /**
   * Extra classes on the scrolling track. E.g. `sm:grid sm:grid-cols-2 sm:overflow-visible`
   * turns it into a plain grid from 640px up (a phone-only carousel); pair with
   * `controlsClassName="sm:hidden"`.
   */
  trackClassName?: string;
  /** Extra classes on the prev / counter / next row. */
  controlsClassName?: string;
};

const defaultSlide = 'w-[86%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]';

/**
 * Scroll-snap carousel with square prev/next buttons and a live "1 / N" counter.
 * - No autoplay. Swipe / trackpad scroll works natively.
 * - Keyboard: Tab into slides (the track scrolls to the focused card), ←/→ while
 *   focus is inside the track, or the prev/next buttons.
 * - N counts real stopping positions, so three-up desktop with 6 slides reads "1 / 4".
 * - Deterministic first render ("1 / slides") for prerendering; measured after mount.
 */
export function Carousel({
  label,
  children,
  slideClassName = defaultSlide,
  bleed = true,
  header,
  className = '',
  trackClassName = '',
  controlsClassName = '',
}: Props) {
  const slides = Children.toArray(children);
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<number[]>([]);
  const [count, setCount] = useState(slides.length);
  const [index, setIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (!items.length) return;
    const max = track.scrollWidth - track.clientWidth;
    const first = items[0].offsetLeft;
    const stops: number[] = [];
    for (const el of items) {
      const s = Math.min(Math.max(el.offsetLeft - first, 0), max);
      if (!stops.length || s - stops[stops.length - 1] > 4) stops.push(s);
    }
    stopsRef.current = stops;
    setCount(stops.length);
    const x = track.scrollLeft;
    let best = 0;
    stops.forEach((s, i) => {
      if (Math.abs(s - x) < Math.abs(stops[best] - x)) best = i;
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null;
    ro?.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      ro?.disconnect();
    };
  }, [measure, slides.length]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const stops = stopsRef.current;
    if (!track || !stops.length) return;
    const target = Math.max(0, Math.min(i, stops.length - 1));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: stops[target], behavior: reduce ? 'auto' : 'smooth' });
    setIndex(target);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  const controls = (
    <div className={`flex items-center gap-3 ${count <= 1 ? 'invisible' : ''}`}>
      <button
        type="button"
        className="carousel-btn"
        aria-controls={trackId}
        aria-label={`Previous — ${label}`}
        disabled={atStart}
        onClick={() => goTo(index - 1)}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <p className="min-w-12 text-center text-sm text-muted tabular-nums" aria-live="polite" aria-atomic="true">
        <span className="sr-only">{label}: </span>
        <span className="text-lg font-medium text-heading">{index + 1}</span>
        <span aria-hidden="true"> / </span>
        <span className="sr-only"> of </span>
        {count}
      </p>
      <button
        type="button"
        className="carousel-btn"
        data-primary={!atEnd}
        aria-controls={trackId}
        aria-label={`Next — ${label}`}
        disabled={atEnd}
        onClick={() => goTo(index + 1)}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      {header ? (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>{header}</div>
          <div className={controlsClassName}>{controls}</div>
        </div>
      ) : null}
      <div className={bleed ? 'carousel-bleed' : ''}>
        <div id={trackId} ref={trackRef} className={`carousel-track ${trackClassName}`} tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label} — slides`}>
          {slides.map((slide, i) => (
            <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} className={slideClassName}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {header ? null : <div className={`mt-8 flex justify-center ${controlsClassName}`}>{controls}</div>}
    </div>
  );
}
