export function generateIcsEvent({
  title,
  startDate,
  startTime,
  endTime,
  description,
  url,
}: {
  title: string;
  startDate: string; // "2026-07-15"
  startTime: string; // "09:00"
  endTime: string; // "09:30"
  description?: string;
  url?: string;
}): string {
  const formatDate = (date: string, time: string) => {
    return date.replace(/-/g, "") + "T" + time.replace(/:/g, "") + "00";
  };

  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calie//calie.app//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@calie.app`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatDate(startDate, startTime)}`,
    `DTEND:${formatDate(startDate, endTime)}`,
    `SUMMARY:${escapeIcs(title)}`,
  ];

  if (description) {
    lines.push(`DESCRIPTION:${escapeIcs(description)}`);
  }

  if (url) {
    lines.push(`URL:${escapeIcs(url)}`);
  }

  lines.push("END:VEVENT");
  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
