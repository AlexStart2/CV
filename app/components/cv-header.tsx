import { Dot } from "~/components/dot";
import type { CvData } from "~/cv-data.types";

/** Name, headline title, and the single-line contact strip. */
export function CvHeader({ cv }: { cv: CvData }) {
  return (
    <header className="mb-4">
      <h1 className="text-[20pt] leading-tight font-bold tracking-tight text-teal-900">
        {cv.name}
      </h1>
      <p className="text-[11pt] font-medium text-gray-700">{cv.title}</p>
      <p className="mt-0.5 text-[8.7pt] text-gray-600">
        {cv.contact.location}
        <Dot />
        <a href={`mailto:${cv.contact.email}`} className="text-teal-800">
          {cv.contact.email}
        </a>
        <Dot />
        {cv.contact.phone}
        <Dot />
        <a
          href={cv.contact.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-800"
        >
          {cv.contact.github.label}
        </a>
      </p>
    </header>
  );
}
