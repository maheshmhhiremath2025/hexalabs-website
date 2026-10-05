/**
 * DEV-ONLY visual reference for the design system (route /_styleguide, never built
 * into production — see App.tsx). Shows every primitive on each surface.
 * Copy here is sample text built from real HexaLabs offerings; it is not site copy.
 */
import { Award, Cloud, Layers, MonitorSmartphone } from 'lucide-react';
import { Section, SectionIntro, SectionHeader } from '../components/ui/Section';
import { Accent } from '../components/ui/Accent';
import { ArtCard, IconCard } from '../components/ui/Cards';
import { Carousel } from '../components/ui/Carousel';
import { ButtonLink } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { LinkArrow } from '../components/ui/LinkArrow';
import { RevealGroup, RevealItem } from '../components/ui/Reveal';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { LogoTile } from '../components/ui/LogoTile';
import type { ProductId } from '../content/products';

const useCases: { logos: ProductId[]; title: string; body: string; href: string }[] = [
  { logos: ['azure'], title: 'Run an AZ-104 batch for 30 learners', body: 'Official Azure course labs, one environment per learner.', href: '/official-labs' },
  { logos: ['oci'], title: 'Give each learner an OCI sandbox', body: 'A real cloud console with limits on services, hours and spend.', href: '/sandboxes' },
  { logos: ['ubuntu', 'rocky', 'rhel'], title: 'Teach Linux on a browser desktop', body: 'Ubuntu, Rocky, RHEL or Oracle Linux — nothing to install.', href: '/labs' },
  { logos: ['microsoft', 'aws', 'google', 'oracle', 'redhat', 'cncf', 'databricks'], title: 'Pair the course with exam vouchers', body: 'Official vouchers from all major vendors.', href: '/certifications' },
  { logos: ['azure', 'aws'], title: 'Run the portal under your brand', body: 'Your logo, colours and domain on every screen.', href: '/for-training-companies' },
  { logos: ['windows-server'], title: 'Cap each learner’s daily hours', body: 'Hour caps reset at midnight; idle machines stop on their own.', href: '/for-training-companies' },
];

export default function StyleGuide() {
  return (
    <>
      <PageHero
        eyebrow="Style guide"
        title={{ before: 'The HexaLabs ', accent: 'design system', after: '.' }}
        body="Dev-only page. Every primitive on every surface: canvas, white, dark."
        actions={
          <>
            <ButtonLink href="/contact" size="lg" arrow="up-right">
              Primary
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghost">
              Ghost
            </ButtonLink>
          </>
        }
        image="ph-hero-official"
        overlap={
          <RevealGroup as="ul" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {[
              { i: Layers, t: 'Official labs', h: '/official-labs' },
              { i: Cloud, t: 'Cloud sandboxes', h: '/sandboxes' },
              { i: MonitorSmartphone, t: 'Lab machines', h: '/labs' },
              { i: Award, t: 'Certifications', h: '/certifications' },
            ].map((c) => (
              <RevealItem as="li" key={c.t}>
                <IconCard icon={c.i} title={c.t} body="One short line about it." href={c.h} compact />
              </RevealItem>
            ))}
          </RevealGroup>
        }
      />

      <Section tone="paper" labelledBy="sg-cards">
        <SectionIntro
          id="sg-cards"
          eyebrow="Lab catalogue"
          title={
            <>
              Crafting <Accent>hands-on</Accent> labs
            </>
          }
          intro="Centred intro: one or two sentences, max ~70 characters a line."
          actions={
            <ButtonLink href="/labs" variant="dark" arrow="up-right">
              See all labs
            </ButtonLink>
          }
        />
        <RevealGroup as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.slice(0, 3).map((u) => (
            <RevealItem as="li" key={u.title}>
              <ArtCard logos={u.logos} title={u.title} body={u.body} href={u.href} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="dark" labelledBy="sg-carousel" glow>
        <SectionIntro
          id="sg-carousel"
          title={
            <>
              Labs <Accent>in action</Accent>
            </>
          }
          intro="Dark feature section with a card carousel — use cases built only from real offerings."
        />
        <Carousel label="Use cases" className="mt-14">
          {useCases.map((u) => (
            <ArtCard
              key={u.title}
              logos={u.logos}
              chip="Use case"
              title={u.title}
              body={u.body}
              action={
                <ButtonLink href={u.href} variant="dark" size="sm" arrow="up-right">
                  Know more<span className="sr-only">: {u.title}</span>
                </ButtonLink>
              }
            />
          ))}
        </Carousel>
      </Section>

      <Section tone="white" labelledBy="sg-white">
        <SectionHeader id="sg-white" eyebrow="Left-aligned" title="SectionHeader on white" intro="The existing editorial header." />
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="/">Primary</ButtonLink>
          <ButtonLink href="/" variant="dark" arrow="up-right">
            Dark
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Secondary
          </ButtonLink>
          <Chip>Use case</Chip>
          <Chip tone="soft">Azure</Chip>
          <Chip tone="accent">Offer</Chip>
          <LinkArrow href="/">Know more</LinkArrow>
        </div>
        <Carousel
          label="Top stories"
          className="mt-14"
          header={<p className="eyebrow">Top stories</p>}
          slideClassName="w-[86%] lg:w-[calc((100%-1.25rem)/1.6)]"
        >
          {useCases.map((u) => (
            <article key={u.title} className="card card-hover group grid h-full overflow-hidden sm:grid-cols-[2fr_3fr]">
              <LogoTile ids={u.logos} className="m-2 aspect-[3/2] rounded-[12px] sm:mr-0 sm:aspect-auto" />
              <div className="flex flex-col p-6 sm:p-8">
                <h3 className="text-xl">{u.title}</h3>
                <p className="mt-2 text-sm text-body">{u.body}</p>
                <div className="mt-auto pt-8">
                  <LinkArrow href={u.href} stretched srContext={u.title}>
                    Read more
                  </LinkArrow>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </Section>

      <CtaBand />
    </>
  );
}
