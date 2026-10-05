import { sandboxesCta, sandboxesHero } from '../content/sandboxes';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { ProviderExplorer } from '../components/sections/sandboxes/ProviderExplorer';
import { Guardrails } from '../components/sections/sandboxes/Guardrails';
import { UseCases } from '../components/sections/sandboxes/UseCases';
import { Comparison } from '../components/sections/sandboxes/Comparison';
import { SandboxFacts } from '../components/sections/sandboxes/SandboxFacts';

/**
 * Rhythm: inset dark hero (+ facts overlapping) → paper providers → dark guardrails
 * carousel → white use cases → paper comparison → dark CTA band.
 */
export default function Sandboxes() {
  return (
    <>
      <PageHero
        eyebrow={sandboxesHero.eyebrow}
        title={sandboxesHero.title}
        body={sandboxesHero.body}
        art="dark-spiral"
        feature="sandboxes"
        actions={
          <>
            <ButtonLink href={sandboxesHero.primary.href} size="lg" arrow="up-right">
              {sandboxesHero.primary.label}
            </ButtonLink>
            <ButtonLink href={sandboxesHero.secondary.href} variant="ghost" size="lg" arrow="right">
              {sandboxesHero.secondary.label}
            </ButtonLink>
          </>
        }
        overlap={<SandboxFacts />}
      />
      <ProviderExplorer />
      <Guardrails />
      <UseCases />
      <Comparison />
      <CtaBand title={sandboxesCta.title} body={sandboxesCta.body} cta={sandboxesCta.cta} chip={sandboxesHero.eyebrow} />
    </>
  );
}
