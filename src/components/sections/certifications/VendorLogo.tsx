import type { VendorId } from '../../../content/certifications';
import { MarkBadge } from '../../ui/MarkBadge';

/**
 * A vendor's compact official mark in a round white badge (visible on light and on dark,
 * active pills), always followed by its name.
 */
export function VendorLogo({ id, label }: { id: VendorId; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <MarkBadge id={id} />
      <span>{label}</span>
    </span>
  );
}
