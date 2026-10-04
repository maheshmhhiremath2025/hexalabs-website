import type { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
};

/**
 * Fade + short rise the first time an element scrolls into view.
 * With prefers-reduced-motion the content appears without movement.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}
