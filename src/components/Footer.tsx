import { ArrowUpRight, Fingerprint } from "lucide-react";
import { driveLinks, site } from "../data/config";

const NAV = [
  { label: "Briefing", href: "#home" },
  { label: "Evidence Locker", href: "#resources" },
  { label: "Timetable", href: "#timetable" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <Fingerprint
        className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 text-gold/[0.05]"
        strokeWidth={1}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="NUST Criminology logo"
              className="h-12 w-12 object-contain"
            />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold uppercase tracking-wider text-paper">
                NUST <span className="text-gold">Criminology</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
                {site.batch}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline} One hub for the whole batch — schedule, recordings,
            notes and shared files.
          </p>
        </div>

        {/* navigation */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
            Case Navigation
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* top exhibits */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
            Quick Exhibits
          </p>
          <ul className="mt-4 space-y-2.5">
            {driveLinks.slice(0, 4).map((d) => (
              <li key={d.label}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-gold"
                >
                  {d.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70 sm:flex-row sm:px-6">
          <span>
            © {year} {site.teamName} · {site.batch}
          </span>
          <span className="text-gold/60">{site.caseNo} · Closed circuit</span>
        </div>
      </div>
    </footer>
  );
}
