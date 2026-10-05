import { Briefcase, Building2, GraduationCap, type LucideIcon } from 'lucide-react';
import { aboutHero, audiences, principles, whatWeDo } from '../content/about';
import { labsMenu, site } from '../content/site';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { Section, SectionIntro } from '../components/ui/Section';
import { Accent } from '../components/ui/Accent';
import { Art, type ArtName } from '../components/ui/Art';
import { ArtCard, IconCard } from '../components/ui/Cards';
import { ButtonLink } from '../components/ui/Button';
import { Carousel } from '../components/ui/Carousel';
import { Chip } from '../components/ui/Chip';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { accentText } from '../components/sections/training/accentText';

/** One photo per kind of lab (same as the home catalogue). */
const kindImages: ArtName[] = ['ph-cat-official', 'ph-cat-sandboxes', 'ph-cat-machines', 'ph-cat-certifications'];

/** What HexaLabs runs — the four kinds of lab plus the training-company program. */
const offerings: { chip: string; title: string; body: string; href: string; image: ArtName }[] = [
  ...labsMenu.items.map((item, i) => ({
    chip: ['Course labs', 'Sandboxes', 'Browser labs', 'Vouchers'][i] ?? 'Labs',
    title: item.label,
    body: `${item.description ?? ''}.`,
    href: item.href,
    image: kindImages[i] ?? 'ph-cat-official',
  })),
  {
    chip: 'For trainers',
    title: 'For training companies',
    body: 'Lab Console, reports, white-label and the partner program.',
    href: '/for-training-companies',
    image: 'ph-uc-whitelabel',
  },
];

const audienceLook: { icon: LucideIcon; href: string }[] = [
  { icon: Building2, href: '/for-training-companies' },
  { icon: Briefcase, href: '/labs' },
  { icon: GraduationCap, href: '/sandboxes' },
];

export default function About() {
  return (
    <>
      <PageHero
        image="ph-hero-about"
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        body={aboutHero.body}
        actions={
          <>
            <ButtonLink href="/contact" size="lg" arrow="up-right" className="w-full sm:w-auto">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/labs" variant="ghost" size="lg" className="w-full sm:w-auto">
              See lab catalogue
            </ButtonLink>
          </>
        }
      />

      {/* What we do — editorial split: statement and text left, team photo right */}
      <Section tone="paper" labelledBy="what-title">
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionIntro id="what-title" eyebrow={whatWeDo.eyebrow} title={accentText(whatWeDo.title, 'every lab')} align="left" />
            <p className="mt-8 text-xl leading-8 font-light tracking-tight text-heading sm:text-2xl sm:leading-9">{whatWeDo.paragraphs[0]}</p>
            {whatWeDo.paragraphs.slice(1).map((p) => (
              <p key={p} className="mt-6 text-lead text-body">
                {p}
              </p>
            ))}
          </div>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8">
            <figure className="group relative">
              <div aria-hidden="true" className="art-zoom aspect-[4/3] overflow-hidden rounded-[20px] sm:rounded-panel lg:aspect-[4/5]">
                <Art name="ph-about-team" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full" position="50% 40%" />
              </div>
              <figcaption className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
                <Chip className="font-mono shadow-card">{site.portalLabel}</Chip>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* What we run — dark feature section with a card carousel */}
      <Section tone="dark" image="ph-band-datacenter" labelledBy="run-title">
        <SectionIntro
          id="run-title"
          eyebrow="What we run"
          title={
            <>
              Labs for every <Accent>course</Accent> you teach.
            </>
          }
          intro="Official course labs, cloud sandboxes, browser lab machines and exam vouchers — all in one portal."
        />
        <Carousel label="What we run" className="mt-12 lg:mt-14">
          {offerings.map((o) => (
            <ArtCard
              key={o.title}
              image={o.image}
              chip={o.chip}
              title={o.title}
              body={o.body}
              action={
                <ButtonLink href={o.href} variant="dark" size="sm" arrow="up-right">
                  Know more<span className="sr-only"> about {o.title}</span>
                </ButtonLink>
              }
            />
          ))}
        </Carousel>
      </Section>

      {/* How we work — three numbered principles */}
      <Section tone="white" labelledBy="principles-title">
        <SectionIntro id="principles-title" eyebrow={principles.eyebrow} title={accentText(principles.title, 'Three rules')} />
        <RevealGroup as="ol" className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {principles.items.map((item, i) => (
            <RevealItem as="li" key={item.title} className="h-full">
              <div className="flex h-full flex-col rounded-card bg-raised p-6 sm:p-8">
                <span aria-hidden="true" className="display text-accent text-5xl leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-xl leading-snug font-medium tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-body">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Who we work with */}
      <Section tone="paper" labelledBy="audiences-title">
        <SectionIntro id="audiences-title" eyebrow={audiences.eyebrow} title={accentText(audiences.title, 'run training')} />
        <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {audiences.items.map((item, i) => (
            <RevealItem as="li" key={item.title} className="h-full">
              <IconCard icon={audienceLook[i]?.icon ?? Building2} title={item.title} body={item.body} href={audienceLook[i]?.href} />
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-12 text-center text-body">
          {audiences.contact.text}{' '}
          <a href={`mailto:${site.contact.email}`} className="link-underline font-medium">
            {site.contact.email}
          </a>
          .
        </p>
      </Section>

      <CtaBand chip="About HexaLabs" illustration="il-cta-batch" />
    </>
  );
}
