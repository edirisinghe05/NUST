import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Clock, FolderOpen, User } from "lucide-react";
import { site, driveLinks } from "../data/config";
import {
  fmtTime,
  getNextLecture,
  stats,
} from "../data/timetable";
import { useNow } from "../lib/useNow";
import DeadlinePanel from "./DeadlinePanel";

function dayOffsetLabel(offset: number, day: string): string {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return day;
}

function NextLectureCard() {
  const now = useNow(30000);
  const next = getNextLecture(now);
  if (!next) return null;
  const { lecture, live, dayOffset } = next;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="relative w-full max-w-md overflow-hidden rounded-lg border border-line bg-panel/85 shadow-2xl shadow-black/50 backdrop-blur-md"
    >
      {/* evidence-tag header */}
      <div
        className={`flex items-center justify-between px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] ${
          live ? "bg-blood text-white" : "bg-gold text-ink"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              live ? "animate-ping bg-white" : "bg-ink"
            }`}
          />
          {live ? "In session now" : "Next lecture"}
        </span>
        <span>{lecture.code}</span>
      </div>

      <div className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {dayOffsetLabel(dayOffset, lecture.day)} · {lecture.program}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-paper">
          {lecture.module}
        </h3>

        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <p className="flex items-center gap-2.5 text-paper">
            <Clock className="h-4 w-4 text-gold" />
            <span className="font-mono">
              {fmtTime(lecture.start)} – {fmtTime(lecture.end)}
            </span>
          </p>
          <p className="flex items-center gap-2.5 text-muted">
            <CalendarClock className="h-4 w-4 text-gold" />
            {lecture.day}
          </p>
          <p className="flex items-center gap-2.5 text-muted">
            <User className="h-4 w-4 text-gold" />
            {lecture.lecturer}
          </p>
        </div>
      </div>

      {/* punched-hole decor, like an evidence tag */}
      <div className="absolute right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full border-2 border-dashed border-line sm:block" />
    </motion.div>
  );
}

const STATS = [
  { value: String(stats.modules).padStart(2, "0"), label: "Modules" },
  { value: String(stats.lecturers).padStart(2, "0"), label: "Lecturers" },
  { value: "04", label: "Semesters Live" },
  { value: String(stats.days).padStart(2, "0"), label: "Lecture Days" },
];

export default function Hero() {
  return (
    <section id="home" className="grain relative flex min-h-screen flex-col overflow-hidden">
      {/* backdrop */}
      <img
        src="/images/hero-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/70" />
      <img
        src="/images/fingerprint.png"
        alt=""
        className="pointer-events-none absolute -right-28 top-24 w-[460px] rotate-12 opacity-15 mix-blend-screen"
      />

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-16 pt-32 sm:px-6">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-sm border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-gold"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              {site.caseNo} — Active
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-6 font-display text-6xl font-bold uppercase leading-[0.92] tracking-tight text-paper sm:text-7xl lg:text-8xl"
            >
              NUST
              <br />
              <span className="text-gold">Criminology</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -3, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="stamp mt-6 inline-block border-[3px] border-gold px-5 py-2 font-mono text-sm font-semibold uppercase tracking-[0.45em] text-gold"
            >
              {site.batch}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              The official case hub of the {site.batch} — weekly timetable,
              lecture recordings, notes and every shared file, filed in one
              place. {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#timetable"
                className="group inline-flex items-center gap-2.5 rounded-sm bg-gold px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-all hover:bg-amber hover:shadow-lg hover:shadow-gold/20"
              >
                View Timetable
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#resources"
                className="inline-flex items-center gap-2.5 rounded-sm border border-line bg-panel/60 px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-paper backdrop-blur transition-all hover:border-gold hover:text-gold"
              >
                <FolderOpen className="h-4 w-4" />
                Evidence Locker
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70"
            >
              {driveLinks.length} drive exhibits on file · updated by the batch
            </motion.p>
          </div>

          {/* right — live / next lecture + deadlines */}
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <NextLectureCard />
            <DeadlinePanel />
          </div>
        </div>
      </div>

      {/* stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 border-t border-line/70 bg-ink/70 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line/70 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center md:text-left">
              <p className="font-display text-3xl font-semibold text-gold">
                {s.value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
