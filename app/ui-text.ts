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
    achievements: "Achievements",
    skills: "Technical Skills",
    languages: "Languages",
  },
  print: {
    button: "Print / Save as PDF",
    buttonAriaLabel: "Open the print dialog to save this CV as a PDF",
    hintIntro: "In the print dialog:",
    /** Rendered as "label value" pairs, with the value emphasised. */
    hintSettings: [
      { label: "paper", value: "A4" },
      { label: "margins", value: "None" },
      { label: "scale", value: "100%" },
      { label: "background graphics", value: "on" },
      { label: "headers and footers", value: "off" },
    ],
  },
} as const;
