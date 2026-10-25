# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-route React Router v8 app whose only page **is** an A4 sheet. The PDF
is produced by the browser's own print renderer (`window.print()`), not by a PDF
library. Every layout decision therefore has to hold in both screen and print
rendering — there is no separate export path that could paper over a difference.

## Commands

```bash
npm run dev          # dev server with HMR, http://localhost:5173
npm run build        # production build; prerenders "/" to static HTML
npm start            # serve build/server/index.js
npm run typecheck    # react-router typegen && tsc
npm run lint         # eslint .
npm run format       # prettier --write .
npm run check        # typecheck + lint + format:check — the full gate
```

There is no test framework in this repo; `npm run check` is the only automated
verification. Visual/print correctness has to be checked by eye in a browser.

On a fresh clone, route types under `.react-router/types/` are generated, not
committed. Run `npm run typecheck` (or `npm run dev`) once before invoking `tsc`
directly, otherwise `./+types/home` fails to resolve.

## Data flow and the local-override mechanism

`app/cv-data.ts` is the only module anything should import CV content from. It
resolves the active data set:

- `app/cv-data.default.ts` — tracked fictional sample.
- `app/cv-data.local.ts` — the user's real CV. **Git-ignored, may exist on
  disk.** When present its `cv` export wins.

The resolution uses `import.meta.glob("./cv-data.local.ts", { eager: true })`,
which Vite compiles to `{}` when the file is absent — so a clone without it
still builds and type-checks. When it does exist it is type-checked against
`CvData` like any other source file.

Consequences to respect:

- Never edit `app/cv-data.default.ts` to hold real data, and never read from or
  commit `app/cv-data.local.ts` — it contains the user's real name, email and
  phone. `general-profile.md` and `*.pdf` are git-ignored for the same reason.
- `.dockerignore` deliberately does **not** ignore `app/cv-data.local.ts`: the
  image exists to deploy the owner's real CV. This divergence from `.gitignore`
  is intentional — don't "fix" it.
- Changing the `CvData` shape in `app/cv-data.types.ts` can break a local file
  that isn't in the repo. Prefer additive/optional changes.

`app/ui-text.ts` holds every user-facing string that is _not_ CV content
(section labels, print-dialog hint). Chrome goes there; content goes in the data
files.

## Page geometry

Sheet size and page padding live as `--sheet-*` custom properties in
`app/app.css` and are consumed by the `<main>` element in
[app/routes/home.tsx](app/routes/home.tsx). The `@page { size: A4 }` rule cannot
read a `var()`, so that one value is duplicated — keep the two in step if the
paper size ever changes.

Other print-critical invariants in `app/app.css`:

- Inter is self-hosted (`@fontsource-variable/inter`) rather than pulled from
  Google Fonts. A render-blocking third-party stylesheet can leave a cold-cache
  `print()` measuring fallback metrics, which silently pushes the CV onto a
  second page. Don't swap it for a CDN link.
- The document is always light (`color-scheme: light`, white background) — it is
  a printed page, not a themed UI. No dark mode.
- `print-color-adjust: exact` keeps the teal accents in the PDF.
- The sheet is a fixed 210mm and does **not** reflow for mobile. That is the
  design: screen layout and printed page are the same layout. Narrow screens
  scroll horizontally.

Screen-only chrome (the print panel, the gray backdrop) is hidden with Tailwind
`print:` variants rather than a separate stylesheet.

## Components

`Section`, `Entry`, `BulletList`, `CvHeader`, `Dot` in `app/components/`.
`Entry` is shared by Experience, Projects and Education because all three are a
title row + right-aligned meta + optional caption + bullets; add a prop rather
than a fourth near-identical component. Merge class names with `cn()` from
`app/lib/cn.ts` (clsx + tailwind-merge) so caller overrides actually win.

Font sizes are in `pt`, not `rem` — print units for a print document.

## Conventions

- Path alias `~/*` → `app/*`. TS is strict with `noUncheckedIndexedAccess`.
- Prettier with `prettier-plugin-tailwindcss` sorts class lists; run
  `npm run format` rather than hand-ordering classes.
- `react/no-array-index-key` is deliberately off — CV content is a module-scope
  constant that is never reordered or filtered.
- `eslint-config-prettier` must stay last in `eslint.config.js`.
