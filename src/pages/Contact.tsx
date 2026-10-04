import { ArrowUpRight } from 'lucide-react';
import { contactHero, nextSteps } from '../content/contact';
import { site } from '../content/site';
import { PageHero } from '../components/sections/PageHero';
import { DemoForm } from '../components/sections/contact/DemoForm';

export default function Contact() {
  return (
    <>
      <PageHero eyebrow={contactHero.eyebrow} title={contactHero.title} body={contactHero.body} />

      <section aria-label="Demo request" className="surface-paper py-14 lg:py-20">
        <div className="container-site grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <DemoForm />
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-labelledby="next-title">
            <h2 id="next-title" className="font-mono text-eyebrow font-normal text-muted uppercase">
              What happens next
            </h2>
            <ol className="mt-5 space-y-6">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line-strong font-mono text-micro text-heading"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-heading">{s.title}</p>
                    <p className="mt-1 text-sm text-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-mono text-eyebrow font-normal text-muted uppercase">Reach us directly</h2>
              <p className="mt-4 text-sm">
                <span className="block text-muted">Email</span>
                <a href={`mailto:${site.contact.email}`} className="link font-medium">
                  {site.contact.email}
                </a>
              </p>
            </div>

            <div className="mt-8 rounded-card border border-line bg-white p-5">
              <p className="font-medium text-heading">Already a customer?</p>
              <p className="mt-1 text-sm text-body">Open your labs or ask Hexa for help inside the portal.</p>
              <a href={site.loginUrl} className="link mt-3 inline-flex items-center gap-1 text-sm font-medium">
                Log in to {site.portalLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
