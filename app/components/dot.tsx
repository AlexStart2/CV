/**
 * Decorative separator between inline items (contact details, languages).
 * Hidden from assistive tech so it is not announced as "middle dot".
 */
export function Dot() {
  return (
    <span aria-hidden="true" className="mx-1.5 text-gray-400">
      ·
    </span>
  );
}
