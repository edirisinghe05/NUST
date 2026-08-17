import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "../data/config";

const LINKS = [
  { label: "Briefing", href: "#home" },
  { label: "Evidence Locker", href: "#resources" },
  { label: "Timetable", href: "#timetable" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* brand */}
        <a href="#home" className="group flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="NUST Criminology logo"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold uppercase tracking-wider text-paper">
              NUST <span className="text-gold">Criminology</span>
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
              {site.batch}
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <span className="hidden rounded-sm border border-line bg-panel px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold lg:block">
            {site.caseNo}
          </span>
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-line p-2 text-paper md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="border-t border-line bg-ink/95 px-4 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/50 py-3 font-mono text-sm uppercase tracking-[0.2em] text-paper last:border-0 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
