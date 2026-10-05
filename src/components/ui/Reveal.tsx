import type { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
};

/**
 * Fade + rise the first time an element scrolls into view.
 * With prefers-reduced-motion the content appears without movement.
 * Never wrap a page's h1 in Reveal — it is the LCP element.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.7, delay, ease }}
    >
      {children}
    </Comp>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  /** Element to render: `ul`/`ol` for card grids, otherwise `div`. */
  as?: 'div' | 'ul' | 'ol';
  /** Seconds between children. */
  stagger?: number;
  /** Seconds before the first child. */
  delay?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

/**
 * Stagger container: its RevealItem children rise in one after another
 * when the group scrolls into view.
 *
 *   <RevealGroup as="ul" className="grid gap-5 lg:grid-cols-3">
 *     {items.map((x) => <RevealItem as="li" key={x.id}>…</RevealItem>)}
 *   </RevealGroup>
 */
export function RevealGroup({ children, className, as = 'div', stagger = 0.09, delay = 0, ...aria }: GroupProps) {
  const reduce = useReducedMotion();
  const Comp = as === 'ul' ? m.ul : as === 'ol' ? m.ol : m.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: reduce ? {} : { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...aria}
    >
      {children}
    </Comp>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
};

/** A child of RevealGroup (must be a direct motion child to receive the stagger). */
export function RevealItem({ children, className, as = 'div' }: ItemProps) {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? m.li : as === 'article' ? m.article : m.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 32 },
        show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.75, ease } },
      }}
    >
      {children}
    </Comp>
  );
}
