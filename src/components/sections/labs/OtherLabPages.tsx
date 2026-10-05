import { otherLabPages } from '../../../content/labs';
import { LogoTile } from '../../ui/LogoTile';
import type { ProductId } from '../../../content/products';
import { Accent } from '../../ui/Accent';
import { LinkArrow } from '../../ui/LinkArrow';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

const items: {
  item: (typeof otherLabPages)[keyof typeof otherLabPages];
  /** Official logos of what is on that page (visual only — the link text names the page). */
  marks: ProductId[];
}[] = [
  { item: otherLabPages.official, marks: ['azure', 'aws'] },
  { item: otherLabPages.sandboxes, marks: ['azure', 'aws', 'gcp', 'oci', 'databricks', 'ai-foundry'] },
];

/** Points visitors who want official labs or sandboxes to the right page: two horizontal cards with official logos. */
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
        {items.map(({ item, marks }) => (
          <RevealItem as="li" key={item.href}>
            <article className="card card-hover group relative grid h-full overflow-hidden sm:grid-cols-2">
              <LogoTile ids={marks} badge="3rem" className="m-2 aspect-[2/1] rounded-[12px] sm:mr-0 sm:aspect-auto sm:min-h-44" />
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
