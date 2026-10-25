/**
 * Every user-facing string that is *not* CV content.
 *
 * Kept separate from `CvData` so the two concerns stay apart: this file is
 * chrome and is always tracked in git, while CV content is personal and lives
 * in `cv-data.local.ts`. It also means translating the template is a
 * single-file change.
 */
export const ui = {
  sections: {
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    publications: "Publications",
    achievements: "Achievements",
    skills: "Technical Skills",
    languages: "Languages",
  },
  print: {
    button: "Print / Save as PDF",
    buttonAriaLabel: "Open the print dialog to save this CV as a PDF",
    hintIntro: "In the print dialog:",
    /**
     * Rendered as "label value" pairs, with the value emphasised.
     *
     * Margins must stay on "Default": the page margins come from the `@page`
     * rule so that every page gets them, and choosing "None" overrides that
     * rule and prints edge to edge.
     */
    hintSettings: [
      { label: "paper", value: "A4" },
      { label: "margins", value: "Default" },
      { label: "scale", value: "100%" },
      { label: "background graphics", value: "on" },
      { label: "headers and footers", value: "off" },
    ],
    /** Status line: how the sheet was fitted. "2 pages · density 96%". */
    fit: {
      page: "page",
      pages: "pages",
      density: "density",
    },
  },
} as const;
