import { site } from '../../content/site';

type Props = {
  /** 'header' = 44px tall, 'footer' = 56px tall. */
  size?: 'header' | 'footer';
  className?: string;
};

/**
 * The official HexaLabs logo (brain mark, wordmark and "Innovate. Create. Elevate.").
 * Served as AVIF → WebP → PNG from public/brand/; the source file is in brand-source/.
 */
export function Logo({ size = 'header', className = '' }: Props) {
  const { logo } = site.brand;
  const base = logo.src.replace(/\.png$/, '');
  return (
    <picture className={`block flex-none ${className}`}>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={logo.alt}
        decoding="async"
        className={`${size === 'footer' ? 'h-14' : 'h-11'} w-auto`}
      />
    </picture>
  );
}
