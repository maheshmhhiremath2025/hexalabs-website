import { otherLabPages } from '../../../content/labs';
import type { ArtName } from '../../ui/Art';
import { Art } from '../../ui/Art';
import { ProductMark } from '../../ui/ProductMark';
import type { ProductId } from '../../../content/products';
import { Accent } from '../../ui/Accent';
import { LinkArrow } from '../../ui/LinkArrow';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

const items: {
  item: (typeof otherLabPages)[keyof typeof otherLabPages];
  /** Category artwork: each page spans several products, so no one product's artwork fits. */
  art: ArtName;
  /** Official marks of what is on that page (visual only — the question names them or the page does). */
  marks: ProductId[];
}[] = [
  { item: otherLabPages.official, art: 'official-labs', marks: ['azure', 'aws'] },
  { item: otherLabPages.sandboxes, art: 'sandboxes', marks: ['gcp', 'oci'] },
];

/** Points visitors who want official labs or sandboxes to the right page: two horizontal art cards. */
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
        {items.map(({ item, art, marks }) => (
          <RevealItem as="li" key={item.href}>
            <article className="card card-hover group relative grid h-full overflow-hidden sm:grid-cols-[2fr_3fr]">
              <div className="art-zoom aspect-[3/2] sm:aspect-auto">
                <Art name={art} className="h-full w-full" sizes="(min-width: 1024px) 230px, (min-width: 640px) 40vw, 100vw" />
              </div>
              {/* Outside .art-zoom so the logos don't zoom with the artwork. */}
              <ul aria-hidden="true" className="pointer-events-none absolute top-3 left-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5 sm:max-w-[calc(40%-1.5rem)]">
                {marks.map((id) => (
                  <li key={id}>
                    <ProductMark id={id} />
                  </li>
                ))}
              </ul>
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
