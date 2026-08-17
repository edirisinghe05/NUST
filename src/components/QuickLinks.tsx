import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  FileStack,
  FileText,
  FolderOpen,
  Images,
  Layers,
  PenSquare,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  driveLinks,
  moduleDriveLinks,
  moduleSideLinks,
  moduleSubFolders,
  assignmentDriveLinks,
  assignmentDueDates,
  assignmentSubmissionLinks,
  noAssignmentModules,
  type DriveIcon,
} from "../data/config";
import ModuleFilesModal from "./ModuleFilesModal";
import RecordingsModal from "./RecordingsModal";

const ICONS: Record<DriveIcon, LucideIcon> = {
  video: Video,
  notes: FileText,
  papers: FileStack,
  folder: FolderOpen,
  book: BookOpen,
  photos: Images,
  form: ClipboardList,
  sheet: FileSpreadsheet,
};

const MODULE_COUNT = Object.keys(moduleDriveLinks).length;

type Drawer = "modules" | "recordings" | "assignments" | null;

export default function QuickLinks() {
  const [drawer, setDrawer] = useState<Drawer>(null);

  return (
    <section id="resources" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* heading */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
              Case File 01 · Shared Drive
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide text-paper sm:text-5xl">
              Evidence <span className="text-gold">Locker</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Every Google Drive folder the batch uses — recordings, notes,
              papers and more — tagged and filed as exhibits.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted/70">
            {driveLinks.length} exhibits on record
          </p>
        </div>

        {/* exhibit cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {driveLinks.map((link, i) => {
            const Icon = ICONS[link.icon] ?? FolderOpen;
            const opensModules = link.openModuleFiles === true;
            const opensRecordings = link.openRecordings === true;
            const opensAssignments = link.openAssignments === true;
            const opensDrawer = opensModules || opensRecordings || opensAssignments;
            const badge = opensModules
              ? `${MODULE_COUNT} files`
              : opensAssignments
                ? `${Object.keys(assignmentDriveLinks).length} folders`
                : opensRecordings
                  ? "2 folders"
                  : null;
            const action = opensModules
              ? "Browse module files"
              : opensAssignments
                ? "Browse module folders"
                : opensRecordings
                  ? "Browse folders"
                  : "Open in Drive";
            const drawerTarget: Drawer = opensModules
              ? "modules"
              : opensAssignments
                ? "assignments"
                : "recordings";

            return (
              <motion.a
                key={link.label}
                href={link.url}
                target={opensDrawer ? undefined : "_blank"}
                rel={opensDrawer ? undefined : "noopener noreferrer"}
                onClick={
                  opensDrawer
                    ? (e) => {
                        e.preventDefault();
                        setDrawer(drawerTarget);
                      }
                    : undefined
                }
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-panel p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  opensDrawer
                    ? "border-gold/50 ring-1 ring-gold/20 hover:border-gold hover:shadow-gold/10"
                    : "border-line hover:border-gold/60 hover:shadow-gold/5"
                }`}
              >
                {/* corner glow on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-all duration-500 group-hover:bg-gold/10" />

                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Exhibit {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2">
                    {badge && (
                      <span className="inline-flex items-center gap-1.5 rounded-sm bg-gold px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                        <Layers className="h-3 w-3" />
                        {badge}
                      </span>
                    )}
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </span>
                </div>

                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-md border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-paper">
                  {link.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {link.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                  {action}
                  <span className="h-px flex-1 bg-line transition-colors group-hover:bg-gold/40" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* drawers */}
      <AnimatePresence>
        {drawer === "modules" && (
          <ModuleFilesModal
            title={`Module Files — ${MODULE_COUNT} on record`}
            eyebrow="Lecture Notes & Slides"
            links={moduleDriveLinks}
            fallbackUrl={
              driveLinks.find((d) => d.openModuleFiles)?.url ??
              "https://drive.google.com/"
            }
            sideLinks={moduleSideLinks}
            subFolders={moduleSubFolders}
            onClose={() => setDrawer(null)}
          />
        )}
        {drawer === "assignments" && (
          <ModuleFilesModal
            title={`Assignment Folders — ${Object.keys(assignmentDriveLinks).length} modules`}
            eyebrow="Assignments"
            links={assignmentDriveLinks}
            fallbackUrl={
              driveLinks.find((d) => d.openAssignments)?.url ??
              "https://drive.google.com/"
            }
            icon={PenSquare}
            dueDates={assignmentDueDates}
            submissionLinks={assignmentSubmissionLinks}
            noAssignment={noAssignmentModules}
            onClose={() => setDrawer(null)}
          />
        )}
        {drawer === "recordings" && (
          <RecordingsModal onClose={() => setDrawer(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
