import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Image as ImageIcon,
  Phone,
  User,
} from "lucide-react";
import {
  DAY_INDEX,
  WEEK_ORDER,
  durationLabel,
  fmtTime,
  hasEndedToday,
  isLiveNow,
  timetable,
  type Day,
  type Lecture,
  type Program,
} from "../data/timetable";
import { useNow } from "../lib/useNow";

type DayFilter = Day | "All";
type ProgramFilter = Program | "All";

const DAY_TABS: DayFilter[] = ["All", ...WEEK_ORDER];
const PROGRAM_TABS: { value: ProgramFilter; label: string }[] = [
  { value: "All", label: "All Programs" },
  { value: "V & VI Degree", label: "V & VI Degree" },
];

function ProgramBadge({ program }: { program: Program }) {
  const degree = program === "III & IV Degree";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
        degree
          ? "border-gold/40 bg-gold/10 text-gold"
          : "border-line bg-panel2 text-muted"
      }`}
    >
      {degree ? (
        <GraduationCap className="h-3 w-3" />
      ) : (
        <BookOpen className="h-3 w-3" />
      )}
      {program}
    </span>
  );
}

function LectureCard({ lecture, index }: { lecture: Lecture; index: number }) {
  const now = useNow(30000);
  const live = isLiveNow(lecture, now);
  const ended = hasEndedToday(lecture, now);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={`relative overflow-hidden rounded-lg border transition-colors ${
        live
          ? "border-blood/70 bg-blood/[0.07]"
          : "border-line bg-panel hover:border-gold/40"
      } ${ended ? "opacity-45 saturate-50" : ""}`}
    >
      {/* left accent bar */}
      <div
        className={`absolute inset-y-0 left-0 w-1 ${
          live ? "bg-blood" : "bg-gold/70"
        }`}
      />

      <div className="grid gap-4 p-4 pl-6 sm:p-5 sm:pl-7 md:grid-cols-[170px_1fr_auto] md:items-center">
        {/* time */}
        <div>
          <p className="flex items-center gap-2 font-mono text-sm font-semibold text-paper">
            <Clock className={`h-4 w-4 ${live ? "text-blood" : "text-gold"}`} />
            {fmtTime(lecture.start)} – {fmtTime(lecture.end)}
          </p>
          <p className="mt-1 pl-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {durationLabel(lecture.start, lecture.end)}
          </p>
        </div>

        {/* module */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold uppercase leading-snug tracking-wide text-paper sm:text-xl">
              {lecture.module}
            </h3>
            {live && (
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-blood px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                Live
              </span>
            )}
            {ended && (
              <span className="inline-flex items-center gap-1 rounded-sm border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
            <span className="rounded-sm border border-line bg-panel2 px-2 py-0.5 font-mono text-[11px] tracking-wider text-gold/90">
              {lecture.code}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-gold/70" />
              {lecture.lecturer}
            </span>
            {lecture.contact && (
              <a
                href={`tel:${lecture.contact.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider transition-colors hover:text-gold"
              >
                <Phone className="h-3.5 w-3.5 text-gold/70" />
                {lecture.contact}
              </a>
            )}
          </div>
        </div>

        {/* program */}
        <div className="md:justify-self-end">
          <ProgramBadge program={lecture.program} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Timetable() {
  const [day, setDay] = useState<DayFilter>(() => {
    const todayIdx = new Date().getDay();
    return WEEK_ORDER.find((d) => DAY_INDEX[d] === todayIdx) ?? "All";
  });
  const [program, setProgram] = useState<ProgramFilter>("All");

  const filtered = useMemo(
    () =>
      timetable.filter(
        (l) =>
          (day === "All" || l.day === day) &&
          (program === "All" || l.program === program)
      ),
    [day, program]
  );

  const groups = useMemo(() => {
    if (day !== "All") return [{ day, items: filtered }];
    return WEEK_ORDER.map((d) => ({
      day: d as DayFilter,
      items: filtered.filter((l) => l.day === d),
    })).filter((g) => g.items.length > 0);
  }, [day, filtered]);

  const countFor = (d: DayFilter) =>
    d === "All"
      ? timetable.length
      : timetable.filter((l) => l.day === d).length;

  return (
    <section
      id="timetable"
      className="relative scroll-mt-20 border-t border-line bg-surface py-20 md:py-28"
    >
      {/* faint fingerprint backdrop */}
      <img
        src="/images/fingerprint.png"
        alt=""
        className="pointer-events-none absolute -left-32 bottom-10 w-[380px] -rotate-12 opacity-[0.06] mix-blend-screen"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* heading */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
              Case File 02 · Weekly Schedule
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide text-paper sm:text-5xl">
              Lecture <span className="text-gold">Timetable</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Every session for both programs, straight from the official sheet
              — with live status while a lecture is in session.
            </p>
          </div>
          <a
            href="/uploads/upload_1.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-sm border border-line bg-panel px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <ImageIcon className="h-4 w-4" />
            Original Sheet
          </a>
        </div>

        {/* day tabs */}
        <div className="flex flex-wrap gap-2">
          {DAY_TABS.map((d) => {
            const active = day === d;
            return (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`group flex items-center gap-2 rounded-sm border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
                  active
                    ? "border-gold bg-gold text-ink"
                    : "border-line bg-panel text-muted hover:border-gold/50 hover:text-paper"
                }`}
              >
                {d === "All" ? "All Days" : d.slice(0, 3)}
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${
                    active ? "bg-ink/15 text-ink" : "bg-panel2 text-gold"
                  }`}
                >
                  {countFor(d)}
                </span>
              </button>
            );
          })}
        </div>

        {/* program filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {PROGRAM_TABS.map((p) => {
            const active = program === p.value;
            return (
              <button
                key={p.value}
                onClick={() => setProgram(p.value)}
                className={`rounded-sm border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all ${
                  active
                    ? "border-paper/60 bg-paper/10 text-paper"
                    : "border-line/70 text-muted/80 hover:border-line hover:text-paper"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* lectures */}
        <div className="mt-10 space-y-10">
          <AnimatePresence mode="wait">
            {groups.map((group) => (
              <motion.div
                key={`${group.day}-${program}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* day header */}
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-wider text-gold">
                    {group.day === "All" ? "" : group.day}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {group.items.length}{" "}
                    {group.items.length === 1 ? "session" : "sessions"}
                  </span>
                </div>

                <div className="grid gap-3">
                  {group.items.map((lecture, i) => (
                    <LectureCard
                      key={`${lecture.code}-${lecture.day}`}
                      lecture={lecture}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {groups.length === 0 && (
            <p className="rounded-lg border border-dashed border-line p-10 text-center font-mono text-sm uppercase tracking-[0.2em] text-muted">
              No sessions match this filter
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
