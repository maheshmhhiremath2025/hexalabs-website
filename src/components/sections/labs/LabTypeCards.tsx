import { labFilters, type LabCategory } from '../../../content/labs';
import { IconCard } from '../../ui/Cards';
import { labCounts } from './LabCatalogue';
import { categoryIcons } from './LabCard';

/**
 * Four white cards overlapping the bottom of the hero — one per lab type, each
 * linking to the catalogue filtered to that type. They rise in on first paint.
 */
export function LabTypeCards() {
  const types = labFilters.filter((f): f is { id: LabCategory; label: string } => f.id !== 'all');
  return (
    <div>
      <h2 className="sr-only">Lab machine types</h2>
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {types.map((t, i) => (
          <li key={t.id} className="rise-in" style={{ ['--d' as string]: `${200 + i * 90}ms` }}>
            <IconCard
              icon={categoryIcons[t.id]}
              title={t.label}
              body={`${labCounts[t.id]} lab machines`}
              href={`/labs?type=${t.id}#catalogue`}
              linkLabel="Browse"
              compact
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
