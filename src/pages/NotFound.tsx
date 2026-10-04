import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="container-site relative py-24 lg:py-36">
        <p className="font-mono text-eyebrow text-muted uppercase">Error 404</p>
        <h1 id="page-title" className="mt-6 max-w-2xl text-h1">
          This page doesn’t exist.
        </h1>
        <p className="mt-5 max-w-xl text-lead text-body">
          The link may be old or mistyped. The lab catalogue and the demo form are a good place to start.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/labs" size="lg">
            See lab catalogue
          </ButtonLink>
          <ButtonLink href="/" variant="secondary" size="lg">
            Go to home page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
