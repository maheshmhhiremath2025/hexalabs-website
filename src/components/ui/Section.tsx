import type { ReactNode } from 'react';

/**
 * paper — pale blue-grey canvas (the default page background)
 * white — white band; cards on it use the canvas colour or a border
 * dark  — navy feature section (carousels, "how it works"), white cards pop on it
 */
export type Tone = 'dark' | 'paper' | 'white';

const toneClass: Record<Tone, string> = {
  dark: 'surface-dark',
  paper: 'surface-paper',
  white: 'surface-white',
};

type SectionProps = {
  tone: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  /** Remove the default vertical padding. */
  flush?: boolean;
  /** Soft blue glow in the background (dark sections only). */
  glow?: boolean;
};

export function Section({ tone, id, labelledBy, className = '', children, flush = false, glow = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClass[tone]} relative ${glow ? 'overflow-hidden' : ''} ${flush ? '' : 'py-20 sm:py-24 lg:py-28'} ${className}`}
    >
      {glow ? <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" /> : null}
      <div className="container-site relative">{children}</div>
    </section>
  );
}

type HeaderProps = {
  id: string;
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/** Left-aligned editorial section header: mono eyebrow, heading, optional intro. */
export function SectionHeader({ id, eyebrow, index, title, intro, className = '' }: HeaderProps) {
  return (
    <header className={`max-w-2xl ${className}`}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-5 text-h2">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lead text-body">{intro}</p> : null}
    </header>
  );
}

type IntroProps = {
  /** id for the h2 — pass the same value to Section's labelledBy. */
  id: string;
  eyebrow?: string;
  /** Heading. Use <Accent> (or AccentHeadline) for one gradient accent word. */
  title: ReactNode;
  intro?: ReactNode;
  /** Optional buttons under the intro (e.g. one dark pill with an arrow). */
  actions?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
};

/**
 * Reference-style section intro: small eyebrow, light heading with one accent word,
 * short intro, optional action. Centred by default.
 */
export function SectionIntro({ id, eyebrow, title, intro, actions, align = 'center', className = '' }: IntroProps) {
  const centered = align === 'center';
  return (
    <header className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600 [.surface-dark_&]:bg-blue-400" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={`${eyebrow ? 'mt-4' : ''} text-h2`}>
        {title}
      </h2>
      {intro ? <p className={`mt-5 text-lead text-body ${centered ? 'mx-auto max-w-2xl' : ''}`}>{intro}</p> : null}
      {actions ? <div className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div> : null}
    </header>
  );
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      {index ? (
        <>
          <span className="text-heading">{index}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
