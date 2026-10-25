const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parsePoint(
  raw: string,
  now: Date,
): { year: number; month: number } | null {
  const trimmed = raw.trim();
  if (/^present$/i.test(trimmed)) {
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  const match = /^([a-z]{3,})\s+(\d{4})$/i.exec(trimmed);
  const monthName = match?.[1];
  const yearStr = match?.[2];
  if (!monthName || !yearStr) return null;
  const month = MONTHS[monthName.slice(0, 3).toLowerCase()];
  if (month === undefined) return null;
  return { year: Number(yearStr), month };
}

/**
 * Appends a "· X yrs Y mos" duration to a "Mon YYYY - Mon YYYY"/"Present"
 * period string, for display next to job dates. Falls back to the original
 * string untouched if it isn't in that exact month-year format (e.g.
 * year-only education periods), so it's safe to call on any period string.
 */
export function withDuration(period: string, now = new Date()): string {
  const parts = period.split(/\s*[-–—]\s*/);
  const startRaw = parts[0];
  const endRaw = parts[1];
  if (parts.length !== 2 || !startRaw || !endRaw) return period;

  const start = parsePoint(startRaw, now);
  const end = parsePoint(endRaw, now);
  if (!start || !end) return period;

  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months < 1) return period;

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const segments: string[] = [];
  if (years > 0) segments.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remMonths > 0 || years === 0) {
    segments.push(`${remMonths} mo${remMonths !== 1 ? "s" : ""}`);
  }

  return `${period} · ${segments.join(" ")}`;
}
