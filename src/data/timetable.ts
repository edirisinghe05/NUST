// ─────────────────────────────────────────────────────────────
//  Weekly timetable for the 11th batch (from the official sheet)
// ─────────────────────────────────────────────────────────────

export type Day =
  | "Saturday"
  | "Sunday"
  | "Friday";

export type Program = "V & VI Degree";

export interface Lecture {
  module: string;
  code: string;
  day: Day;
  start: string; // 24h "HH:MM"
  end: string; //   24h "HH:MM"
  lecturer: string;
  contact?: string;
  program: Program;
}

export const WEEK_ORDER: Day[] = [
  "Saturday",
  "Sunday",
  "Friday",
];

export const DAY_INDEX: Record<Day, number> = {
  Sunday: 0,
  Friday: 5,
  Saturday: 6,
};

export const timetable: Lecture[] = [
  // ── V & VI Degree · Saturday ─────────────────────────────
  { module: "Advanced Criminology", code: "BCJ 2101.03", day: "Saturday", start: "08:00", end: "09:30", lecturer: "Mr. Dhanushka Nuwan", contact: "0717 565 454", program: "V & VI Degree" },
  { module: "Criminal Justice", code: "BCJ 2104.03", day: "Saturday", start: "14:00", end: "15:30", lecturer: "Mr. Chamara Wijerathna", contact: "070 305 0804", program: "V & VI Degree" },
  { module: "Law Enforcement Agencies", code: "BCJ 2102.03", day: "Saturday", start: "15:45", end: "17:15", lecturer: "Mr. Chamara Wijerathna", contact: "070 305 0804", program: "V & VI Degree" },
  { module: "Physical Security Management", code: "BCJ 2205.03", day: "Saturday", start: "19:00", end: "20:30", lecturer: "Mr. Chaminda Millawithanarachchi", contact: "077 383 8740", program: "V & VI Degree" },
  { module: "Criminal Statistic", code: "BCJ 2105.03", day: "Saturday", start: "20:45", end: "22:15", lecturer: "Mr. Chaminda Millawithanarachchi", contact: "077 383 8740", program: "V & VI Degree" },

  // ── V & VI Degree · Sunday ───────────────────────────────
  { module: "Comparative Criminal Justice Systems", code: "BCJ 2201.03", day: "Sunday", start: "08:00", end: "10:15", lecturer: "Mr. Colin Ariyarathna", program: "V & VI Degree" },
  { module: "Correction and Rehabilitation", code: "BCJ 2202.03", day: "Sunday", start: "09:45", end: "11:15", lecturer: "Mr. Chamath Sandaru", program: "V & VI Degree" },
  { module: "Criminal Law II", code: "BCJ 2103.03", day: "Sunday", start: "11:30", end: "13:00", lecturer: "Mr. Chamaka Samarakoon", contact: "071 243 5175", program: "V & VI Degree" },
  { module: "Disaster Management", code: "BCJ 2204.03", day: "Sunday", start: "15:45", end: "17:15", lecturer: "Mrs. Nuwani Munasinghe", contact: "xxxxxxxx", program: "V & VI Degree" },

  // ── V & VI Degree · Friday ───────────────────────────────
  { module: "Academic Writing", code: "BCJ 2203.03", day: "Friday", start: "19:00", end: "20:30", lecturer: "Ms. Samudika Rathnayake", contact: "xxxxxxxxxx", program: "V & VI Degree" },
];

// ── helpers ──────────────────────────────────────────────────

export const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "08:00" → "08.00" (matches the official sheet style) */
export const fmtTime = (t: string): string => t.replace(":", ".");

export const durationLabel = (start: string, end: string): string => {
  const mins = toMinutes(end) - toMinutes(start);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
};

export function isLiveNow(l: Lecture, now: Date): boolean {
  if (DAY_INDEX[l.day] !== now.getDay()) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= toMinutes(l.start) && mins < toMinutes(l.end);
}

export function hasEndedToday(l: Lecture, now: Date): boolean {
  if (DAY_INDEX[l.day] !== now.getDay()) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= toMinutes(l.end);
}

export interface NextUp {
  lecture: Lecture;
  live: boolean;
  dayOffset: number; // 0 = today, 1 = tomorrow, …
}

export function getNextLecture(now: Date = new Date()): NextUp | null {
  const todayIdx = now.getDay();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset < 7; offset++) {
    const dayIdx = (todayIdx + offset) % 7;
    const lectures = timetable
      .filter((l) => DAY_INDEX[l.day] === dayIdx)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    if (lectures.length === 0) continue;

    if (offset === 0) {
      const live = lectures.find(
        (l) => nowMin >= toMinutes(l.start) && nowMin < toMinutes(l.end)
      );
      if (live) return { lecture: live, live: true, dayOffset: 0 };
      const upcoming = lectures.find((l) => nowMin < toMinutes(l.start));
      if (upcoming) return { lecture: upcoming, live: false, dayOffset: 0 };
      continue; // all of today's lectures are over → look at the next day
    }
    return { lecture: lectures[0], live: false, dayOffset: offset };
  }
  return null;
}

// ── stats (used in the hero) ─────────────────────────────────

export const stats = {
  modules: timetable.length,
  lecturers: new Set(timetable.map((l) => l.lecturer)).size,
  programs: new Set(timetable.map((l) => l.program)).size,
  days: new Set(timetable.map((l) => l.day)).size,
};
