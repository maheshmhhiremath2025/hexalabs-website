import type { ReactNode } from 'react';

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
};

export function Section({ tone, id, labelledBy, className = '', children, flush = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClass[tone]} ${flush ? '' : 'py-20 sm:py-24 lg:py-32'} ${className}`}
    >
      <div className="container-site">{children}</div>
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
