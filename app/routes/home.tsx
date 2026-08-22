import { Fragment } from "react";
import type { Route } from "./+types/home";
import { cv } from "~/cv-data";
import { ui } from "~/ui-text";
import { BulletList } from "~/components/bullet-list";
import { CvHeader } from "~/components/cv-header";
import { Dot } from "~/components/dot";
import { Entry } from "~/components/entry";
import { PrintPanel } from "~/components/print-panel";
import { Section } from "~/components/section";

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${cv.name} — ${cv.title}` },
    { name: "description", content: `CV of ${cv.name}, ${cv.title}` },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-auto bg-gray-200 py-8 print:min-h-0 print:overflow-visible print:bg-white print:py-0">
      <PrintPanel />

      {/* The A4 sheet itself. Geometry comes from the --sheet-* custom
          properties in app.css so it stays in step with the @page rule. */}
      <main className="mx-auto box-border min-h-[var(--sheet-h)] w-[var(--sheet-w)] bg-white px-[var(--sheet-px)] py-[var(--sheet-py)] text-[9.2pt] leading-[1.28] text-gray-900 shadow-xl print:min-h-0 print:shadow-none">
        <CvHeader cv={cv} />

        <section className="mb-2.5">
          <p>{cv.summary}</p>
        </section>

        <Section title={ui.sections.experience} className="mb-2.5">
          {cv.experience.map((job, i) => (
            <Entry
              key={i}
              className="mb-1.5"
              title={job.title}
              subtitle={`— ${job.company}`}
              meta={job.period}
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

        <Section title={ui.sections.achievements}>
          <BulletList items={cv.achievements} />
        </Section>

        <Section title={ui.sections.skills}>
          <dl className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-0.5">
            {cv.skills.map((skill, i) => (
              <Fragment key={i}>
                <dt className="font-semibold text-gray-700">{skill.group}</dt>
                <dd>{skill.items}</dd>
              </Fragment>
            ))}
          </dl>
        </Section>

        <Section title={ui.sections.languages} className="mb-0">
          <p>
            {cv.languages.map((language, i) => (
              <Fragment key={i}>
                {i > 0 && <Dot />}
                <span className="font-semibold">{language.name}</span> (
                {language.level})
              </Fragment>
            ))}
          </p>
        </Section>
      </main>
    </div>
  );
}
