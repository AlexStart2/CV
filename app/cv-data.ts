import type { CvData } from "~/cv-data.types";
import { cv as defaultCv } from "~/cv-data.default";

export type {
  CvData,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  SkillGroup,
  LanguageEntry,
} from "~/cv-data.types";

/**
 * Personal-data override.
 *
 * `app/cv-data.local.ts` is git-ignored. When it exists its `cv` export wins;
 * otherwise the tracked fictional sample in `cv-data.default.ts` is used. That
 * way a clone of this repo renders a complete example CV, and your real details
 * never leave your machine.
 *
 * Vite resolves this at build time: `import.meta.glob` with zero matches
 * compiles to `{}`, so the build and `tsc` both succeed when the file is
 * absent. Creating or deleting it while the dev server runs triggers an HMR
 * reload — no restart needed.
 *
 * See README → "Using your own data".
 */
const localModules = import.meta.glob<CvData>("./cv-data.local.ts", {
  eager: true,
  import: "cv",
});

export const cv: CvData = Object.values(localModules)[0] ?? defaultCv;
