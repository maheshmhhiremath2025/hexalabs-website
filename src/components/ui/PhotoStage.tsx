import type { ReactNode } from 'react';
import { Art, type ArtName } from './Art';

type Props = {
  /** The photo behind the content. */
  image: ArtName;
  children: ReactNode;
  /** CSS object-position for the photo, e.g. '50% 30%'. */
  focus?: string;
  /**
   * How much of the photo shows above the content: 'top' leaves a tall band of photo
   * on top (the content overlaps its lower part, like an art card); 'frame' lets the
   * photo show as a frame around the content.
   */
  reveal?: 'top' | 'frame';
  className?: string;
};

/**
 * A rounded photo panel with white product cards floating on it: the photo fills the
 * panel, a soft navy wash keeps the cards readable, and it zooms slowly on hover.
 * Use in place of a plain gradient stage behind product illustrations.
 */
export function PhotoStage({ image, children, focus = '50% 35%', reveal = 'top', className = '' }: Props) {
  return (
    <div className={`photo-stage group relative isolate overflow-hidden rounded-[20px] sm:rounded-panel ${className}`}>
      <div aria-hidden="true" className="art-zoom absolute inset-0 -z-10">
        <Art
          name={image}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          position={focus}
        />
      </div>
      <div aria-hidden="true" className="photo-stage-wash absolute inset-0 -z-10" />
      <div
        className={
          reveal === 'top'
            ? 'px-3 pt-[clamp(9rem,26vw,14rem)] pb-3 sm:px-8 sm:pb-8'
            : 'p-3 sm:p-10 lg:p-12'
        }
      >
        {children}
      </div>
    </div>
  );
}
