import { BulletList } from "~/components/bullet-list";
import { cn } from "~/lib/cn";

export interface EntryProps {
  /** Role, project name, or degree. */
  title: string;
  /** Rendered muted and inline after the title, e.g. "— Acme Corp". */
  subtitle?: string;
  /** Right-aligned on the title row: a period or a tech stack. */
  meta?: string;
  /** Italic line below the title row, e.g. a job location. */
  caption?: string;
  bullets: string[];
  className?: string;
}

/**
 * One item in Experience, Projects or Education.
 *
 * These three sections share the same shape — a title row with right-aligned
 * metadata, an optional caption, and a bulleted body — so they share one
 * component rather than three near-identical copies.
 *
 * An entry is an atom: pagination moves it whole to the next page rather than
 * splitting a role across the fold. See lib/fit-to-page.ts.
 */
export function Entry({
  title,
  subtitle,
  meta,
  caption,
  bullets,
  className,
}: EntryProps) {
  return (
    <div data-atom className={cn("mb-(--sp-block) last:mb-0", className)}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-(length:--fs-entry) font-semibold">
          {title}
          {subtitle && (
            <span className="font-normal text-gray-600"> {subtitle}</span>
          )}
        </h3>
        {meta && (
          <span className="shrink-0 pl-(--sp-meta-gap) text-(length:--fs-meta) text-gray-600">
            {meta}
          </span>
        )}
      </div>
      {caption && (
        <p className="text-(length:--fs-caption) text-gray-500 italic">
          {caption}
        </p>
      )}
      <BulletList items={bullets} />
    </div>
  );
}
