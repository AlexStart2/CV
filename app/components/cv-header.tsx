import { Dot } from "~/components/dot";
import type { CvData } from "~/cv-data.types";

/** Name, headline title, and the single-line contact strip. */
export function CvHeader({ cv }: { cv: CvData }) {
  return (
    <header data-atom className="mb-(--sp-section)">
      <h1 className="text-(length:--fs-name) leading-tight font-bold tracking-tight text-teal-900">
        {cv.name}
      </h1>
      <p className="text-(length:--fs-role) font-medium text-gray-700">
        {cv.title}
      </p>
      <p className="mt-(--sp-hair) text-(length:--fs-contact) text-gray-600">
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
