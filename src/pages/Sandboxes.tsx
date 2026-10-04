import { sandboxesCta, sandboxesHero } from '../content/sandboxes';
import { PageHero } from '../components/sections/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ButtonLink } from '../components/ui/Button';
import { ProviderExplorer } from '../components/sections/sandboxes/ProviderExplorer';
import { Guardrails } from '../components/sections/sandboxes/Guardrails';
import { Comparison } from '../components/sections/sandboxes/Comparison';
import { SandboxMock } from '../components/sections/sandboxes/SandboxMock';

export default function Sandboxes() {
  return (
    <>
      <PageHero
        eyebrow={sandboxesHero.eyebrow}
        title={sandboxesHero.title}
        body={sandboxesHero.body}
        actions={
          <>
            <ButtonLink href={sandboxesHero.primary.href} size="lg">
              {sandboxesHero.primary.label}
            </ButtonLink>
            <ButtonLink href={sandboxesHero.secondary.href} variant="secondary" size="lg">
              {sandboxesHero.secondary.label}
            </ButtonLink>
          </>
        }
        aside={<SandboxMock title={sandboxesHero.card.title} rows={sandboxesHero.card.rows} className="shadow-frame" />}
      />
      <ProviderExplorer />
      <Guardrails />
      <Comparison />
      <CtaBand title={sandboxesCta.title} body={sandboxesCta.body} cta={sandboxesCta.cta} />
    </>
  );
}
