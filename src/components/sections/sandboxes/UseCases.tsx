import { comparisonSection, providers, sandboxRequestLink, type SandboxProviderId } from '../../../content/sandboxes';
import { Accent } from '../../ui/Accent';
import { ArtCard } from '../../ui/Cards';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro } from '../../ui/Section';

/**
 * "Use case" cards built only from real offerings on this page (no customers, no stats).
 * Title = what a trainer sets up; body = the provider summary from src/content/sandboxes.ts.
 * Each card shows its provider's official logo (src/content/products.ts) as named alt text.
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
            <RevealItem as="li" key={u.provider} className="h-full">
              <ArtCard
                logos={[u.provider]}
                logosAlt="named"
                chip={p.unit}
                title={u.title}
                body={p.summary}
                href={sandboxRequestLink(p)}
                linkLabel="Request this sandbox"
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
