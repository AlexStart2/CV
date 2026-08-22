/**
 * Bulleted list of plain strings.
 *
 * Index keys are deliberate. The CV is a module-scope constant that is never
 * fetched, filtered, sorted or reordered, and each item is a stateless leaf,
 * so there is no DOM state for React to mis-reuse. Content strings would be
 * the alternative, but two identical bullets are entirely possible and would
 * collide — index is the only key guaranteed unique here.
 */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-0.5 list-disc space-y-0.5 pl-4.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
