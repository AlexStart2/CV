import { Fragment } from "react";
import { ui } from "~/ui-text";
import type { FitResult } from "~/lib/fit-to-page";

/**
 * Screen-only control for exporting the CV.
 *
 * Printing is driven by the browser's own dialog rather than a PDF library:
 * the page already *is* an A4 sheet, so the browser's renderer produces the
 * most faithful output with no extra dependency.
 *
 * It also reports what the fit pass decided. That is the one thing the sheet
 * itself cannot show: a CV rendered at 94% looks perfectly normal, and the
 * number is how you tell "comfortably one page" from "only just".
 */
export function PrintPanel({ fit }: { fit: FitResult | null }) {
  return (
    <div className="fixed right-4 bottom-4 z-10 max-w-60 rounded-lg bg-gray-900 p-3 text-[11px] leading-snug text-gray-100 shadow-lg print:hidden">
      {fit && (
        <p className="mb-1.5 text-gray-400">
          {fit.pageCount}{" "}
          {fit.pageCount === 1 ? ui.print.fit.page : ui.print.fit.pages}
          {" · "}
          {ui.print.fit.density} {Math.round(fit.scale * 100)}%
        </p>
      )}
      <button
        type="button"
        onClick={() => window.print()}
        aria-label={ui.print.buttonAriaLabel}
        className="mb-1.5 w-full cursor-pointer rounded bg-teal-600 py-1.5 font-semibold text-white hover:bg-teal-500"
      >
        {ui.print.button}
      </button>
      {ui.print.hintIntro}{" "}
      {ui.print.hintSettings.map((setting, i) => (
        <Fragment key={i}>
          {i > 0 && ", "}
          {setting.label} <b>{setting.value}</b>
        </Fragment>
      ))}
      .
    </div>
  );
}
