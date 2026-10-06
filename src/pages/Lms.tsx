import {
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  Code2,
  FlaskConical,
  Megaphone,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { lmsCta, lmsFeatures, lmsHero, lmsPlans, lmsSteps, lmsWhiteLabel, type LmsPlan } from '../content/lms';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { Art } from '../components/ui/Art';
import { ButtonLink } from '../components/ui/Button';
import { IconCard } from '../components/ui/Cards';
import { Chip } from '../components/ui/Chip';
import { NumberedSteps } from '../components/ui/NumberedSteps';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { Section, SectionIntro } from '../components/ui/Section';
import { accentText } from '../components/sections/training/accentText';

const heroIcons: Record<(typeof lmsHero.cards)[number]['id'], LucideIcon> = {
  ai: Sparkles,
  live: Video,
  labs: FlaskConical,
  certs: Award,
};

const featureIcons: Record<(typeof lmsFeatures.items)[number]['id'], LucideIcon> = {
  courses: BookOpen,
  ai: Sparkles,
  tutor: Bot,
  labs: FlaskConical,
  live: Video,
  paths: Route,
  code: Code2,
  exam: ShieldCheck,
  certs: Award,
  reports: BarChart3,
  engage: Trophy,
  announce: Megaphone,
};

/** Four white cards overlapping the bottom of the hero. */
function HeroCards() {
  return (
    <ul aria-label="LMS highlights" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
      {lmsHero.cards.map((c, i) => (
        <li key={c.id} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
          <IconCard icon={heroIcons[c.id]} title={c.title} body={c.line} as="h2" compact />
        </li>
      ))}
    </ul>
  );
}

function PlanCard({ plan }: { plan: LmsPlan }) {
  const featured = Boolean(plan.highlighted);
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`card-hover relative flex h-full flex-col overflow-hidden rounded-card p-6 sm:p-8 ${
        featured ? 'surface-dark shadow-float ring-1 ring-blue-400/30' : 'card'
      }`}
    >
      {featured ? <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" /> : null}
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 id={`plan-${plan.id}`} className="text-2xl font-medium tracking-tight">
            {plan.name}
          </h3>
          {featured ? <Chip tone="light">Most popular</Chip> : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-body">{plan.forWho}</p>
        <div className="mt-6 border-y border-line py-5">
          <p className="display text-[2rem] leading-tight text-heading">{plan.price}</p>
          <p className="mt-1.5 font-mono text-micro text-muted uppercase">{plan.unit}</p>
        </div>
        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-6 text-body">
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${
                  featured ? 'bg-blue-400/15 text-blue-400' : 'bg-canvas text-blue-600'
                }`}
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <ButtonLink href={plan.cta.href} variant={featured ? 'primary' : 'dark'} arrow="up-right" className="mt-8 w-full">
          {plan.cta.label}
          <span className="sr-only"> for the {plan.name} plan</span>
        </ButtonLink>
      </div>
    </article>
  );
}

/**
 * Section rhythm: hero with the LMS illustration and four overlapping cards →
 * features (paper) → four steps on a photo band (dark) → white-label split (white)
 * → plans (paper) → closing banner.
 */
export default function Lms() {
  return (
    <>
      <PageHero
        eyebrow={lmsHero.eyebrow}
        title={lmsHero.title}
        body={lmsHero.body}
        actions={
          <>
            <ButtonLink href={lmsHero.primary.href} size="lg" arrow="up-right">
              {lmsHero.primary.label}
            </ButtonLink>
            <ButtonLink href={lmsHero.secondary.href} variant="ghost" size="lg" arrow="up-right">
              {lmsHero.secondary.label}
            </ButtonLink>
          </>
        }
        aside={
          <figure className="group overflow-hidden rounded-[16px] shadow-card ring-1 ring-white/10 sm:rounded-[20px]">
            <div className="art-zoom">
              <Art
                name="il-lms-hero"
                alt={lmsHero.imageAlt}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="block"
                imgClassName="block h-auto w-full"
              />
            </div>
          </figure>
        }
        overlap={<HeroCards />}
      />

      <Section tone="paper" id="features" labelledBy="lms-features-title" className="scroll-mt-20">
        <SectionIntro
          id="lms-features-title"
          eyebrow={lmsFeatures.eyebrow}
          title={accentText(lmsFeatures.title, lmsFeatures.accent)}
          intro={lmsFeatures.intro}
        />
        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {lmsFeatures.items.map((f) => (
            <RevealItem as="li" key={f.id} className="h-full">
              <IconCard icon={featureIcons[f.id]} title={f.title} body={f.body} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="dark" image="ph-uc-batch" labelledBy="lms-steps-title">
        <SectionIntro id="lms-steps-title" eyebrow={lmsSteps.eyebrow} title={accentText(lmsSteps.title, lmsSteps.accent)} />
        <NumberedSteps steps={lmsSteps.steps} className="mt-12 lg:mt-14" />
      </Section>

      <Section tone="white" labelledBy="lms-wl-title">
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12 lg:gap-x-12">
          <Reveal className="col-span-12 lg:col-span-7">
            <figure className="group overflow-hidden rounded-[20px] shadow-card sm:rounded-panel">
              <div className="art-zoom">
                <Art
                  name="il-whitelabel"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="block"
                  imgClassName="block h-auto w-full"
                />
              </div>
            </figure>
          </Reveal>
          <div className="col-span-12 lg:col-span-5">
            <SectionIntro
              id="lms-wl-title"
              align="left"
              eyebrow={lmsWhiteLabel.eyebrow}
              title={accentText(lmsWhiteLabel.title, lmsWhiteLabel.accent)}
              intro={lmsWhiteLabel.body}
            />
            <ul className="mt-8 space-y-3">
              {lmsWhiteLabel.points.map((p) => (
                <li key={p} className="flex gap-3 text-heading">
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="plans" labelledBy="lms-plans-title" className="scroll-mt-20">
        <SectionIntro
          id="lms-plans-title"
          eyebrow={lmsPlans.eyebrow}
          title={accentText(lmsPlans.title, lmsPlans.accent)}
          intro={lmsPlans.intro}
        />
        <RevealGroup as="ul" className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {lmsPlans.plans.map((plan) => (
            <RevealItem as="li" key={plan.id} className="h-full">
              <PlanCard plan={plan} />
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-sm text-muted">{lmsPlans.note}</p>
      </Section>

      <CtaBand title={lmsCta.title} body={lmsCta.body} cta={lmsCta.cta} chip="HexaLabs LMS" />
    </>
  );
}
