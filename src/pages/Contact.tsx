import { Mail } from 'lucide-react';
import { contactHero, nextSteps } from '../content/contact';
import { site } from '../content/site';
import { PageHero } from '../components/sections/PageHero';
import { DemoForm } from '../components/sections/contact/DemoForm';
import { ButtonLink } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';

/** Right-hand column: what happens after the form, direct email, and the portal login. */
function Aside() {
  return (
    <aside aria-label="About your request" className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
      <section aria-labelledby="next-title" className="card p-6 sm:p-8">
        <h2 id="next-title" className="eyebrow flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          What happens next
        </h2>
        <div className="relative mt-6">
          <span aria-hidden="true" className="absolute top-5 bottom-5 left-5 w-px bg-line" />
          <ol className="space-y-6">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4">
              <span aria-hidden="true" className="icon-bubble bg-white! font-mono text-sm">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-base font-medium tracking-tight">{s.title}</h3>
                <p className="mt-1 text-sm leading-6 text-body">{s.body}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-xl bg-raised p-4">
          <span className="icon-bubble bg-white!">
            <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-normal text-muted">Reach us directly</h3>
            <a href={`mailto:${site.contact.email}`} className="link-underline mt-0.5 inline-block truncate text-[0.9375rem] font-medium">
              {site.contact.email}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="customer-title" className="surface-dark relative overflow-hidden rounded-card p-6 shadow-float sm:p-8">
        <div aria-hidden="true" className="glow-dark pointer-events-none absolute inset-0" />
        <div className="relative">
          <p>
            <Chip tone="light">Customers</Chip>
          </p>
          <h2 id="customer-title" className="mt-4 text-xl font-medium tracking-tight">
            Already a customer?
          </h2>
          <p className="mt-2 text-sm leading-6 text-body">Open your labs or ask Hexa for help inside the portal.</p>
          <ButtonLink href={site.loginUrl} variant="light" arrow="up-right" className="mt-6">
            Log in to {site.portalLabel}
          </ButtonLink>
        </div>
      </section>
    </aside>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        image="ph-hero-contact"
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        body={contactHero.body}
        overlap={
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-20 lg:pb-28">
            <div className="rise-in col-span-12 lg:col-span-7 xl:col-span-8" style={{ ['--d' as string]: '150ms' }}>
              <DemoForm />
            </div>
            <div className="rise-in col-span-12 lg:col-span-5 xl:col-span-4" style={{ ['--d' as string]: '260ms' }}>
              <Aside />
            </div>
          </div>
        }
      />
    </>
  );
}
