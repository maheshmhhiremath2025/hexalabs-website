import { security } from '../../../content/home';
import { Section, SectionIntro } from '../../ui/Section';
import { Art } from '../../ui/Art';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { accentTitle } from './accentTitle';

/**
 * Six white cards, one per control, each with its own illustration on top
 * (zooms slowly on hover), then the control's name and one line.
 */
export function Security() {
  return (
    <Section tone="paper" labelledBy="security-title">
      <SectionIntro
        id="security-title"
        eyebrow={security.eyebrow}
        title={accentTitle(security.title, security.accent)}
        intro={security.intro}
      />

      <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {security.items.map((item) => (
          <RevealItem as="li" key={item.term} className="h-full">
            <article className="card card-hover group flex h-full flex-col overflow-hidden">
              <div aria-hidden="true" className="art-zoom m-2 mb-0 aspect-[6/5] overflow-hidden rounded-[12px]">
                <Art
                  name={item.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg leading-snug font-medium tracking-tight">{item.term}</h3>
                <p className="mt-1.5 text-sm leading-6 text-body">{item.body}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
