import { otherLabPages } from '../../../content/labs';
import { Art, type ArtName } from '../../ui/Art';
import { Accent } from '../../ui/Accent';
import { LinkArrow } from '../../ui/LinkArrow';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

const items: {
  item: (typeof otherLabPages)[keyof typeof otherLabPages];
  /** One photo for that page (visual only — the link text names the page). */
  image: ArtName;
}[] = [
  { item: otherLabPages.official, image: 'ph-cat-official' },
  { item: otherLabPages.sandboxes, image: 'ph-cat-sandboxes' },
];

/** Points visitors who want official labs or sandboxes to the right page: two horizontal photo cards. */
export function OtherLabPages() {
  return (
    <Section tone="white" labelledBy="other-labs-title">
      <SectionIntro
        id="other-labs-title"
        eyebrow="Not what you need?"
        title={
          <>
            Other kinds of <Accent>labs</Accent>
          </>
        }
      />
      <RevealGroup as="ul" className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2">
        {items.map(({ item, image }) => (
          <RevealItem as="li" key={item.href}>
            <article className="card card-hover group relative grid h-full overflow-hidden sm:grid-cols-2">
              <div aria-hidden="true" className="art-zoom m-2 aspect-[2/1] overflow-hidden rounded-[12px] sm:mr-0 sm:aspect-auto sm:min-h-44">
                <Art name={image} sizes="(min-width: 1024px) 25vw, 100vw" className="h-full w-full" />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <h3 className="text-xl leading-snug font-medium tracking-tight">{item.question}</h3>
                <div className="mt-auto pt-8">
                  <LinkArrow href={item.href} stretched>
                    {item.label}
                  </LinkArrow>
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
