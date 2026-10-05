import {
  Hexagon,
  MonitorSmartphone,
  ShieldCheck,
  User,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { hero, howItWorks } from "../../../content/home";
import { Section, SectionIntro } from "../../ui/Section";
import { Reveal } from "../../ui/Reveal";
import { accentTitle } from "./accentTitle";

const roleIcons: LucideIcon[] = [MonitorSmartphone, UserCog, ShieldCheck];

/** Solid hairline in a soft blue that reads on the canvas panel. */
const line = "bg-[color-mix(in_srgb,var(--blue-600)_30%,var(--canvas))]";

/** Vertical connector, centred. */
function VLine({ className = "h-5" }: { className?: string }) {
  return <span className={`mx-auto block w-px ${line} ${className}`} />;
}

/** Small white pill sitting on a connector. */
function Tag({ children }: { children: string }) {
  return (
    <p className="mx-auto w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-heading shadow-card ring-1 ring-[color-mix(in_srgb,var(--blue-600)_22%,transparent)]">
      {children}
    </p>
  );
}

/** Small white box beside the HexaLabs node (trainer, platform). */
function SideBox({
  icon: Icon,
  title,
  notes,
  side,
}: {
  icon: LucideIcon;
  title: string;
  notes: string[];
  side: "left" | "right";
}) {
  const connector =
    side === "left" ? "sm:after:left-full" : "sm:after:right-full";
  return (
    <div
      className={`relative rounded-xl bg-white p-3.5 shadow-card sm:after:absolute sm:after:top-1/2 sm:after:h-px sm:after:w-3 sm:after:content-[''] sm:after:bg-[color-mix(in_srgb,var(--blue-600)_30%,var(--canvas))] ${connector}`}
    >
      <p className="flex items-center gap-2 text-sm font-medium text-heading">
        <Icon className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
        {title}
      </p>
      <ul className="mt-2 space-y-0.5 text-xs leading-5 text-slate-600">
        {notes.map((n) => (
          <li key={n} className="first-letter:uppercase">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The flow from learners to their labs, drawn in HTML with the system's card tokens:
 * white cards with soft shadows on a rounded canvas panel, joined by solid hairlines.
 * Decorative (aria-hidden): the caption and role list beside it carry the same meaning.
 */
function FlowPanel() {
  const d = hero.diagram;
  const [trainer, platform] = [howItWorks.roles[1], howItWorks.roles[2]];
  return (
    <div
      aria-hidden="true"
      className="rounded-[var(--panel-radius)] bg-canvas p-4 sm:p-8"
    >
      {/* Learners — three on phones, four from sm up */}
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {d.learnersWide.map((l, i) => {
          const traced = i === d.tracedLearner;
          const phone = d.learnersNarrow.includes(l);
          return (
            <li
              key={l}
              className={`relative ${phone ? "block" : "hidden sm:block"}`}
            >
              <span
                className={`flex items-center justify-center gap-1.5 rounded-[10px] bg-white px-1.5 py-2.5 text-[13px] font-medium capitalize shadow-card ${
                  traced ? "text-blue-700 ring-2 ring-blue-600" : "text-heading"
                }`}
              >
                <User
                  className="hidden h-3.5 w-3.5 flex-none sm:block"
                  strokeWidth={1.75}
                />
                {l}
              </span>
              <span className={`absolute top-full left-1/2 h-4 w-px ${line}`} />
            </li>
          );
        })}
      </ul>
      {/* Bus joining the learner stems: from the first column's centre to the last's */}
      <div className="relative h-4">
        <span
          className={`absolute bottom-0 h-px left-[calc((100%-1rem)/6)] right-[calc((100%-1rem)/6)] sm:left-[calc((100%-2.25rem)/8)] sm:right-[calc((100%-2.25rem)/8)] ${line}`}
        />
      </div>
      <VLine className="h-4" />
      <Tag>{`${d.httpsTag} · ${d.httpsNote}`}</Tag>
      <VLine className="h-4" />

      {/* HexaLabs node with the trainer and platform guardrails either side */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="order-2 sm:order-none">
          <SideBox
            icon={UserCog}
            title={trainer.title}
            notes={d.trainer.notes}
            side="left"
          />
        </div>
        {/* Middle cell stretches to the row height so the connectors meet the node */}
        <div className="order-1 col-span-2 sm:order-none sm:col-span-1 sm:flex sm:flex-col sm:self-stretch">
          <span className={`mx-auto hidden w-px flex-1 sm:block ${line}`} />
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-ink-950 px-5 py-4 text-white shadow-float">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,var(--blue-400)_18%,transparent)] text-blue-400 ring-1 ring-[color-mix(in_srgb,var(--blue-400)_30%,transparent)]">
              <Hexagon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-base leading-tight font-medium">
                {d.entry.name}
              </span>
              <span className="block text-xs text-slate-300">
                {d.entry.host}
              </span>
            </span>
          </div>
          <span className={`mx-auto hidden w-px flex-1 sm:block ${line}`} />
        </div>
        <div className="order-3 sm:order-none">
          <SideBox
            icon={ShieldCheck}
            title={platform.title}
            notes={d.guardrails}
            side="right"
          />
        </div>
      </div>

      <VLine className="h-4" />
      <Tag>{d.isolationTag}</Tag>
      <VLine className="h-4" />
      {/* Fan out to the two environment groups (one column on phones) */}
      <div className="relative h-4">
        <span
          className={`absolute inset-y-0 left-1/2 w-px sm:hidden ${line}`}
        />
        <span
          className={`absolute top-0 hidden h-px sm:block left-[calc((100%-0.75rem)/4)] right-[calc((100%-0.75rem)/4)] ${line}`}
        />
        <span
          className={`absolute inset-y-0 hidden w-px sm:block left-[calc((100%-0.75rem)/4)] ${line}`}
        />
        <span
          className={`absolute inset-y-0 hidden w-px sm:block right-[calc((100%-0.75rem)/4)] ${line}`}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {d.groups.map((g, gi) => (
          <div key={g.label} className="rounded-xl bg-white p-4 shadow-card">
            <p className="text-sm font-medium text-heading">{g.label}</p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {g.items.map((item, ii) => {
                const traced =
                  gi === d.tracedTarget[0] && ii === d.tracedTarget[1];
                return (
                  <li
                    key={item}
                    className={`rounded-lg px-2.5 py-2 text-[13px] leading-tight ${
                      traced
                        ? "bg-white font-medium text-blue-700 ring-2 ring-blue-600"
                        : "bg-canvas text-heading"
                    }`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-white p-4 shadow-card">
        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-sm font-medium text-heading">
            {d.official.label}
          </span>
          <span className="text-xs font-medium text-blue-700">
            {d.official.count}
          </span>
        </p>
        <p className="mt-1.5 hidden text-xs leading-5 text-slate-600 sm:block">
          {d.official.codesWide}
        </p>
        <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:hidden">
          {d.official.codesNarrow.map((c) => (
            <span key={c} className="block">
              {c}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** "How it works": its own light band — summary and roles beside the flow panel. */
export function HowItWorks() {
  return (
    <Section tone="white" labelledBy="how-title">
      <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionIntro
            id="how-title"
            align="left"
            eyebrow={howItWorks.eyebrow}
            title={accentTitle(howItWorks.title, howItWorks.accent)}
            intro={hero.caption}
          />
          <ul className="mt-9 grid gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-1 lg:gap-5">
            {howItWorks.roles.map((r, i) => {
              const Icon = roleIcons[i];
              return (
                <li key={r.title} className="flex gap-4">
                  <span className="icon-bubble">
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <p className="pt-0.5 text-body">
                    <span className="block font-medium text-heading">
                      {r.title}
                    </span>
                    {r.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal className="col-span-12 lg:col-span-7">
          <FlowPanel />
        </Reveal>
      </div>
    </Section>
  );
}
