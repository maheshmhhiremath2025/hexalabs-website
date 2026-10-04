import type { ReactNode } from 'react';
import { SmartLink } from './SmartLink';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

const sizeClass: Record<Size, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return ['btn', `btn-${variant}`, sizeClass[size], extra].filter(Boolean).join(' ');
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({ href, children, variant = 'primary', size = 'md', className = '' }: ButtonLinkProps) {
  return (
    <SmartLink href={href} className={buttonClass(variant, size, className)}>
      {children}
    </SmartLink>
  );
}
