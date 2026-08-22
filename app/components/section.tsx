import { cn } from "~/lib/cn";

/**
 * A titled CV section: a ruled, small-caps heading followed by its content.
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
    <section className={cn("mb-4", className)}>
      <h2 className="mb-1 border-b border-teal-700/60 pb-0.5 text-[10pt] font-bold tracking-[0.08em] text-teal-800 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
