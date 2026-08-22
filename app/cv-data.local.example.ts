import type { CvData } from "~/cv-data.types";

/**
 * Template for your own CV.
 *
 *   cp app/cv-data.local.example.ts app/cv-data.local.ts
 *
 * `cv-data.local.ts` is git-ignored, so your real details stay on your machine
 * even if you fork or publish this repo. The app picks it up automatically —
 * no import to change, no config to touch. Delete it to fall back to the
 * fictional sample in `cv-data.default.ts`.
 *
 * Every array can hold as many entries as you like; empty arrays render an
 * empty section, so remove sections you don't need from `home.tsx`.
 */
export const cv: CvData = {
  name: "TODO Your Name",
  title: "TODO Job title — specialisation",
  contact: {
    location: "TODO City, Country",
    email: "TODO you@example.com",
    phone: "TODO (+00) 000 000 000",
    github: {
      label: "TODO github.com/your-handle",
      url: "TODO https://github.com/your-handle",
    },
  },
  summary:
    "TODO Two or three sentences: what you build, the stack you build it in, and the one thing that makes you a specific rather than generic candidate.",
  experience: [
    {
      title: "TODO Role",
      company: "TODO Company",
      location: "TODO City, Country (or Remote)",
      period: "TODO Mon YYYY – Present",
      bullets: [
        "TODO What you shipped, in what stack, and what changed as a result.",
        "TODO Prefer concrete outcomes over responsibilities.",
      ],
    },
  ],
  projects: [
    {
      name: "TODO Project name",
      context: "TODO e.g. bachelor thesis, open source, side project",
      stack: "TODO React · TypeScript · Node.js",
      description: [
        "TODO What it does and the interesting engineering decision behind it.",
      ],
    },
  ],
  education: [
    {
      degree: "TODO BSc in Something",
      school: "TODO University",
      period: "TODO YYYY – YYYY",
      notes: ["TODO Distinctions, thesis topic, exchange semesters."],
    },
  ],
  achievements: ["TODO Awards, competitions, publications, notable OSS work."],
  skills: [
    { group: "TODO Frontend", items: "TODO Comma, separated, list" },
    { group: "TODO Backend", items: "TODO Comma, separated, list" },
  ],
  languages: [
    { name: "TODO Language", level: "native" },
    { name: "TODO Language", level: "B2" },
  ],
};
