import { Fragment, useRef } from "react";
import type { Route } from "./+types/home";
import { cv } from "~/cv-data";
import type { PublicationEntry } from "~/cv-data.types";
import { ui } from "~/ui-text";
import { BulletList } from "~/components/bullet-list";
import { CvHeader } from "~/components/cv-header";
import { Dot } from "~/components/dot";
import { Entry } from "~/components/entry";
import { PrintPanel } from "~/components/print-panel";
import { Section } from "~/components/section";
import { withDuration } from "~/lib/duration";
import { useFitToPage } from "~/lib/use-fit-to-page";

function formatPublication(pub: PublicationEntry): string {
  const citation = `${pub.title} — ${pub.venue}`;
  return pub.doi ? `${citation}. DOI: ${pub.doi}` : `${citation}.`;
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${cv.name} — ${cv.title}` },
    { name: "description", content: `CV of ${cv.name}, ${cv.title}` },
  ];
}

export default function Home() {
  // Everything inside this element is the paginated flow. The sheet's own
  // padding and minimum height sit outside it so they do not distort the
  // content measurement.
  const flowRef = useRef<HTMLDivElement>(null);
  const fit = useFitToPage(flowRef, cv);

  return (
    <div className="min-h-screen overflow-x-auto bg-gray-200 py-8 print:min-h-0 print:overflow-visible print:bg-white print:py-0">
      <PrintPanel fit={fit} />

      {/* The A4 sheet itself. Geometry comes from the --sheet-* custom
          properties in app.css so it stays in step with the @page rule. In
          print the @page box supplies the margins and the pagination, so the
          sheet drops its own padding and fixed width. */}
      <main className="cv-sheet mx-auto box-border w-(--sheet-w) px-(--sheet-px) py-(--sheet-py) text-(length:--fs-body) leading-[1.28] text-gray-900 shadow-xl print:w-auto print:p-0 print:shadow-none">
        <div ref={flowRef}>
          <CvHeader cv={cv} />

          <section data-atom className="mb-(--sp-block)">
            <p>{cv.summary}</p>
          </section>

          <Section title={ui.sections.experience} className="mb-(--sp-block)">
            {cv.experience.map((job, i) => (
              <Entry
                key={i}
                className="mb-(--sp-entry)"
                title={job.title}
                subtitle={`— ${job.company}`}
                meta={withDuration(job.period)}
                caption={job.location}
                bullets={job.bullets}
              />
            ))}
          </Section>

          <Section title={ui.sections.projects}>
            {cv.projects.map((project, i) => (
              <Entry
                key={i}
                title={project.name}
                subtitle={`(${project.context})`}
                meta={project.stack}
                bullets={project.description}
              />
            ))}
          </Section>

          <Section title={ui.sections.education}>
            {cv.education.map((edu, i) => (
              <Entry
                key={i}
                title={edu.degree}
                subtitle={`— ${edu.school}`}
                meta={edu.period}
                bullets={edu.notes}
              />
            ))}
          </Section>

          {cv.publications && cv.publications.length > 0 && (
            <Section title={ui.sections.publications}>
              <div data-atom>
                <BulletList items={cv.publications.map(formatPublication)} />
              </div>
            </Section>
          )}

          <Section title={ui.sections.achievements}>
            <div data-atom>
              <BulletList items={cv.achievements} />
            </div>
          </Section>

          <Section title={ui.sections.skills}>
            {/* A flex row per group rather than one CSS-grid block: each row
                needs to be its own measurable atom (see lib/fit-to-page.ts),
                and `display: contents` — needed to keep dt/dd as direct grid
                children — reports a zeroed getBoundingClientRect(), which
                silently defeated the pagination measurement. */}
            <dl className="flex flex-col gap-y-(--sp-hair)">
              {cv.skills.map((skill, i) => (
                <div key={i} data-atom className="flex gap-x-(--sp-skill-gap)">
                  <dt className="w-(--w-skill-label) shrink-0 font-semibold text-gray-700">
                    {skill.group}
                  </dt>
                  <dd>{skill.items}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title={ui.sections.languages} className="mb-0">
            <p data-atom>
              {cv.languages.map((language, i) => (
                <Fragment key={i}>
                  {i > 0 && <Dot />}
                  <span className="font-semibold">{language.name}</span> (
                  {language.level})
                </Fragment>
              ))}
            </p>
          </Section>
        </div>

        {/* Print-only running footer, repeated on every physical page by the
            browser's own paged-media handling of `position: fixed` — so a
            page stays identifiable if it's ever separated from the rest.
            Screen has no equivalent: its "pages" are one scrolling flow with
            a decorative background, not real page boxes to repeat onto. */}
        <p
          aria-hidden="true"
          className="hidden print:fixed print:inset-x-0 print:bottom-[3mm] print:block print:text-center print:text-[7pt] print:text-gray-400"
        >
          {cv.name}
        </p>
      </main>
    </div>
  );
}
