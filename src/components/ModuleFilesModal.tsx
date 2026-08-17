import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, FlaskConical, FolderOpen, GraduationCap, BookOpen, Layers, Map as MapIcon, Paperclip, Upload, X, type LucideIcon } from "lucide-react";
import { timetable, type Program } from "../data/timetable";
import { daysUntil, formatDue } from "../lib/deadlines";

/** Pick a fitting icon for a sub-folder button by its label. */
function subIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("note")) return FileText;
  if (l.includes("gis") || l.includes("map")) return MapIcon;
  if (l.includes("practical") || l.includes("lab")) return FlaskConical;
  return FolderOpen;
}

/** A URL counts as "linked" once the placeholder is replaced with a real one. */
export function isUrlLinked(url: string | undefined): boolean {
  return !!url && url.trim() !== "" && url.trim() !== "https://drive.google.com/";
}

/** Unique modules in official-sheet order (Degree Sat/Sun, then Diploma). */
const MODULES = timetable.filter(
  (l, i, arr) => arr.findIndex((x) => x.code === l.code) === i
);

const PROGRAMS: { value: Program; label: string }[] = [
  { value: "III & IV Degree", label: "III & IV Degree" },
  { value: "I & II Dip", label: "I & II Diploma" },
];

export interface ModuleDrawerProps {
  /** Gold header title, e.g. "Module Files — 19 on record" */
  title: string;
  /** Small mono eyebrow above the title, e.g. "Lecture Notes & Slides" */
  eyebrow: string;
  /** Map of subject code → Drive folder URL */
  links: Record<string, string>;
  /** Fallback URL when a module has no own link */
  fallbackUrl: string;
  /** Icon for each module row */
  icon?: LucideIcon;
  /** Optional due dates ("MM-DD") per subject code, shown on each row */
  dueDates?: Record<string, string>;
  /** Optional submission links per subject code → renders a mini SUBMIT button */
  submissionLinks?: Record<string, string>;
  /** Optional extra mini buttons per subject code (label + url) */
  sideLinks?: Record<string, { label: string; url: string }>;
  /** Modules that open a sub-panel of folder buttons instead of a link */
  subFolders?: Record<string, { label: string; url: string }[]>;
  /** Subject codes with no assignment — rendered in ash grey */
  noAssignment?: string[];
  onClose: () => void;
}

