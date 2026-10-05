import { comparisonSection, providers, sandboxRequestLink, type SandboxProviderId } from '../../../content/sandboxes';
import { Accent } from '../../ui/Accent';
import { ArtCard } from '../../ui/Cards';
import { ProductMark } from '../../ui/ProductMark';
import { products } from '../../../content/products';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

/**
 * "Use case" cards built only from real offerings on this page (no customers, no stats).
 * Title = what a trainer sets up; body = the provider summary from src/content/sandboxes.ts.
 * Each card shows its provider's own artwork and official mark (src/content/products.ts).
 */
const useCases: { provider: SandboxProviderId; title: string }[] = [
  {
    provider: 'azure',
    title: `Run ${comparisonSection.rows[2].cells.sandbox}`,
  },
  {
    provider: 'oci',
    title: 'Give each learner their own OCI compartment',
  },
  {
    provider: 'ai-foundry',
    title: 'Give each learner their own Azure OpenAI resource',
  },
];

export function UseCases() {
  return (
    <Section tone="white" labelledBy="usecases-title">
      <SectionIntro
        id="usecases-title"
        eyebrow="Use cases"
        title={
          <>
            One sandbox per learner, <Accent>per course</Accent>.
          </>
        }
      />
      <RevealGroup as="ul" className="mt-12 grid gap-x-5 gap-y-8 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u) => {
          const p = providers.find((x) => x.id === u.provider)!;
          return (
            <RevealItem as="li" key={u.provider} className="relative h-full">
              {/* Official mark over the artwork; it is the only place the provider is named, so screen readers hear it. */}
              <p className="pointer-events-none absolute top-3 left-3 z-[2]">
                <ProductMark id={u.provider} />
              </p>
              <ArtCard
                art={products[u.provider].art}
                chip={p.unit}
                title={u.title}
                body={p.summary}
                href={sandboxRequestLink(p)}
                linkLabel="Request this sandbox"
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
