# CV as code

Your CV as a typed React component. Edit a TypeScript file, print a pixel-exact
A4 PDF from your browser.

No Word, no Canva, no drag-and-drop editor that reflows your layout the moment
you add a line. The page **is** an A4 sheet — the browser's own print renderer
produces the PDF, so what you see is what you get.

## Why

- **Versionable.** Your CV is a diff, not a binary blob. `git log` shows how
  your experience section evolved.
- **Tailorable.** Branch per application, or keep several data files and swap
  which one is active.
- **Consistent.** Typography, spacing and page geometry are defined once, so
  adding a bullet can't silently break your alignment.
- **Typed.** `CvData` means a missing field is a build error, not something you
  notice after sending the PDF.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. You'll see a sample CV for a fictional developer.

## Using your own data

The tracked sample lives in `app/cv-data.default.ts`. **Don't edit it.**
Instead:

```bash
cp app/cv-data.local.example.ts app/cv-data.local.ts
```

Then edit `app/cv-data.local.ts`. The app picks it up automatically on save —
no import to change, no config to touch.

`app/cv-data.local.ts` is git-ignored. Your name, email and phone number stay on
your machine, so you can fork, publish or share this repo without leaking
anything. Delete the file and the app falls back to the fictional sample.

<details>
<summary>How the override works</summary>

`app/cv-data.ts` resolves the local file with Vite's `import.meta.glob`. With
zero matches the expression compiles to `{}`, so a clone without the local file
builds and type-checks cleanly. When the file does exist it is type-checked
against `CvData` like any other source file, so a malformed CV fails
`npm run typecheck` rather than rendering broken.

</details>

## Exporting a PDF

Click **Print / Save as PDF**, then in the print dialog set:

| Setting             | Value       |
| ------------------- | ----------- |
| Destination         | Save as PDF |
| Paper size          | A4          |
| Margins             | None        |
| Scale               | 100%        |
| Background graphics | on          |
| Headers and footers | off         |

Chromium-based browsers give the most faithful output.

## Customizing

| What                   | Where                                          |
| ---------------------- | ---------------------------------------------- |
| Page size, margins     | `--sheet-*` custom properties in `app/app.css` |
| Accent colour          | the `teal-*` classes in `app/components/`      |
| Section labels, button | `app/ui-text.ts`                               |
| Which sections appear  | `app/routes/home.tsx`                          |

Note that the sheet is a fixed 210mm wide by design — it does not reflow for
mobile. On a narrow screen it scrolls horizontally and can be pinch-zoomed.
Reflowing would defeat the point, which is that the screen layout and the
printed page are the same layout.

## Project structure

```
app/
  cv-data.types.ts          the CvData interfaces
  cv-data.default.ts        fictional sample CV (tracked)
  cv-data.ts                resolver — import this, not the files above
  cv-data.local.example.ts  copy this to start your own
  cv-data.local.ts          your real CV (git-ignored, not in the repo)
  ui-text.ts                section labels and button copy
  app.css                   Tailwind theme, sheet geometry, print rules
  root.tsx                  HTML shell
  routes/home.tsx           the CV page
  components/               Section, Entry, BulletList, CvHeader, ...
```

## Scripts

| Script              | Does                                         |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Dev server with HMR                          |
| `npm run build`     | Production build (prerenders to static HTML) |
| `npm start`         | Serve the production build                   |
| `npm run typecheck` | Generate route types, then `tsc`             |
| `npm run lint`      | ESLint                                       |
| `npm run format`    | Prettier, write                              |
| `npm run check`     | typecheck + lint + format check              |

> **First run on a fresh clone:** route types are generated, not committed. Run
> `npm run typecheck` (or `npm run dev`) once before running `tsc` directly,
> otherwise you'll hit `Cannot find module './+types/home'`.

## Deploying

The build prerenders to static HTML, so `build/client/` can be dropped on any
static host — GitHub Pages, Netlify, Cloudflare Pages.

For a Node server:

```bash
npm run build
npm start
```

Or with Docker:

```bash
docker build -t cv .
docker run -p 3000:3000 cv
```

Note that `app/cv-data.local.ts` **is** included in the Docker image — the
image is meant to deploy your real CV. That's the one place where the Docker
and git ignore lists deliberately differ.

## Tech stack

React Router v8 (framework mode) · React 19 · Tailwind CSS v4 · Vite 8 ·
TypeScript (strict). Inter is self-hosted rather than loaded from Google Fonts,
so no visitor data goes to a third party and print output never depends on a
network request landing in time.

## License

MIT — see [LICENSE](LICENSE). The license covers the code. The sample CV content
is fictional, and anything you put in `cv-data.local.ts` is yours.
