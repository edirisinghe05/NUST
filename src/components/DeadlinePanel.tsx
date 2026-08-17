import { motion } from "framer-motion";
import { AlarmClock, FileWarning } from "lucide-react";
import { assignmentDueDates } from "../data/config";
import { timetable } from "../data/timetable";
import { daysUntil, formatDue } from "../lib/deadlines";
import { useNow } from "../lib/useNow";

interface DeadlineRow {
  code: string;
  module: string;
  due: string;
  daysLeft: number;
}

function buildRows(now: Date): DeadlineRow[] {
  return Object.entries(assignmentDueDates)
    .map(([code, due]) => ({
      code,
      module: timetable.find((t) => t.code === code)?.module ?? code,
      due,
      daysLeft: daysUntil(due),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

function statusStyle(daysLeft: number) {
  if (daysLeft < 0)
    return {
      chip: "border-line bg-panel2 text-muted line-through",
      label: "passed",
    };
  if (daysLeft <= 7)
    return {
      chip: "border-blood/60 bg-blood/15 text-blood",
      label: daysLeft === 0 ? "due today" : daysLeft === 1 ? "1 day left" : `${daysLeft} days left`,
    };
  return {
    chip: "border-gold/40 bg-gold/10 text-gold",
    label: `${daysLeft} days left`,
  };
}

export default function DeadlinePanel() {
  const now = useNow(60000);
  const rows = buildRows(now);
  if (rows.length === 0) return null;

  const urgentCount = rows.filter((r) => r.daysLeft >= 0 && r.daysLeft <= 7).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      className="relative w-full max-w-md overflow-hidden rounded-lg border border-blood/40 bg-panel/85 shadow-2xl shadow-black/50 backdrop-blur-md"
    >
      {/* header */}
      <div className="flex items-center justify-between bg-blood px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Assignment deadlines
        </span>
        {urgentCount > 0 && <span>{urgentCount} urgent</span>}
      </div>

      {/* rows */}
      <ul className="divide-y divide-line/60 p-2">
        {rows.map((row) => {
          const style = statusStyle(row.daysLeft);
          const urgent = row.daysLeft >= 0 && row.daysLeft <= 7;
          return (
            <li
              key={row.code}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-panel2"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border ${
                  urgent
                    ? "border-blood/50 bg-blood/10 text-blood"
                    : "border-gold/30 bg-gold/10 text-gold"
                }`}
              >
                {urgent ? (
                  <FileWarning className="h-4 w-4" />
                ) : (
                  <AlarmClock className="h-4 w-4" />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-medium ${
                    row.daysLeft < 0 ? "text-muted line-through" : "text-paper"
                  }`}
                >
                  {row.module}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {row.code} · due {formatDue(row.due)}
                </span>
              </span>

              <span
                className={`shrink-0 rounded-sm border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${style.chip}`}
              >
                {style.label}
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
