import { aboutHero, audiences, principles, whatWeDo } from '../content/about';
import { site } from '../content/site';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { Section, SectionHeader, Eyebrow } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';

export default function About() {
  return (
    <>
      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} body={aboutHero.body} />

      <Section tone="white" labelledBy="what-title">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
            <h2 id="what-title" className="mt-5 text-h2">
              {whatWeDo.title}
            </h2>
          </div>
          <div className="col-span-12 space-y-5 text-lead text-body lg:col-span-6 lg:col-start-7">
            {whatWeDo.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="principles-title">
        <SectionHeader id="principles-title" eyebrow={principles.eyebrow} title={principles.title} />
        <ol className="mt-14 border-b border-line">
          {principles.items.map((item, i) => (
            <Reveal as="li" key={item.title} className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-line py-8 lg:py-10">
              <span aria-hidden="true" className="col-span-12 font-mono text-micro text-muted lg:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="col-span-12 text-h3 lg:col-span-5">{item.title}</h3>
              <p className="col-span-12 text-body lg:col-span-5 lg:col-start-8">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="audiences-title">
        <SectionHeader id="audiences-title" eyebrow={audiences.eyebrow} title={audiences.title} />
        <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {audiences.items.map((item, i) => (
            <li key={item.title} className="border-t border-line pt-6">
              <span aria-hidden="true" className="font-mono text-micro text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-h3">{item.title}</h3>
              <p className="mt-2 text-body">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-body">
          {audiences.contact.text}{' '}
          <a href={`mailto:${site.contact.email}`} className="link font-medium">
            {site.contact.email}
          </a>
          .
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
