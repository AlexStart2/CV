/**
 * Fit the CV to a whole number of A4 pages.
 *
 * Two things happen here, and they are the same measurement:
 *
 * 1. **Pagination.** The content is walked as a list of atoms — blocks that
 *    must not be split across a page boundary — and the page breaks are
 *    computed the way a paged-media formatter would: an atom that would
 *    straddle a boundary moves whole to the next page. The result drives both
 *    the printed breaks (`break-before: page`) and the screen preview
 *    (`--page-shift`), so the two agree by construction instead of by luck.
 *
 * 2. **Density.** If the content spills onto a page it very nearly fits
 *    within, `--cv-scale` is lowered just enough to pull it back. The scale is
 *    only ever reduced to *remove a page* — a CV that genuinely needs two
 *    pages is left at full size rather than crushed — and never past
 *    {@link FIT_MIN_SCALE}.
 *
 * Everything is measured from the live DOM rather than estimated, so it holds
 * for whatever content `cv-data.local.ts` happens to contain.
 */

/**
 * How small the density knob may go, as a fraction of the design size.
 *
 * 0.9 puts the body text at 8.3pt, which is about as tight as a CV can be set
 * and still read comfortably on paper. Below that it is better to let the CV
 * be two pages.
 */
export const FIT_MIN_SCALE = 0.9;

/** Steps of binary search over the scale. 8 lands within ~0.4% of the ideal. */
const SEARCH_STEPS = 8;

/** Sub-pixel slack, so a block that ends exactly on a boundary stays put. */
const EPSILON = 0.5;

export interface FitResult {
  /** The density applied, as a fraction of the design size. 1 = untouched. */
  scale: number;
  /** How many A4 pages the content occupies at that density. */
  pageCount: number;
}

/** A run of one or more atoms that has to stay together on one page. */
interface Group {
  /** The atom the page would start with, if this group gets pushed. */
  el: HTMLElement;
  top: number;
  bottom: number;
}

/** Where a page break falls, and how much empty space it leaves behind. */
interface PageBreak {
  el: HTMLElement;
  /** Unused tail of the page being left — the flow space the break consumes. */
  gap: number;
}

/**
 * Resolve a CSS length expression to pixels by measuring it.
 *
 * The sheet geometry lives in mm custom properties, and the conversion to
 * device pixels depends on the browser. Rather than reimplement it, hand the
 * expression to the layout engine and read back what it produced.
 */
function measureLength(expression: string): number {
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;top:0;left:0;width:0;visibility:hidden;pointer-events:none;height:${expression};`;
  document.body.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  probe.remove();
  return height;
}

/**
 * Read the atoms out of the flow, merging any that are glued to their
 * successor (a section heading is glued to its first entry, so a heading can
 * never be left stranded at the foot of a page).
 */
function readGroups(flow: HTMLElement): Group[] {
  const flowTop = flow.getBoundingClientRect().top;
  const groups: Group[] = [];
  let open: Group | null = null;

  for (const el of flow.querySelectorAll<HTMLElement>("[data-atom]")) {
    const rect = el.getBoundingClientRect();
    if (open) {
      open.bottom = rect.bottom - flowTop;
    } else {
      open = { el, top: rect.top - flowTop, bottom: rect.bottom - flowTop };
    }
    if (!el.hasAttribute("data-atom-glue")) {
      groups.push(open);
      open = null;
    }
  }
  if (open) groups.push(open);

  return groups;
}

/**
 * Lay the groups out across pages of `usable` height and report where the
 * breaks fall. Pure measurement — nothing is written to the DOM.
 */
function paginate(flow: HTMLElement, usable: number) {
  const breaks: PageBreak[] = [];
  let shift = 0;
  let contentBottom = 0;

  for (const group of readGroups(flow)) {
    const top = group.top + shift;
    const bottom = group.bottom + shift;
    const pageBottom = (Math.floor((top + EPSILON) / usable) + 1) * usable;

    // A group taller than a whole page cannot be moved anywhere better, so it
    // is left to split; anything else that straddles the boundary moves down.
    if (bottom > pageBottom + EPSILON && group.bottom - group.top <= usable) {
      const gap = pageBottom - top;
      shift += gap;
      breaks.push({ el: group.el, gap });
      contentBottom = bottom + gap;
    } else {
      contentBottom = bottom;
    }
  }

  return {
    breaks,
    pageCount: Math.max(1, Math.ceil((contentBottom - EPSILON) / usable)),
  };
}

function clearBreaks(flow: HTMLElement) {
  for (const el of flow.querySelectorAll<HTMLElement>("[data-page-start]")) {
    el.removeAttribute("data-page-start");
    el.style.removeProperty("--page-shift");
  }
}

function applyBreaks(breaks: PageBreak[], interPage: number) {
  for (const pageBreak of breaks) {
    pageBreak.el.setAttribute("data-page-start", "");
    pageBreak.el.style.setProperty(
      "--page-shift",
      `${pageBreak.gap + interPage}px`,
    );
  }
}

/**
 * Largest scale in [FIT_MIN_SCALE, 1] whose layout fits `target` pages, or
 * null if even the smallest allowed scale does not.
 *
 * Page count only ever falls as the scale falls, so the predicate is monotone
 * and a binary search is sound.
 */
function searchScale(
  pagesAt: (scale: number) => number,
  target: number,
): number | null {
  if (pagesAt(FIT_MIN_SCALE) > target) return null;

  let low = FIT_MIN_SCALE;
  let high = 1;
  for (let step = 0; step < SEARCH_STEPS; step++) {
    const mid = (low + high) / 2;
    if (pagesAt(mid) <= target) low = mid;
    else high = mid;
  }
  // Round down, not to nearest: `low` is a validated fit, and the search's
  // resolution (~0.1 / 2^SEARCH_STEPS) is finer than this 0.001 grid, so
  // rounding to nearest can round upward past the point that was confirmed
  // to fit and silently undo the last refinement step.
  return Math.floor(low * 1000) / 1000;
}

/**
 * Measure `flow`, choose a density, and write the resulting pagination back to
 * the DOM. Safe to call repeatedly; each run starts from a clean slate.
 */
export function fitToPage(flow: HTMLElement): FitResult {
  const root = document.documentElement;
  const usable = measureLength("calc(var(--sheet-h) - 2 * var(--sheet-py))");
  const interPage = measureLength(
    "calc(2 * var(--sheet-py) + var(--page-gap))",
  );

  const pagesAt = (scale: number) => {
    root.style.setProperty("--cv-scale", String(scale));
    clearBreaks(flow);
    return paginate(flow, usable).pageCount;
  };

  // Start from the honest page count, then buy back pages one at a time for as
  // long as a legible density can afford them.
  let target = pagesAt(1);
  let scale = 1;
  while (target > 1) {
    const cheaper = searchScale(pagesAt, target - 1);
    if (cheaper === null) break;
    target -= 1;
    scale = cheaper;
  }

  root.style.setProperty("--cv-scale", String(scale));
  clearBreaks(flow);
  const { breaks, pageCount } = paginate(flow, usable);

  applyBreaks(breaks, interPage);
  root.style.setProperty("--page-count", String(pageCount));

  return { scale, pageCount };
}
