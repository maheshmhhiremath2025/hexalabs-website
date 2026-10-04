import { Plus } from 'lucide-react';
import { faq } from '../../../content/training';
import { Section, SectionHeader } from '../../ui/Section';

/** Native <details> accordion: keyboard and screen-reader friendly without JS. */
export function Faq() {
  return (
    <Section tone="white" id="faq" labelledBy="faq-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions training companies ask us." />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <ul className="border-b border-line">
            {faq.map((item) => (
              <li key={item.q} className="border-t border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-medium text-heading [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      className="mt-1 h-5 w-5 flex-none text-muted transition-transform duration-200 group-open:rotate-45"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 text-body">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
