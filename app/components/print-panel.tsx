import { Fragment } from "react";
import { ui } from "~/ui-text";

/**
 * Screen-only control for exporting the CV.
 *
 * Printing is driven by the browser's own dialog rather than a PDF library:
 * the page already *is* an A4 sheet, so the browser's renderer produces the
 * most faithful output with no extra dependency.
 */
export function PrintPanel() {
  return (
    <div className="fixed right-4 bottom-4 z-10 max-w-60 rounded-lg bg-gray-900 p-3 text-[11px] leading-snug text-gray-100 shadow-lg print:hidden">
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
