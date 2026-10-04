import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Internal routes use the router; external links open normally. */
export function SmartLink({ href, children, ...rest }: Props) {
  if (isExternal(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
