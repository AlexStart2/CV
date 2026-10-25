import { cn } from "~/lib/cn";

/**
 * A titled CV section: a ruled, small-caps heading followed by its content.
 *
 * The heading is an atom glued to whatever follows it, so pagination can never
 * leave it stranded at the foot of a page — see lib/fit-to-page.ts.
 */
export function Section({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("mb-(--sp-section)", className)}>
      <h2
        data-atom
        data-atom-glue
        className="mb-(--sp-line) border-b border-teal-700/60 pb-(--sp-hair) text-(length:--fs-section) font-bold tracking-[0.08em] text-teal-800 uppercase"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
