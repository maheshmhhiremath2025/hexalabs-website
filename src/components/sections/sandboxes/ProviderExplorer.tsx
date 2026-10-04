import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import {
  providers,
  providersSection,
  sandboxRequestLink,
  type SandboxProvider,
  type SandboxProviderId,
} from '../../../content/sandboxes';
import { Section, SectionHeader } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { Reveal } from '../../ui/Reveal';
import { SandboxMock } from './SandboxMock';

const DEFAULT_PROVIDER: SandboxProviderId = 'azure';
const isProvider = (v: string | null): v is SandboxProviderId => !!v && providers.some((p) => p.id === v);

const tabId = (id: SandboxProviderId) => `sandbox-tab-${id}`;
const panelId = (id: SandboxProviderId) => `sandbox-panel-${id}`;

function ProviderPanel({ provider, active }: { provider: SandboxProvider; active: boolean }) {
  const { labels } = providersSection;
  return (
    <div
      role="tabpanel"
      id={panelId(provider.id)}
      aria-labelledby={tabId(provider.id)}
      hidden={!active}
      tabIndex={0}
      className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-micro text-muted uppercase">{provider.unit}</p>
          <h3 className="mt-3 text-h3 sm:text-2xl">{provider.name}</h3>
          <p className="mt-2 text-body">{provider.summary}</p>
        </div>
        <SandboxMock
          title={provider.mock.title}
          rows={provider.mock.rows}
          className="col-span-12 self-start md:col-span-5"
        />
      </div>

      <div className="mt-8 grid gap-x-10 gap-y-8 border-t border-line pt-8 md:grid-cols-2">
        <div>
          <h4 className="font-medium text-heading">{labels.learnerGets}</h4>
          <ul className="mt-4 space-y-3">
            {provider.learnerGets.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-body">
                <Check className="mt-0.5 h-4 w-4 flex-none text-blue-600" strokeWidth={1.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-heading">{labels.guardrails}</h4>
          <ul className="mt-4 space-y-3">
            {provider.guardrails.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-body">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-blue-600" strokeWidth={1.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h4 className="font-mono text-micro text-muted uppercase">{labels.typicalUse}</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {provider.typicalUse.map((use) => (
              <li key={use} className="rounded-md border border-line px-2 py-1 text-xs text-heading">
                {use}
              </li>
            ))}
          </ul>
        </div>
        <SmartLink
          href={sandboxRequestLink(provider)}
          className="group inline-flex flex-none items-center gap-1.5 text-sm font-medium text-blue-600"
        >
          {labels.request}
          <span className="sr-only">: {provider.name}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
        </SmartLink>
      </div>
    </div>
  );
}

/** Provider tabs: a grid of tabs on phones, a vertical list beside the panel on desktop. */
export function ProviderExplorer() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Start on Azure so the prerendered HTML matches; sync from ?provider= after mount.
  const [selected, setSelected] = useState<SandboxProviderId>(DEFAULT_PROVIDER);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const p = params.get('provider');
    setSelected(isProvider(p) ? p : DEFAULT_PROVIDER);
  }, [params]);

  const choose = (id: SandboxProviderId, focus = false) => {
    setSelected(id);
    if (focus) tabRefs.current[id]?.focus();
    const search = id === DEFAULT_PROVIDER ? '' : `?provider=${id}`;
    // Keep the #hash so the page does not jump back to the top.
    navigate({ search, hash: location.hash }, { replace: true, preventScrollReset: true });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = providers.findIndex((p) => p.id === selected);
    const last = providers.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    choose(providers[next].id, true);
  };

  return (
    <Section tone="paper" id="providers" labelledBy="providers-title">
      <SectionHeader
        id="providers-title"
        eyebrow={providersSection.eyebrow}
        title={providersSection.title}
        intro={providersSection.intro}
      />

      <Reveal className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6 lg:mt-16">
        <div
          role="tablist"
          aria-label={providersSection.tabsLabel}
          onKeyDown={onKeyDown}
          className="col-span-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:content-start"
        >
          {providers.map((p) => {
            const active = p.id === selected;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[p.id] = el;
                }}
                type="button"
                role="tab"
                id={tabId(p.id)}
                aria-selected={active}
                aria-controls={panelId(p.id)}
                tabIndex={active ? 0 : -1}
                onClick={() => choose(p.id)}
                className={`flex min-w-0 flex-col items-start rounded-control border px-4 py-3 text-left transition-colors ${
                  active
                    ? 'border-ink-950 bg-ink-950 text-white'
                    : 'border-line-strong bg-white text-heading hover:border-ink-950'
                }`}
              >
                <span className="text-sm font-medium">
                  <span className="lg:hidden">{p.shortName}</span>
                  <span className="hidden lg:inline">{p.name}</span>
                </span>
                <span className={`mt-1 max-w-full truncate font-mono text-micro ${active ? 'text-slate-300' : 'text-muted'}`}>
                  {p.unit}
                </span>
              </button>
            );
          })}
        </div>

        <div className="col-span-12 lg:col-span-9">
          {providers.map((p) => (
            <ProviderPanel key={p.id} provider={p} active={p.id === selected} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