export default function ModuleFilesModal({
  title,
  eyebrow,
  links,
  fallbackUrl,
  icon: RowIcon = FileText,
  dueDates,
  submissionLinks,
  sideLinks,
  subFolders,
  noAssignment,
  onClose,
}: ModuleDrawerProps) {
  /** A module is "linked" once its placeholder URL is replaced with a real one. */
  const isModuleLinked = (code: string): boolean => isUrlLinked(links[code]);

  /** Subject code whose sub-folder panel is currently open */
  const [subPanel, setSubPanel] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (subPanel) setSubPanel(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, subPanel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={eyebrow}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-xl border border-line bg-surface shadow-2xl shadow-black/60 sm:rounded-lg"
      >
        {/* header strip */}
        <div className="flex items-center justify-between gap-4 bg-gold px-5 py-3.5 text-ink sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em]">
              {eyebrow}
            </p>
            <h3 className="truncate font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="shrink-0 rounded-sm border border-ink/30 p-2 transition-colors hover:bg-ink hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6 sm:px-6">
          {PROGRAMS.map((program) => {
            const items = MODULES.filter((m) => m.program === program.value);
            if (items.length === 0) return null;
            return (
              <div key={program.value}>
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-gold">
                    {program.value === "III & IV Degree" ? (
                      <GraduationCap className="h-4 w-4" />
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                    {program.label}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {items.length} files
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((m, i) => {
                    const subs = subFolders?.[m.code];
                    const hasSubs = !!subs && subs.length > 0;
                    const linked = hasSubs || isModuleLinked(m.code);
                    const due = dueDates?.[m.code];
                    const noAssign = !!noAssignment?.includes(m.code);
                    const overdue = noAssign || (due ? daysUntil(due) < 0 : false);
                    return (
                      <motion.a
                        key={m.code}
                        href={hasSubs ? undefined : (links[m.code] ?? fallbackUrl)}
                        target={hasSubs ? undefined : "_blank"}
                        rel={hasSubs ? undefined : "noopener noreferrer"}
                        onClick={
                          hasSubs
                            ? (e) => {
                                e.preventDefault();
                                setSubPanel(m.code);
                              }
                            : undefined
                        }
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.03, duration: 0.3 }}
                        className={`group flex items-center gap-3.5 rounded-md border px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                          overdue
                            ? "border-line/50 bg-panel/50 opacity-55 saturate-0 hover:border-line"
                            : linked
                              ? "border-line bg-panel hover:border-gold/60 hover:bg-panel2"
                              : "border-blood/40 bg-panel hover:border-blood/70 hover:bg-panel2"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border transition-transform duration-200 group-hover:scale-110 ${
                            overdue
                              ? "border-line bg-panel2 text-muted"
                              : linked
                                ? "border-gold/30 bg-gold/10 text-gold"
                                : "border-blood/50 bg-blood/10 text-blood"
                          }`}
                        >
                          <RowIcon className="h-4.5 w-4.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate font-display text-sm font-semibold uppercase tracking-wide ${
                              overdue ? "text-muted" : "text-paper"
                            }`}
                          >
                            {m.module}
                          </span>
                          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                            {m.code} · {m.lecturer}
                            {due && (
                              <span className={overdue ? "text-muted" : "text-gold"}>
                                {" "}
                                · due {formatDue(due)}
                                {overdue && !noAssign && (
                                  <span className="font-semibold"> — closed</span>
                                )}
                              </span>
                            )}
                            {noAssign && (
                              <span className="text-muted font-semibold">
                                {" "}
                                · no assignment
                              </span>
                            )}
                            {hasSubs && (
                              <span className="text-gold">
                                {" "}
                                · {subs.length} folders
                              </span>
                            )}
                            {!linked && !overdue && (
                              <span className="text-blood"> · link pending</span>
                            )}
                          </span>
                        </span>
                        {/* sub-panel indicator */}
                        {hasSubs && (
                          <span className="flex h-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-sm border border-gold/50 bg-gold/10 px-2 font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-gold">
                            <Layers className="h-3.5 w-3.5" />
                            Open
                          </span>
                        )}
                        {/* extra side mini button(s) per module */}
                        {sideLinks?.[m.code] &&
                          (() => {
                            const side = sideLinks[m.code];
                            const sideLinked = isUrlLinked(side.url);
                            return (
                              <button
                                type="button"
                                title={
                                  sideLinked
                                    ? `Open ${side.label} link`
                                    : `No ${side.label} link yet`
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (sideLinked)
                                    window.open(
                                      side.url,
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                }}
                                className={`flex h-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-sm border px-2 font-mono text-[7px] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:scale-105 ${
                                  sideLinked
                                    ? "border-gold/50 bg-gold/10 text-gold hover:bg-gold/20"
                                    : "cursor-not-allowed border-blood/50 bg-blood/10 text-blood/80"
                                }`}
                              >
                                <Paperclip className="h-3.5 w-3.5" />
                                {side.label}
                              </button>
                            );
                          })()}
                        {/* mini SUBMIT button (assignments only) */}
                        {submissionLinks &&
                          (() => {
                            const subUrl = submissionLinks[m.code];
                            const subLinked = isUrlLinked(subUrl);
                            return (
                              <button
                                type="button"
                                title={
                                  overdue
                                    ? "Submission date passed"
                                    : subLinked
                                      ? "Open submission link"
                                      : "No submission link yet"
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (subLinked && !overdue)
                                    window.open(
                                      subUrl,
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                }}
                                className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-sm border font-mono text-[7px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                                  overdue
                                    ? "cursor-not-allowed border-line bg-panel2 text-muted/70"
                                    : subLinked
                                      ? "border-gold/50 bg-gold/10 text-gold hover:scale-105 hover:bg-gold/20"
                                      : "cursor-not-allowed border-blood/50 bg-blood/10 text-blood/80"
                                }`}
                              >
                                <Upload className="h-3.5 w-3.5" />
                                {noAssign ? "N/A" : overdue ? "Closed" : "Submit"}
                              </button>
                            );
                          })()}
                        <ArrowUpRight
                          className={`h-4 w-4 shrink-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                            overdue
                              ? "text-muted/50"
                              : linked
                                ? "text-muted group-hover:text-gold"
                                : "text-blood/70 group-hover:text-blood"
                          }`}
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* footer hint + legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-panel px-5 py-3 sm:px-6">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
            <span className="h-2.5 w-2.5 rounded-sm bg-gold" /> Linked
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
            <span className="h-2.5 w-2.5 rounded-sm bg-blood" /> Link pending
          </span>
          {dueDates && (
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#8b93a4]" /> Deadline passed
            </span>
          )}
          {submissionLinks && (
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
              <Upload className="h-3 w-3 text-gold" /> Submit = upload link
            </span>
          )}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted/50 sm:block">
            src/data/config.ts
          </span>
        </div>
      </motion.div>

      {/* ── sub-folder panel (nested) ─────────────────────────── */}
      <AnimatePresence>
        {subPanel &&
          subFolders?.[subPanel] &&
          (() => {
            const subModule = MODULES.find((mod) => mod.code === subPanel);
            const entries = subFolders[subPanel];
            return (
              <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSubPanel(null)}
              >
                <motion.div
                  className="w-full max-w-md overflow-hidden rounded-xl border border-gold/40 bg-surface shadow-2xl shadow-black/60"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* header */}
                  <div className="flex items-center justify-between gap-3 border-b border-line bg-gold px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/70">
                        {subPanel} · {entries.length} folders
                      </p>
                      <h3 className="truncate font-display text-lg font-bold uppercase tracking-wide text-ink">
                        {subModule?.module ?? subPanel}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSubPanel(null)}
                      className="shrink-0 rounded-sm border border-ink/30 p-1.5 text-ink transition-colors hover:bg-ink hover:text-gold"
                      aria-label="Close panel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* sub-folder buttons */}
                  <div className="grid gap-3 p-5">
                    {entries.map((entry, i) => {
                      const Icon = subIcon(entry.label);
                      const entryLinked = isUrlLinked(entry.url);
                      return (
                        <motion.a
                          key={entry.label}
                          href={entry.url}
                          target={entryLinked ? "_blank" : undefined}
                          rel={entryLinked ? "noopener noreferrer" : undefined}
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                          className={`group flex items-center gap-3.5 rounded-md border px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                            entryLinked
                              ? "border-line bg-panel hover:border-gold/60 hover:bg-panel2"
                              : "cursor-not-allowed border-blood/40 bg-panel"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-transform duration-200 group-hover:scale-110 ${
                              entryLinked
                                ? "border-gold/30 bg-gold/10 text-gold"
                                : "border-blood/50 bg-blood/10 text-blood"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-base font-semibold uppercase tracking-wide text-paper">
                              {entry.label}
                            </span>
                            {!entryLinked && (
                              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-blood">
                                link pending
                              </span>
                            )}
                          </span>
                          <ArrowUpRight
                            className={`h-4 w-4 shrink-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                              entryLinked
                                ? "text-muted group-hover:text-gold"
                                : "text-blood/60"
                            }`}
                          />
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* footer */}
                  <div className="border-t border-line bg-panel px-5 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                      Each button opens its Drive folder · Esc to go back
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </motion.div>
  );
}
