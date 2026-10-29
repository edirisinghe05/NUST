import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  Video,
  X,
} from "lucide-react";
import { recordingLinks } from "../data/config";
import { timetable } from "../data/timetable";

const MODULE_COUNT = timetable.filter((l) => l.program === "V & VI Degree").length;

export default function RecordingsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Lecture recordings"
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
        className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-line bg-surface shadow-2xl shadow-black/60 sm:rounded-lg"
      >
        {/* header strip */}
        <div className="flex items-center justify-between gap-4 bg-gold px-5 py-3.5 text-ink sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em]">
              Exhibit 01 · Video Evidence
            </p>
            <h3 className="truncate font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              Lecture Recordings — {recordingLinks.length} folder{recordingLinks.length === 1 ? "" : "s"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close recordings"
            className="shrink-0 rounded-sm border border-ink/30 p-2 transition-colors hover:bg-ink hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {recordingLinks.map((rec, i) => {
              const Icon = GraduationCap;
              return (
                <motion.a
                  key={rec.label}
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.35 }}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/5"
                >
                  <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-gold/0 blur-3xl transition-all duration-500 group-hover:bg-gold/10" />

                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-sm border border-line bg-panel2 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {MODULE_COUNT} modules
                    </span>
                  </div>

                  <h4 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide text-paper">
                    {rec.label}
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {rec.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                    <Video className="h-3.5 w-3.5" />
                    Open folder
                    <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* footer hint */}
        <div className="border-t border-line bg-panel px-5 py-3 sm:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
            Opens the V & VI Degree recording folder · edit links in{" "}
            <span className="text-gold/80">src/data/config.ts</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
