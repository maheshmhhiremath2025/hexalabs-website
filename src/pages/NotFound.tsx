import { Award, Cloud, Layers, MonitorSmartphone, type LucideIcon } from 'lucide-react';
import { labsMenu } from '../content/site';
import { PageHero } from '../components/sections/PageHero';
import { ButtonLink } from '../components/ui/Button';
import { IconCard } from '../components/ui/Cards';

const icons: Record<string, LucideIcon> = {
  '/official-labs': Layers,
  '/sandboxes': Cloud,
  '/labs': MonitorSmartphone,
  '/certifications': Award,
};

export default function NotFound() {
  return (
    <div className="pb-20 lg:pb-28">
      <PageHero
        eyebrow="Error 404"
        title={{ before: 'This page ', accent: 'doesn’t exist', after: '.' }}
        body="The link may be old or mistyped. The lab catalogue and the demo form are a good place to start."
        art="dark-spiral"
        actions={
          <>
            <ButtonLink href="/labs" size="lg" arrow="up-right" className="w-full sm:w-auto">
              See lab catalogue
            </ButtonLink>
            <ButtonLink href="/" variant="ghost" size="lg" className="w-full sm:w-auto">
              Go to home page
            </ButtonLink>
          </>
        }
        overlap={
          <ul aria-label="Kinds of lab" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {labsMenu.items.map((item, i) => (
              <li key={item.href} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
                <IconCard icon={icons[item.href] ?? Layers} title={item.label} body={item.description} href={item.href} as="h2" compact />
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
}
