import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { Check, ShieldCheck } from 'lucide-react';
import { providers, providersSection, sandboxRequestLink, type SandboxProvider, type SandboxProviderId } from '../../../content/sandboxes';
import { Section, SectionIntro } from '../../ui/Section';
import { ButtonLink } from '../../ui/Button';
import { Chip } from '../../ui/Chip';
import { LogoTile } from '../../ui/LogoTile';
import { MarkBadge } from '../../ui/MarkBadge';
import { Reveal } from '../../ui/Reveal';
import { PillScroller, pillClass, pillRailClass, withAccent } from './pills';

const DEFAULT_PROVIDER: SandboxProviderId = 'azure';
const isProvider = (v: string | null): v is SandboxProviderId => !!v && providers.some((p) => p.id === v);

const tabId = (id: SandboxProviderId) => `sandbox-tab-${id}`;
const panelId = (id: SandboxProviderId) => `sandbox-panel-${id}`;

function List({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Check }) {
  return (
    <div>
      <h4 className="text-base font-medium text-heading">{title}</h4>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.9375rem] leading-6 text-body">
            <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600/10 text-blue-600">
              <Icon className="h-3 w-3" strokeWidth={2.25} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Compact official mark in a provider tab: a round white badge, so it reads on the dark (active) pill. */
function TabMark({ id }: { id: SandboxProviderId }) {
  return <MarkBadge id={id} size={22} />;
}

function ProviderPanel({ provider, active }: { provider: SandboxProvider; active: boolean }) {
  const { labels } = providersSection;
  return (
    <div
      role="tabpanel"
      id={panelId(provider.id)}
      aria-labelledby={tabId(provider.id)}
      hidden={!active}
      tabIndex={0}
      className="card p-6 sm:p-10"
      // Soft fade-up whenever a panel is shown (CSS keyframe; off under reduced motion).
      style={{ animation: 'rise-in 560ms var(--ease-smooth) both' }}
    >
      <div className="grid gap-6 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_17rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-2xl">
          <p>
            <Chip tone="soft" className="font-mono uppercase">
              {provider.unit}
            </Chip>
          </p>
          <h3 className="mt-4 text-[1.75rem] leading-tight font-light tracking-[-0.03em] sm:text-[2.125rem]">{provider.name}</h3>
          <p className="mt-3 text-body sm:text-lg sm:leading-7">{provider.summary}</p>
          <ButtonLink href={sandboxRequestLink(provider)} variant="dark" arrow="up-right" className="mt-6">
            {labels.request}
            <span className="sr-only">: {provider.name}</span>
          </ButtonLink>
        </div>
        {/* The provider's official logo (decorative: the heading names it). */}
        <LogoTile ids={[provider.id]} className="order-first aspect-[2/1] rounded-[14px] md:order-none md:aspect-[3/2]" />
      </div>

      <div className="grid gap-x-10 gap-y-10 pt-8 md:grid-cols-2 lg:grid-cols-3">
        <List title={labels.learnerGets} items={provider.learnerGets} icon={Check} />
        <List title={labels.guardrails} items={provider.guardrails} icon={ShieldCheck} />

        <aside aria-label={provider.mock.title} className="rounded-[14px] bg-raised p-6 md:col-span-2 lg:col-span-1">
          <p className="eyebrow">{provider.mock.title}</p>
          <dl className="mt-4">
            {provider.mock.rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-4 border-t border-slate-250/70 py-3 text-sm">
                <dt className="text-body">{r.label}</dt>
                <dd className="text-right font-medium text-heading">{r.value}</dd>
              </div>
            ))}
          </dl>
          <h4 className="eyebrow mt-6">{labels.typicalUse}</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {provider.typicalUse.map((use) => (
              <li key={use} className="rounded-full bg-white px-3 py-1.5 text-xs text-heading shadow-[0_1px_2px_rgb(6_20_38/0.08)]">
                {use}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/** Provider tabs as a white pill rail; the selected provider shows in a large white card below. */
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
      <SectionIntro
        id="providers-title"
        eyebrow={providersSection.eyebrow}
        title={withAccent(providersSection.title, 'cloud')}
        intro={providersSection.intro}
      />

      <Reveal className="mt-10 sm:mt-12">
        <PillScroller>
          <div role="tablist" aria-label={providersSection.tabsLabel} onKeyDown={onKeyDown} className={pillRailClass}>
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
                  className={pillClass(active)}
                >
                  <TabMark id={p.id} />
                  <span className="lg:hidden">{p.shortName}</span>
                  <span className="hidden lg:inline">{p.name}</span>
                </button>
              );
            })}
          </div>
        </PillScroller>

        <div className="mt-6 sm:mt-8">
          {providers.map((p) => (
            <ProviderPanel key={p.id} provider={p} active={p.id === selected} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
