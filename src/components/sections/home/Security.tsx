import { security } from '../../../content/home';
import { Section, SectionHeader } from '../../ui/Section';

export function Security() {
  return (
    <Section tone="paper" labelledBy="security-title">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionHeader id="security-title" eyebrow={security.eyebrow} title={security.title} intro={security.intro} />
        </div>
        <dl className="col-span-12 grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {security.items.map((item) => (
            <div key={item.term} className="border-t border-line py-6">
              <dt className="flex items-center gap-2.5 font-medium text-heading">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-blue-600" />
                {item.term}
              </dt>
              <dd className="mt-2 text-body">{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
