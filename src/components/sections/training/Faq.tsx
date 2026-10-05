import { Plus } from 'lucide-react';
import { faq } from '../../../content/training';
import { Section, SectionIntro } from '../../ui/Section';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Accent } from '../../ui/Accent';

/**
 * FAQ as white accordion cards on the canvas. Native <details>/<summary>, so it is
 * keyboard and screen-reader friendly without JS; the answer rises in when opened.
 */
export function Faq() {
  return (
    <Section tone="paper" id="faq" labelledBy="faq-title">
      <SectionIntro
        id="faq-title"
        eyebrow="FAQ"
        title={
          <>
            Questions training companies <Accent>ask us</Accent>.
          </>
        }
      />
      <RevealGroup as="ul" stagger={0.06} className="mx-auto mt-12 max-w-3xl space-y-3 lg:mt-14">
        {faq.map((item) => (
          <RevealItem as="li" key={item.q}>
            <details className="card group transition-shadow duration-(--dur-hover) ease-(--ease-smooth) open:shadow-card-hover">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-card px-5 py-5 text-left text-base leading-snug font-medium text-heading sm:px-7 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 flex-none place-items-center rounded-full bg-canvas text-ink-950 transition-[transform,background-color,color] duration-(--dur-hover) ease-(--ease-smooth) group-open:rotate-45 group-open:bg-blue-600 group-open:text-white group-hover:bg-canvas-200 group-open:group-hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </summary>
              <div className="rise-in px-5 pb-6 sm:px-7 sm:pb-7">
                <p className="max-w-2xl border-t border-line pt-5 leading-7 text-body">{item.a}</p>
              </div>
            </details>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
