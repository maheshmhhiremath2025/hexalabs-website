import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { catalogue } from '../../../content/home';
import { site } from '../../../content/site';
import { Section, Eyebrow } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { Reveal } from '../../ui/Reveal';

type TileProps = {
  tag: string;
  name: string;
  line: string;
  href: string;
  offer?: boolean;
  className?: string;
  children?: ReactNode;
  /** Horizontal layout for the wide strip tile. */
  wide?: boolean;
};

function Tile({ tag, name, line, href, offer, className = '', children, wide }: TileProps) {
  return (
    <Reveal className={className}>
      <article
        className={`card-lift group relative flex h-full rounded-card border border-ink-700 bg-ink-900 p-6 lg:p-8 ${
          wide ? 'flex-col gap-6 lg:flex-row lg:items-center lg:justify-between' : 'flex-col'
        }`}
      >
        <div className={wide ? 'lg:max-w-sm' : ''}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-eyebrow text-muted uppercase">{tag}</span>
            {offer ? (
              <span className="rounded-full border border-orange-500/40 px-2 py-0.5 font-mono text-micro text-orange-500">
                {site.offer.short}
              </span>
            ) : null}
          </div>
          <h3 className="mt-4 text-h3">{name}</h3>
          <p className="mt-2 text-body">{line}</p>
        </div>

        {children ? <div className={wide ? 'lg:flex-1' : 'mt-8 flex-1'}>{children}</div> : <div className="flex-1" />}

        <SmartLink
          href={href}
          className={`inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 after:absolute after:inset-0 after:rounded-card after:content-[''] ${
            wide ? '' : 'mt-8'
          }`}
        >
          View labs<span className="sr-only">: {name}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
        </SmartLink>
      </article>
    </Reveal>
  );
}

function Chips({ items, size = 'md' }: { items: string[]; size?: 'md' | 'lg' }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Examples">
      {items.map((c) => (
        <li
          key={c}
          className={`rounded-md border border-ink-700 bg-ink-950 font-mono text-white ${
            size === 'lg' ? 'px-3 py-2 text-sm' : 'px-2.5 py-1 text-micro'
          }`}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

function WindowsDesktop() {
  return (
    <div aria-hidden="true" className="flex h-28 flex-col overflow-hidden rounded-lg border border-ink-700 bg-blue-600/15">
      <div className="m-3 w-3/5 rounded border border-ink-700 bg-ink-950">
        <div className="border-b border-ink-700 px-2 py-1 font-mono text-micro text-slate-400">Server Manager</div>
        <div className="space-y-1 p-2">
          <div className="h-1 w-4/5 rounded bg-ink-700" />
          <div className="h-1 w-3/5 rounded bg-ink-700" />
        </div>
      </div>
      <div className="mt-auto flex h-6 items-center gap-1.5 bg-ink-950 px-2">
        <span className="h-3 w-3 rounded-sm bg-blue-400" />
        <span className="h-3 w-3 rounded-sm bg-ink-700" />
        <span className="h-3 w-3 rounded-sm bg-ink-700" />
        <span className="ml-auto font-mono text-micro text-slate-400">09:41</span>
      </div>
    </div>
  );
}

function Terminal() {
  return (
    <pre
      aria-hidden="true"
      className="overflow-hidden rounded-lg border border-ink-700 bg-ink-950 p-4 font-mono text-micro leading-relaxed text-slate-300"
    >
      <span className="text-blue-400">$</span> oc get pods -n learner-07{'\n'}
      <span className="text-slate-400">NAME                 READY   STATUS</span>
      {'\n'}web-7d9c5b-x2kfp     1/1     Running{'\n'}api-5f8b7c-q9mzt     1/1     Running
    </pre>
  );
}

export function CatalogueBento() {
  const t = catalogue.tiles;
  return (
    <Section tone="dark" labelledBy="catalogue-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow>{catalogue.eyebrow}</Eyebrow>
          <h2 id="catalogue-title" className="mt-5 text-h2">
            {catalogue.title}
          </h2>
        </div>
        <p className="col-span-12 self-end text-lead text-body lg:col-span-5">{catalogue.intro}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-16 lg:grid-cols-12">
        <Tile tag="Azure · Official" name={t.azure.name} line={t.azure.line} href={t.azure.href} offer className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <ul className="grid gap-x-6 sm:grid-cols-2" aria-label="Example courses">
            {t.azure.courses.map((c) => (
              <li key={c.code} className="flex items-baseline gap-3 border-t border-ink-700 py-3">
                <span className="w-14 flex-none font-mono text-sm text-white">{c.code}</span>
                <span className="text-sm text-slate-300">{c.name}</span>
              </li>
            ))}
          </ul>
        </Tile>
        <Tile tag="AWS · Official" name={t.aws.name} line={t.aws.line} href={t.aws.href} offer className="md:col-span-3 lg:col-span-5">
          <Chips items={t.aws.codes} />
        </Tile>
        <Tile tag="Windows" name={t.windows.name} line={t.windows.line} href={t.windows.href} className="md:col-span-3 lg:col-span-5">
          <WindowsDesktop />
        </Tile>
        <Tile tag="Linux" name={t.linux.name} line={t.linux.line} href={t.linux.href} className="md:col-span-3 lg:col-span-5">
          <Chips items={t.linux.distros} />
        </Tile>
        <Tile tag="Kubernetes" name={t.kubernetes.name} line={t.kubernetes.line} href={t.kubernetes.href} className="md:col-span-3 lg:col-span-7">
          <Terminal />
        </Tile>
        <Tile tag="Sandboxes" name={t.sandbox.name} line={t.sandbox.line} href={t.sandbox.href} wide className="md:col-span-6 lg:col-span-12">
          <Chips items={t.sandbox.providers} />
        </Tile>
      </div>

      <p className="mt-8 text-body">
        {catalogue.certifications.text}{' '}
        <SmartLink href={catalogue.certifications.href} className="link inline-flex items-center gap-1 font-medium">
          {catalogue.certifications.linkLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </SmartLink>
      </p>
    </Section>
  );
}
