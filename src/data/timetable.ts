// ─────────────────────────────────────────────────────────────
//  Weekly timetable for the 11th batch (from the official sheet)
// ─────────────────────────────────────────────────────────────

export type Day =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Thursday"
  | "Friday";

export type Program = "III & IV Degree" | "I & II Dip";

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
  "Monday",
  "Tuesday",
  "Thursday",
  "Friday",
];

export const DAY_INDEX: Record<Day, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const timetable: Lecture[] = [
  // ── III & IV Degree · Saturday ─────────────────────────────
  { module: "Cultural Criminology", code: "BCJ 2204.3", day: "Saturday", start: "08:00", end: "09:30", lecturer: "Mr. Dhanushka Nuwan", contact: "717 565 454", program: "III & IV Degree" },
  { module: "Peace Conflict Studies", code: "BCJ 2103.3", day: "Saturday", start: "09:45", end: "11:15", lecturer: "Mr. Dhanushka Nuwan", contact: "717 565 454", program: "III & IV Degree" },
  { module: "Criminal Procedure", code: "BCJ 2205.3", day: "Saturday", start: "15:45", end: "17:15", lecturer: "Mr. Chamara Wijerathna", contact: "703 050 804", program: "III & IV Degree" },
  { module: "International Security Studies", code: "BCJ 2104.3", day: "Saturday", start: "19:00", end: "20:30", lecturer: "Mr. Chaminda Millawithanachchi", contact: "773 838 740", program: "III & IV Degree" },
  { module: "Community Policing", code: "BCJ 2105.3", day: "Saturday", start: "20:45", end: "22:15", lecturer: "Mr. Chaminda Millawithanachchi", contact: "773 838 740", program: "III & IV Degree" },

  // ── Sunday ──────────────────────────────────────────────────
  { module: "Criminal Law", code: "DCRIM 1203.03", day: "Sunday", start: "07:00", end: "08:30", lecturer: "Mr. Chamaka Samarakoon", contact: "712 435 175", program: "I & II Dip" },

  // ── III & IV Degree · Sunday ───────────────────────────────
  { module: "Juvenile Delinquency", code: "BCJ 2201.3", day: "Sunday", start: "08:00", end: "09:30", lecturer: "Mr. Pathum Nimanthaka", program: "III & IV Degree" },
  { module: "Modern Themes of Crime", code: "BCJ 2102.3", day: "Sunday", start: "09:45", end: "11:15", lecturer: "Mr. Chamath Sandaru", program: "III & IV Degree" },
  { module: "International Terrorism", code: "BCJ 2203.3", day: "Sunday", start: "11:30", end: "13:00", lecturer: "Mr. Chamaka Samarakoon", contact: "712 435 175", program: "III & IV Degree" },
  { module: "Drug Abuse", code: "BCJ 2202.3", day: "Sunday", start: "14:00", end: "15:30", lecturer: "Mr. Colin Ariyarathna", contact: "776 142 860", program: "III & IV Degree" },
  { module: "Crime Mapping & Spatial Analysis (GIS)", code: "BCJ 2101.3", day: "Sunday", start: "15:45", end: "17:15", lecturer: "Ms. Nuwani Munasinghe", program: "III & IV Degree" },

  // ── I & II Diploma · Weekdays ──────────────────────────────
  { module: "Forensic Science", code: "DCRIM 1101.03", day: "Monday", start: "19:00", end: "20:30", lecturer: "Mr. Chamara Wijerathna", contact: "703 050 804", program: "I & II Dip" },
  { module: "Criminal Justice & Victim Protection", code: "DCRIM 1102.03", day: "Monday", start: "20:45", end: "22:15", lecturer: "Ms. Diani Hansika", contact: "710 446 115", program: "I & II Dip" },
  { module: "SOCO Investigation", code: "DCRIM 1103.03", day: "Tuesday", start: "19:00", end: "20:30", lecturer: "Mr. Chamara Vijerathna", contact: "703 050 804", program: "I & II Dip" },
  { module: "Criminal Psychology", code: "DCRIM 1104.03", day: "Tuesday", start: "20:45", end: "22:15", lecturer: "Mr. Chaminda Millawithana", contact: "773 838 740", program: "I & II Dip" },
  { module: "Scope of Criminology", code: "DCRIM 1105.03", day: "Thursday", start: "19:00", end: "20:30", lecturer: "Mr. Dhanushka Nuwan", contact: "717 565 454", program: "I & II Dip" },
  { module: "Crime and Addiction", code: "DCRIM 1201.03", day: "Thursday", start: "20:45", end: "22:15", lecturer: "Ms. Sineka Weerawardhana", program: "I & II Dip" },
  { module: "Child, Women Abuse and Crime", code: "DCRIM 1202.03", day: "Friday", start: "20:45", end: "22:15", lecturer: "Mr. Buddhika Balachandra", program: "I & II Dip" },
  { module: "Research Methodology I", code: "DCRIM 1204.03", day: "Sunday", start: "22:15", end: "23:15", lecturer: "Mr. Thushan Rangana", contact: "778 912 465", program: "I & II Dip" },
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
