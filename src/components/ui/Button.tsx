import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SmartLink } from './SmartLink';

/**
 * Pill buttons.
 * primary   — blue-600, the main action (one per view)
 * dark      — navy pill, secondary emphasis on light surfaces
 * light     — white pill, the main action on dark sections / over imagery
 * secondary — outline pill (adapts to the surface)
 * ghost     — translucent outline pill over dark imagery
 */
export type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const sizeClass: Record<Size, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

export function buttonClass(variant: ButtonVariant = 'primary', size: Size = 'md', extra = '') {
  return ['btn', `btn-${variant}`, sizeClass[size], extra].filter(Boolean).join(' ');
}

/** Trailing arrow for buttons: up-right (external / "find out") or right (next step). */
export function ButtonArrow({ kind = 'up-right' }: { kind?: 'up-right' | 'right' }) {
  const Icon = kind === 'right' ? ArrowRight : ArrowUpRight;
  return <Icon className={`h-4 w-4 flex-none arrow-${kind}`} strokeWidth={1.75} aria-hidden="true" />;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  /** Add a trailing arrow icon that nudges on hover. */
  arrow?: 'up-right' | 'right';
};

export function ButtonLink({ href, children, variant = 'primary', size = 'md', className = '', arrow }: ButtonLinkProps) {
  return (
    <SmartLink href={href} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <ButtonArrow kind={arrow} /> : null}
    </SmartLink>
  );
}
