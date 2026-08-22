import type { CvData } from "~/cv-data.types";

/**
 * Sample CV — entirely fictional.
 *
 * This is what the app renders when `app/cv-data.local.ts` does not exist.
 * It is sized to fill roughly one A4 page so you can see real page-break
 * behaviour before entering your own content.
 *
 * To use your own details, copy `cv-data.local.example.ts` to
 * `cv-data.local.ts` (git-ignored) and edit that instead of this file.
 *
 * Contact details use RFC 2606 reserved domains and the reserved 555-01xx
 * phone range, so nothing here resolves to a real person.
 */
export const cv: CvData = {
  name: "Jordan Avery",
  title: "Frontend Developer — React & Design Systems",
  contact: {
    location: "Lisbon, Portugal",
    email: "jordan.avery@example.com",
    phone: "(+1) 555 010 0123",
    github: { label: "github.com/your-handle", url: "https://github.com/" },
  },
  summary:
    "Frontend developer (React, TypeScript) focused on design systems and accessible component libraries. Ships production interfaces backed by Node.js services, and enjoys the unglamorous parts — bundle budgets, keyboard navigation, and print stylesheets that actually hold up. Comfortable owning a feature from API contract through to released UI.",
  experience: [
    {
      title: "Frontend Developer",
      company: "Northwind Labs",
      location: "Remote — Lisbon, Portugal",
      period: "Mar 2023 – Present",
      bullets: [
        "Build and maintain the shared component library used by four product teams, cutting duplicated UI code and standardising accessibility behaviour across the suite.",
        "Migrated the main dashboard from a legacy bundler to Vite, reducing cold start from roughly 40s to under 3s and unblocking day-to-day iteration.",
        "Own the design-token pipeline: a single source of truth consumed by both the web app and the marketing site.",
      ],
    },
    {
      title: "Junior Web Developer",
      company: "Harbour Digital",
      location: "Porto, Portugal",
      period: "Sep 2021 – Feb 2023",
      bullets: [
        "Delivered client-facing marketing sites with React and TypeScript, consistently scoring above 95 on Lighthouse performance and accessibility.",
        "Introduced a component-testing setup that caught regressions before release and became the team default.",
      ],
    },
  ],
  projects: [
    {
      name: "Ledger UI",
      context: "open source",
      stack: "React · TypeScript · Tailwind",
      description: [
        "Headless component library for financial tables: column pinning, virtualised rows and keyboard-navigable cells, with no styling opinions baked in.",
        "Documented with live, editable examples; used by a handful of small teams in production.",
      ],
    },
    {
      name: "Transit Board",
      context: "side project",
      stack: "React · Node.js · WebSockets",
      description: [
        "Real-time departure board for a local transit API, designed for an always-on wall display — high contrast, no interaction required.",
        "Degrades gracefully to cached timetable data when the upstream feed is unavailable.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc in Computer Science",
      school: "University of Example",
      period: "2018 – 2021",
      notes: [
        "Graduated with distinction; final project on browser rendering performance.",
        "Exchange semester at the Institute of Sample Studies (2020).",
      ],
    },
  ],
  achievements: [
    "1st place, Example City Hackathon 2022 — an accessibility auditing tool that flags keyboard traps in single-page applications.",
    "Maintainer of a small open-source Tailwind plugin with roughly 2k weekly downloads.",
  ],
  skills: [
    {
      group: "Frontend",
      items:
        "React, React Router, Next.js, TypeScript, JavaScript, Tailwind CSS",
    },
    {
      group: "Design systems",
      items:
        "Component API design, design tokens, accessible patterns (WAI-ARIA), Storybook",
    },
    {
      group: "Backend",
      items: "Node.js, Express, PostgreSQL, REST APIs, JWT authentication",
    },
    {
      group: "Tooling",
      items: "Vite, Vitest, Playwright, GitHub Actions CI/CD, Docker",
    },
    { group: "Other languages", items: "Go, Python" },
  ],
  languages: [
    { name: "Portuguese", level: "native" },
    { name: "English", level: "C1" },
    { name: "Spanish", level: "B1" },
  ],
};
