import { useEffect, useState, type RefObject } from "react";
import { fitToPage, type FitResult } from "~/lib/fit-to-page";

/**
 * Keep the sheet fitted to whole A4 pages, and report the result.
 *
 * Runs once the webfont is in — Inter's metrics decide the line count, and
 * measuring against the fallback font would fit the CV to a layout that then
 * changes underneath it — and again on `beforeprint`, which is the last moment
 * the measurement can still be corrected before the PDF is produced.
 *
 * Returns null until the first measurement lands. The server-rendered HTML
 * ships at `--cv-scale: 1`, which is the right answer for any CV that already
 * fits, so there is nothing to flash for the common case.
 */
export function useFitToPage(
  ref: RefObject<HTMLElement | null>,
  content: unknown,
) {
  const [fit, setFit] = useState<FitResult | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      const flow = ref.current;
      if (!flow || cancelled) return;
      setFit(fitToPage(flow));
    };

    void document.fonts.ready.then(run);
    window.addEventListener("beforeprint", run);

    return () => {
      cancelled = true;
      window.removeEventListener("beforeprint", run);
    };
  }, [ref, content]);

  return fit;
}
